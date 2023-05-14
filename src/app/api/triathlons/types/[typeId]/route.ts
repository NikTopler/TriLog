import { NextRequest, NextResponse } from "next/server";
import { TriathlonTypeService } from "@/services";
import { parsePositiveInt, parseQueryStringToObject } from "@/helpers";
import { TriathlonTypeSchemaOptional } from "@/schemas";

const INVALID_ID_ERROR_MESSAGE = "Invalid triathlon type ID";

export async function GET(req: NextRequest) {

    try {

        const [, , , , typeId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(typeId, INVALID_ID_ERROR_MESSAGE);

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

export async function PUT(req: NextRequest) {

    try {

        const [, , , , typeId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(typeId, INVALID_ID_ERROR_MESSAGE);

        const body = parseQueryStringToObject(await req.text());

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

export async function DELETE(req: NextRequest) {

    try {

        const [, , , , typeId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(typeId, INVALID_ID_ERROR_MESSAGE);

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