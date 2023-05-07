import { NextRequest, NextResponse } from "next/server";
import { Athletes } from "@prisma/client";
import { DatabaseConn } from "@/utils";
import { AthleteService } from "@/services";
import { AthleteFilterOptionSchema, AthleteSchema, createPaginationOptionSchema } from "@/schemas";
import { parseQueryStringToObject } from "@/helpers";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = AthleteFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(DatabaseConn.getColumnNames('Athletes') || []).parse(searchParams);

        return NextResponse.json({
            success: true,
            count: await AthleteService.getAll(validatedFilter, validatedPagination, true),
            data: await AthleteService.getAll(validatedFilter, validatedPagination)
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