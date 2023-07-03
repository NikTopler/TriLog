import { CityFilterOptionSchema, CitySchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, CityService } from "@/services";
import { Cities } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = CityFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('Cities') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            CityService.getAll(validatedFilter, validatedPagination, true),
            CityService.getAll(validatedFilter, validatedPagination)
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
        const city = CitySchema.parse(body) as Cities;

        // TODO: Check if countryID and stateID are valid

        return NextResponse.json({
            success: true,
            city: await CityService.create(city)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}