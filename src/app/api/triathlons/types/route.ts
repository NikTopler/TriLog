import { NextRequest, NextResponse } from "next/server";
import { TriathlonTypesFilterOptionSchema, createPaginationOptionSchema } from "@/schemas";
import { DatabaseConn } from "@/utils";
import { TriathlonTypeService } from "@/services";

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        const validatedFilter = TriathlonTypesFilterOptionSchema.parse(searchParams);
        const validatedPagination = createPaginationOptionSchema(DatabaseConn.getColumnNames('TriathlonTypes') || []).parse(searchParams);

        return NextResponse.json({
            success: true,
            count: await TriathlonTypeService.getAll(validatedFilter, validatedPagination, true),
            data: await TriathlonTypeService.getAll(validatedFilter, validatedPagination)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 400 });

    }

}