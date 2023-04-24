import OrganizationQueries from "@/server/shared/lib/database/queries/OrganizationQueries";
import deleteQuery from "@/server/shared/lib/database/queries/helpers/deleteQuery";
import updateQuery from "@/server/shared/lib/database/queries/helpers/updateQuery";
import { SPECIFIC_API_ROUTE_SUPPORTED_METHODS } from "@/shared/helpers/constants";
import isNumber from "@/shared/helpers/isNumber";
import validateObjects from "@/shared/helpers/validateObjects";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const organizationId = Number(req.query.organizationId);

    if (!isNumber(organizationId)) {
        return res.status(400).json({ message: "Invalid organization ID" });
    }

    if (!SPECIFIC_API_ROUTE_SUPPORTED_METHODS.includes(req.method as string)) {
        return res.status(200).json({ message: "Method not supported!" });
    }

    const organization = await OrganizationQueries.getById(organizationId);
    if (organization === null) {
        return res.status(404).json({ message: "Organization not found" });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json({
                success: true,
                message: "Organization found",
                data: {
                    organization
                }
            });
        case 'PUT':
            return UPDATE(req, res, organizationId);
        case 'DELETE':
            return DELETE(req, res, organizationId);
        default:
            return res.status(501).json({ message: "Method has not yet been implemented!" });
    }

}

async function UPDATE(req: NextApiRequest, res: NextApiResponse<any>, organizationId: number) {

    try {

        const validatedOrganization = validateObjects(req.body, {
            name: {
                allowedTypes: ['string'],
                isRequired: false
            },
            acronym: {
                allowedTypes: ['string'],
                isRequired: false
            }
        });

        await updateQuery('Organizations', validatedOrganization, { ID: organizationId });

        return res.status(200).json({
            success: true,
            message: "Organization updated successfully",
            data: {
                ID: organizationId,
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

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>, organizationId: number) {

    try {

        await deleteQuery('Organizations', { ID: organizationId });

        res.status(200).json({
            success: true,
            message: "Organization deleted",
            data: {
                ID: organizationId
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