import { isIdentifier } from "@/helpers";
import { CountrySchemaOptional } from "@/schemas";
import { CountryService } from "@/services";
import { RequestParams } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid country ID";

type CountryParams = RequestParams<{
    countryId: string;
}>;

export async function GET(req: NextRequest, { params }: CountryParams) {

    try {

        const ID = Number(params.countryId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await CountryService.getById(ID)
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function PUT(req: NextRequest, { params }: CountryParams) {

    try {

        const ID = Number(params.countryId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const country = CountrySchemaOptional.parse(body);

            if (Object.keys(country).length === 0) {
                throw new Error("No valid fields to update");
            }

            return NextResponse.json({
                success: true,
                data: await CountryService.update(ID, country)
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function DELETE(req: NextRequest, { params }: CountryParams) {

    try {

        const ID = Number(params.countryId);

        if (isIdentifier(ID)) {

            await CountryService.delete(ID);

            return NextResponse.json({
                success: true,
                data: { ID }
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}
