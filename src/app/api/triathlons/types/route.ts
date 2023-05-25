import { NextRequest, NextResponse } from "next/server";
import { TriathlonTypeSchema, TriathlonTypesFilterOptionSchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, TriathlonTypeService } from "@/services";
import { parseQueryStringToObject } from "@/helpers";
import { TriathlonTypes } from "@prisma/client";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonTypesFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('TriathlonTypes') || []).parse(searchParams);

        return NextResponse.json({
            success: true,
            count: await TriathlonTypeService.getAll(validatedFilter, validatedPagination, true),
            data: await TriathlonTypeService.getAll(validatedFilter, validatedPagination)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });

    }

}

export async function POST(req: NextRequest) {

    const body = parseQueryStringToObject(await req.text());

    try {

        const type = TriathlonTypeSchema.parse(body) as TriathlonTypes;

        return NextResponse.json({
            success: true,
            data: await TriathlonTypeService.create(type)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });

    }

}