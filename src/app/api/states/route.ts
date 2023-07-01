import { StateFilterOptionSchema, StateSchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, StateService } from "@/services";
import { States } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = StateFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(BaseService.getColumnNames('States') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            StateService.getAll(validatedFilter, validatedPagination, true),
            StateService.getAll(validatedFilter, validatedPagination)
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
        const state = StateSchema.parse(body) as States;

        // TODO: Check if countryID is valid

        return NextResponse.json({
            success: true,
            state: await StateService.create(state)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}