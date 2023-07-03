import { TriathlonSchema, TriathlonTypesFilterOptionSchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, TriathlonService } from "@/services";
import { Triathlons } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonTypesFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('Triathlons') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            TriathlonService.getAll(validatedFilter, validatedPagination, true),
            TriathlonService.getAll(validatedFilter, validatedPagination)
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

        const body = await req.json();
        const triathlon = TriathlonSchema.parse(body) as Triathlons;

        // TODO: Check if countryID is valid

        return NextResponse.json({
            success: true,
            triathlon: await TriathlonService.create(triathlon)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}