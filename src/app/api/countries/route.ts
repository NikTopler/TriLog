import { NextRequest, NextResponse } from "next/server";
import { Countries } from "@prisma/client";
import { CountryService, BaseService } from "@/services";
import { CountryFilterOptionSchema, CountrySchema, createPaginationOptionSchema } from "@/schemas";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = CountryFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('Countries') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            CountryService.getAll(validatedFilter, validatedPagination, true),
            CountryService.getAll(validatedFilter, validatedPagination)
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
        const country = CountrySchema.parse(body) as Countries;

        return NextResponse.json({
            success: true,
            country: await CountryService.create(country)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}