import { NextRequest, NextResponse } from "next/server";
import { TriathlonCategoryFilterOptionSchema, TriathlonCategorySchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, TriathlonCategoryService } from "@/services";
import { TriathlonCategories } from "@prisma/client";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonCategoryFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('TriathlonCategories') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            TriathlonCategoryService.getAll(validatedFilter, validatedPagination, true),
            TriathlonCategoryService.getAll(validatedFilter, validatedPagination)
        ]);

        return NextResponse.json({
            success: true,
            count,
            data
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });
    }

}

export async function POST(req: NextRequest) {

    try {

        const body = req.json();
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