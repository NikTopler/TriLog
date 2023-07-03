import { isIdentifier } from "@/helpers";
import { CitySchemaOptional } from "@/schemas";
import { CityService } from "@/services";
import { RequestParams } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid city ID";

type CityParams = RequestParams<{
    cityId: string;
}>

export async function GET(req: NextRequest, { params }: CityParams) {

    try {

        const ID = Number(params.cityId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await CityService.getById(ID)
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

export async function PUT(req: NextRequest, { params }: CityParams) {

    try {

        const ID = Number(params.cityId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const city = CitySchemaOptional.parse(body);

            if (Object.keys(city).length === 0) {
                throw new Error("No valid fields to update");
            }

            // TODO: Check if countryID is valid

            return NextResponse.json({
                success: true,
                data: await CityService.update(ID, city)
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

export async function DELETE(req: NextRequest, { params }: CityParams) {

    try {

        const ID = Number(params.cityId);

        if (isIdentifier(ID)) {

            await CityService.delete(ID);

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
