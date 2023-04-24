import { NextApiRequest, NextApiResponse } from "next";
import sanitizeApiQueryParams from "@/server/modules/helpers/sanitizeApiQueryParams";
import AthleteQueries from "@/server/shared/lib/database/queries/AthleteQueries";
import sanitizeObject from "@/shared/helpers/sanitizeObject";
import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import { Athlete, athleteProps } from "@/shared/models";
import selectQuery from "@/server/shared/lib/database/queries/helpers/selectQuery";
import validatePlaceIds from "@/server/shared/lib/database/queries/helpers/validatePlaceIds";
import sanitizeRequestNumber from "@/server/modules/helpers/sanitizeRequestNumber";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    switch (req.method) {
        case 'GET':
            return GET(req, res);
        case 'POST':
            return POST(req, res);
        default:
            return res.status(200).json({ message: 'Method not supported!' });
    }

}

async function GET(req: NextApiRequest, res: NextApiResponse<any>) {

    try {

        const filterQueryOptions = sanitizeApiQueryParams(req, athleteProps);

        const searchOptions = sanitizeObject(req.query as ConfigOptions, [
            {
                name: 'ID',
                type: 'number'
            },
            {
                name: 'firstName',
                type: 'string'
            },
            {
                name: 'lastName',
                type: 'string'
            },
            {
                name: 'age',
                type: 'number'
            },
            {
                name: 'countryID',
                type: 'number'
            },
            {
                name: 'stateID',
                type: 'number'
            },
            {
                name: 'cityID',
                type: 'number'
            }
        ]);

        res.status(200).json({
            success: true,
            message: "List of athletes",
            data: {
                count: await selectQuery(
                    'Athletes',
                    true,
                    searchOptions,
                    filterQueryOptions
                ),
                athletes: await selectQuery(
                    'Athletes',
                    false,
                    searchOptions,
                    filterQueryOptions
                )
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: null
            }
        });
    }

}

async function POST(req: NextApiRequest, res: NextApiResponse<any>) {

    try {

        const props = [...athleteProps];
        props.shift();

        const [athlete, errors] = validateRequestBody(
            props,
            props,
            ['age', 'cityID', 'stateID', 'countryID'],
            req.body
        );

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        if (!AthleteQueries.isTypeAthlete(athlete, true)) {
            throw new Error("Invalid athlete!");
        }

        await validatePlaceIds({
            cityID: athlete.cityID,
            stateID: athlete.stateID,
            countryID: athlete.countryID
        }, []);

        res.status(200).json({
            success: true,
            message: "Athlete created!",
            data: {
                ID: await AthleteQueries.create(athlete)
            }
        });

    } catch (error: any) {

        res.status(500).json({
            success: false,
            error: {
                message: error.message,
                code: null
            }
        });

    }

}