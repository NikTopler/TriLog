import AthleteQueries from "@/server/shared/lib/database/queries/AthleteQueries";
import deleteQuery from "@/server/shared/lib/database/queries/helpers/deleteQuery";
import updateQuery from "@/server/shared/lib/database/queries/helpers/updateQuery";
import validatePlaceIds from "@/server/shared/lib/database/queries/helpers/validatePlaceIds";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";
import { SPECIFIC_API_ROUTE_SUPPORTED_METHODS } from "@/shared/helpers/constants";
import isNumber from "@/shared/helpers/isNumber";
import { athleteProps } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const athleteId = Number(req.query.athleteId);

    if (!isNumber(athleteId)) {
        return res.status(400).json({ message: 'Invalid athlete ID' });
    }

    if (!SPECIFIC_API_ROUTE_SUPPORTED_METHODS.includes(req.method as string)) {
        return res.status(200).json({ message: "Method not supported!" });
    }

    const athlete = await AthleteQueries.getById(athleteId);
    if (athlete === null) {
        return res.status(404).json({ message: 'Athlete not found' });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json({
                success: true,
                message: "Athlete found",
                data: {
                    athlete
                }
            });
        case 'PUT':
            return UPDATE(req, res, athleteId);
        case 'DELETE':
            return DELETE(req, res, athleteId);
        default:
            return res.status(501).json({ message: 'Method has not yet been implemented!' });
    }

}

async function UPDATE(req: NextApiRequest, res: NextApiResponse<any>, athleteId: number) {

    try {

        const props = [...athleteProps];
        props.shift();

        const [athlete, errors] = validateRequestBody(
            props,
            [],
            ['age', 'cityID', 'stateID', 'countryID'],
            req.body
        );

        if (errors.length > 0) {
            throw new Error(errors.join(','));
        }

        if (Object.keys(athlete).length === 0) {
            throw new Error("No valid fields to update");
        }

        if (!AthleteQueries.isTypeAthlete(athlete, false)) {
            throw new Error("Invalid athlete!");
        }

        await validatePlaceIds({
            cityID: athlete.cityID,
            stateID: athlete.stateID,
            countryID: athlete.countryID
        }, []);

        await updateQuery('Athletes', athlete, { ID: athleteId });

        res.status(200).json({
            success: true,
            message: "Athlete updated",
            data: {
                ID: athleteId
            }
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }

}

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>, athleteId: number) {

    try {

        await deleteQuery('Athletes', { ID: athleteId });

        res.status(200).json({
            success: true,
            message: "Athlete deleted",
            data: {
                ID: athleteId
            }
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });

    }

}