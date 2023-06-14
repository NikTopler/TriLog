import { NextRequest, NextResponse } from "next/server";
import { Athletes } from "@prisma/client";
import { AthleteService, BaseService } from "@/services";
import { AthleteFilterOptionSchema, AthleteSchema, createPaginationOptionSchema } from "@/schemas";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = AthleteFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('Athletes') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            AthleteService.getAll(validatedFilter, validatedPagination, true),
            AthleteService.getAll(validatedFilter, validatedPagination)
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
        const athlete = AthleteSchema.parse(body) as Athletes;

        //TODO: validate place ids

        return NextResponse.json({
            success: true,
            athlete: await AthleteService.create(athlete)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}