import { parseQueryStringToObject } from "@/helpers";
import { TriathlonCategoryFilterOptionSchema, TriathlonCategorySchema, createPaginationOptionSchema } from "@/schemas";
import TriathlonCategoryService from "@/services/TriathlonCategoryService";
import { DatabaseConn } from "@/utils";
import { TriathlonCategories } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonCategoryFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(DatabaseConn.getColumnNames('TriathlonCategories') || []).parse(searchParams);

        return NextResponse.json({
            success: true,
            count: await TriathlonCategoryService.getAll(validatedFilter, validatedPagination, true),
            data: await TriathlonCategoryService.getAll(validatedFilter, validatedPagination)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });
    }

}

export async function POST(req: NextRequest) {

    const body = parseQueryStringToObject(await req.text());

    try {

        const category = TriathlonCategorySchema.parse(body) as TriathlonCategories;

        return NextResponse.json({
            success: true,
            data: await TriathlonCategoryService.create(category)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });
    }

}