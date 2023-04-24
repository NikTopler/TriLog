import CityQueries from "@/server/shared/lib/database/queries/CityQueries";
import { validatePlaceIds } from "@/server/shared/lib/database/queries/helpers";
import deleteQuery from "@/server/shared/lib/database/queries/helpers/deleteQuery";
import updateQuery from "@/server/shared/lib/database/queries/helpers/updateQuery";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";
import { SPECIFIC_API_ROUTE_SUPPORTED_METHODS } from "@/shared/helpers/constants";
import isNumber from "@/shared/helpers/isNumber";
import { cityProps } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const cityId = Number(req.query.cityId);

    if (!isNumber(cityId)) {
        return res.status(400).json({ message: 'Invalid city ID' });
    }

    if (!SPECIFIC_API_ROUTE_SUPPORTED_METHODS.includes(req.method as string)) {
        return res.status(200).json({ message: "Method not supported!" });
    }

    const city = await CityQueries.getById(cityId);
    if (city === null) {
        return res.status(404).json({ message: 'City not found' });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json({
                success: true,
                message: "City found",
                data: {
                    city
                }
            });
        case 'PUT':
            return UPDATE(req, res, cityId);
        case 'DELETE':
            return DELETE(req, res, cityId);
        default:
            return res.status(501).json({ message: 'Method has not yet been implemented!' });
    }

}

async function UPDATE(req: NextApiRequest, res: NextApiResponse<any>, cityId: number) {

    try {

        const props = [...cityProps];
        props.shift();

        const [city, errors] = validateRequestBody(
            props,
            [],
            ['stateID', 'countryID'],
            req.body
        )

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        if (Object.keys(city).length === 0) {
            throw new Error("No valid fields to update");
        }

        if (!CityQueries.isTypeCity(city, false)) {
            throw new Error("Invalid city!");
        }

        await validatePlaceIds({
            cityID: null,
            stateID: city.stateID,
            countryID: city.countryID
        }, []);

        await updateQuery('Cities', city, { ID: cityId });

        res.status(200).json({
            success: true,
            message: "City updated",
            data: {
                ID: cityId
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

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>, cityId: number) {

    try {

        await deleteQuery('Cities', { ID: cityId });

        res.status(200).json({
            success: true,
            message: "City deleted",
            data: {
                ID: cityId
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