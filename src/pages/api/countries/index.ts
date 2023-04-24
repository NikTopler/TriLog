import sanitizeApiQueryParams from "@/server/modules/helpers/sanitizeApiQueryParams";
import CountryQueries from "@/server/shared/lib/database/queries/CountryQueries";
import selectQuery from "@/server/shared/lib/database/queries/helpers/selectQuery";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";
import sanitizeObject from "@/shared/helpers/sanitizeObject";
import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import { countryProps } from "@/shared/models";
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

        const filterQueryOptions = sanitizeApiQueryParams(req, countryProps);

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
                name: 'fullName',
                type: 'string'
            },
            {
                name: 'alpha2',
                type: 'string'
            },
            {
                name: 'alpha3',
                type: 'string'
            },
            {
                name: 'continentCode',
                type: 'string'
            },
            {
                name: 'number',
                type: 'string'
            }
        ]);

        res.status(200).json({
            success: true,
            message: "List of countries",
            data: {
                count: await selectQuery(
                    'Countries',
                    true,
                    searchOptions,
                    filterQueryOptions
                ),
                countries: await selectQuery(
                    'Countries',
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

        const props = [...countryProps];
        props.shift();

        const [country, errors] = validateRequestBody(
            props,
            props,
            [],
            req.body
        );

        if (errors.length > 0) {
            throw new Error(errors.join(', '));
        }

        if (!CountryQueries.isTypeCountry(country, true)) {
            throw new Error("Invalid athlete!");
        }

        res.status(200).json({
            success: true,
            message: "Country created successfully!",
            data: {
                ID: await CountryQueries.create(country)
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