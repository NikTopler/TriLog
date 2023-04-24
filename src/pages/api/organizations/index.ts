import sanitizeApiQueryParams from "@/server/modules/helpers/sanitizeApiQueryParams";
import OrganizationQueries from "@/server/shared/lib/database/queries/OrganizationQueries";
import selectQuery from "@/server/shared/lib/database/queries/helpers/selectQuery";
import sanitizeObject from "@/shared/helpers/sanitizeObject";
import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import { Organization, organizationProps } from "@/shared/models";
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

    try {

        const filterQueryOptions = sanitizeApiQueryParams(req, organizationProps);

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
            }
        ]);

        res.status(200).json({
            success: true,
            message: "List of organizations",
            data: {
                count: await selectQuery(
                    'Organizations',
                    true,
                    searchOptions,
                    filterQueryOptions
                ),
                organizations: await selectQuery(
                    'Organizations',
                    false,
                    searchOptions,
                    filterQueryOptions
                )
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }

}

async function POST(req: NextApiRequest, res: NextApiResponse) {

    const { name, acronym } = req.body;

    try {

        const organization: Organization = {
            ID: -1,
            name,
            acronym
        }

        if (!OrganizationQueries.isTypeOrganization(organization)) {
            throw new Error("Invalid organization data");
        }

        res.status(200).json({
            success: true,
            message: "Organization created",
            data: {
                ID: await OrganizationQueries.create(organization)
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