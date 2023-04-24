import sanitizeApiQueryParams from "@/server/modules/helpers/sanitizeApiQueryParams";
import StateQueries from "@/server/shared/lib/database/queries/StateQueries";
import selectQuery from "@/server/shared/lib/database/queries/helpers/selectQuery";
import sanitizeObject from "@/shared/helpers/sanitizeObject";
import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import { State, stateProps } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {

    switch (req.method) {
        case 'GET':
            return GET(req, res);
        case 'POST':
            return POST(req, res);
        default:
            return res.status(200).json({ message: 'Method not supported!' });
    }

}

async function GET(req: NextApiRequest, res: NextApiResponse) {

    const filterQueryOptions = sanitizeApiQueryParams(req, stateProps);

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
            name: 'acronym',
            type: 'string'
        },
        {
            name: 'countryID',
            type: 'number'
        }
    ]);

    res.status(200).json({
        success: true,
        message: "List of states",
        data: {
            count: await selectQuery(
                'States',
                true,
                searchOptions,
                filterQueryOptions
            ),
            states: await selectQuery(
                'States',
                false,
                searchOptions,
                filterQueryOptions
            )
        }
    });

}

async function POST(req: NextApiRequest, res: NextApiResponse) {

    const { name, acronym, countryID } = req.body;

    try {

        const state: State = {
            ID: -1,
            name,
            acronym,
            countryID: Number(countryID)
        }

        if (!StateQueries.isTypeState(state)) {
            throw new Error("Invalid state type!");
        }

        res.status(200).json({
            success: true,
            message: "State created!",
            data: {
                state: await StateQueries.create(state)
            }
        });

    } catch (error: any) {
        res.status(200).json({
            success: false,
            error: {
                message: error.message,
                code: null
            }
        });
    }

}