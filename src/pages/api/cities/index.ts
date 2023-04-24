import sanitizeApiQueryParams from "@/server/modules/helpers/sanitizeApiQueryParams";
import CityQueries from "@/server/shared/lib/database/queries/CityQueries";
import selectQuery from "@/server/shared/lib/database/queries/helpers/selectQuery";
import validatePlaceIds from "@/server/shared/lib/database/queries/helpers/validatePlaceIds";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";
import sanitizeObject from "@/shared/helpers/sanitizeObject";
import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import { cityProps } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";

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

        const filterQueryOptions = sanitizeApiQueryParams(req, cityProps);

        const searchOptions = sanitizeObject(req.query as ConfigOptions, [
            {
                name: 'ID',
                type: 'number'
            },
            {
                name: 'name',
                type: 'string'
            },
            {
                name: 'countryID',
                type: 'number'
            },
            {
                name: 'stateID',
                type: 'number'
            }
        ]);

        res.status(200).json({
            success: true,
            message: "List of cities",
            data: {
                count: await selectQuery(
                    'Cities',
                    true,
                    searchOptions,
                    filterQueryOptions
                ),
                cities: await selectQuery(
                    'Cities',
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

        const props = [...cityProps];
        props.shift();

        const [city, errors] = validateRequestBody(
            props,
            props,
            ['stateID', 'countryID'],
            req.body
        )

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        if (!CityQueries.isTypeCity(city, true)) {
            throw new Error("Invalid city data");
        }

        await validatePlaceIds({
            cityID: null,
            stateID: city.stateID,
            countryID: city.countryID
        }, []);

        res.status(200).json({
            success: true,
            message: "City created",
            data: {
                ID: await CityQueries.create(city)
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