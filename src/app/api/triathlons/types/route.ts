import { NextRequest, NextResponse } from "next/server";
import { TriathlonTypeSchema, TriathlonTypesFilterOptionSchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, TriathlonTypeService } from "@/services";
import { TriathlonTypes } from "@prisma/client";
import { TriathlonTypeColumns } from "@/types";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonTypesFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema<TriathlonTypeColumns>(BaseService.getColumnNames('TriathlonTypes') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            TriathlonTypeService.getAll(validatedFilter, validatedPagination, true),
            TriathlonTypeService.getAll(validatedFilter, validatedPagination)
        ]);

        return NextResponse.json({
            success: true,
            count,
            data
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });

    }

}

export async function POST(req: NextRequest) {

    try {
        
        const body = await req.json();
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