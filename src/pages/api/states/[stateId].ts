import StateQueries from "@/server/shared/lib/database/queries/StateQueries";
import deleteQuery from "@/server/shared/lib/database/queries/helpers/deleteQuery";
import updateQuery from "@/server/shared/lib/database/queries/helpers/updateQuery";
import { SPECIFIC_API_ROUTE_SUPPORTED_METHODS } from "@/shared/helpers/constants";
import isNumber from "@/shared/helpers/isNumber";
import validateObjects from "@/shared/helpers/validateObjects";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    const stateId = Number(req.query.stateId);

    if (!isNumber(stateId)) {
        return res.status(400).json({ message: "Invalid state ID" });
    }

    if (!SPECIFIC_API_ROUTE_SUPPORTED_METHODS.includes(req.method as string)) {
        return res.status(200).json({ message: "Method not supported!" });
    }

    const state = await StateQueries.getById(stateId);
    if (state === null) {
        return res.status(404).json({ message: "State not found" });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json({
                success: true,
                message: "State found",
                data: {
                    state
                }
            });
        case 'PUT':
            return UPDATE(req, res, stateId);
        case 'DELETE':
            return DELETE(req, res, stateId);
        default:
            return res.status(501).json({ message: 'Method has not yet been implemented!' });
    }

}

async function UPDATE(req: NextApiRequest, res: NextApiResponse<any>, stateId: number) {

    try {

        const validatedState = validateObjects(req.body, {
            name: {
                allowedTypes: ['string'],
                isRequired: false
            },
            acronym: {
                allowedTypes: ['string'],
                isRequired: false
            },
            countryID: {
                allowedTypes: ['number'],
                isRequired: false
            }
        });

        await updateQuery('States', validatedState, { id: stateId });

        return res.status(200).json({
            success: true,
            message: "State updated successfully",
            data: {
                ID: stateId,
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

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>, stateId: number) {

    try {

        await deleteQuery('States', { ID: stateId });

        return res.status(200).json({
            success: true,
            message: "State deleted successfully",
            data: {
                ID: stateId,
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