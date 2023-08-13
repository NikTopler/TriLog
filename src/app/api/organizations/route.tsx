import { OrganizationFilterOptionSchema, createPaginationOptionSchema } from "@/schemas";
import { BaseService, OrganizationService } from "@/services";
import { OrganizationColumns } from "@/types";
import { Organizations } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = OrganizationFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema<OrganizationColumns>(BaseService.getColumnNames('Organizations') || []).parse(searchParams);

        const [count, data] = await Promise.all([
            OrganizationService.getAll(validatedFilter, validatedPagination, true),
            OrganizationService.getAll(validatedFilter, validatedPagination)
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
        const organization = OrganizationFilterOptionSchema.parse(body) as Organizations;

        return NextResponse.json({
            success: true,
            data: await OrganizationService.create(organization)
        }, { status: 201 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}