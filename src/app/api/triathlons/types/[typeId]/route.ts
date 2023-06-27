import { NextRequest, NextResponse } from "next/server";
import { TriathlonTypeService } from "@/services";
import { parsePositiveInt } from "@/helpers";
import { TriathlonTypeSchemaOptional } from "@/schemas";
import { RequestParams } from "@/types";

const INVALID_ID_ERROR_MESSAGE = "Invalid triathlon type ID";

type TriathlonTypeParams = RequestParams<{
    typeId: string
}>;

export async function GET(req: NextRequest, { params }: TriathlonTypeParams) {

    try {

        const ID = await parsePositiveInt(params.typeId, INVALID_ID_ERROR_MESSAGE);

        return NextResponse.json({
            success: true,
            data: await TriathlonTypeService.getById(ID)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            status: 400,
            message: INVALID_ID_ERROR_MESSAGE
        }, { status: 500 });

    }

}

export async function PUT(req: NextRequest, { params }: TriathlonTypeParams) {

    try {

        const ID = await parsePositiveInt(params.typeId, INVALID_ID_ERROR_MESSAGE);
        const body = await req.json();
        const type = TriathlonTypeSchemaOptional.parse(body);

        if (Object.keys(type).length === 0) {
            throw new Error("No valid fields to update");
        }

        return NextResponse.json({
            success: true,
            data: await TriathlonTypeService.update(ID, type)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });
    }

}

export async function DELETE(req: NextRequest, { params }: TriathlonTypeParams) {

    try {

        const ID = await parsePositiveInt(params.typeId, INVALID_ID_ERROR_MESSAGE);

        await TriathlonTypeService.delete(ID);

        return NextResponse.json({
            success: true,
            data: { ID }
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}