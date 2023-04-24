import CountryQueries from "@/server/shared/lib/database/queries/CountryQueries";
import deleteQuery from "@/server/shared/lib/database/queries/helpers/deleteQuery";
import updateQuery from "@/server/shared/lib/database/queries/helpers/updateQuery";
import validateRequestBody from "@/server/shared/lib/database/queries/helpers/validateRequestBody";
import { SPECIFIC_API_ROUTE_SUPPORTED_METHODS } from "@/shared/helpers/constants";
import isNumber from "@/shared/helpers/isNumber";
import validateObjects from "@/shared/helpers/validateObjects";
import { countryProps } from "@/shared/models";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {

    const countryId = Number(req.query.countryId);

    if (!isNumber(countryId)) {
        return res.status(400).json({ message: "Invalid country ID" });
    }

    if (!SPECIFIC_API_ROUTE_SUPPORTED_METHODS.includes(req.method as string)) {
        return res.status(200).json({ message: "Method not supported!" });
    }

    const country = await CountryQueries.getById(countryId);
    if (country === null) {
        return res.status(404).json({ message: "Country not found" });
    }

    switch (req.method) {
        case 'GET':
            return res.status(200).json({
                success: true,
                message: "Country found",
                data: {
                    country
                }
            });
        case 'PUT':
            return UPDATE(req, res, countryId);
        case 'DELETE':
            return DELETE(req, res, countryId);
        default:
            return res.status(501).json({ message: 'Method has not yet been implemented!' });
    }

}

async function UPDATE(req: NextApiRequest, res: NextApiResponse<any>, countryId: number) {

    try {

        const props = [...countryProps];
        props.shift();

        const [country, errors] = validateRequestBody(
            props,
            [],
            [],
            req.body
        );

        if (errors.length > 0) {
            throw new Error(errors.join(','));
        }

        if (Object.keys(country).length === 0) {
            throw new Error("No valid fields to update");
        }

        if (!CountryQueries.isTypeCountry(country, false)) {
            throw new Error("Invalid country!");
        }

        await updateQuery('Countries', country, { ID: countryId });

        res.status(200).json({
            success: true,
            message: "Country updated",
            data: {
                ID: countryId
            }
        });

    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error",
    });

}

async function DELETE(req: NextApiRequest, res: NextApiResponse<any>, countryId: number) {

    try {

        await deleteQuery('Countries', { ID: countryId });

        res.status(200).json({
            success: true,
            message: "Country deleted",
            data: {
                ID: countryId
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