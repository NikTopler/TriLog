import { isIdentifier } from "@/helpers";
import { RequestParams } from "@/types";
import { TriathlonCategorySchemaOptional } from "@/schemas";
import TriathlonCategoryService from "@/services/models/TriathlonCategoryService";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid triathlon category ID";

type TriathlonCategoryParams = RequestParams<{
    categoryId: string
}>;

export async function GET(req: NextRequest, { params }: TriathlonCategoryParams) {

    try {

        const ID = Number(params.categoryId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await TriathlonCategoryService.getById(ID)
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            status: 400,
            message: INVALID_ID_ERROR_MESSAGE
        });

    }

}


export async function PUT(req: NextRequest, { params }: TriathlonCategoryParams) {

    try {

        const ID = Number(params.categoryId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const category = TriathlonCategorySchemaOptional.parse(body);

            if (Object.keys(category).length === 0) {
                throw new Error("No valid fields to update");
            }

            return NextResponse.json({
                success: true,
                data: await TriathlonCategoryService.update(ID, category)
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function DELETE(req: NextRequest, { params }: TriathlonCategoryParams) {

    try {

        const ID = Number(params.categoryId);

        if (isIdentifier(ID)) {

            // TODO: delete triathlon category's children
            await TriathlonCategoryService.delete(ID);

            return NextResponse.json({
                success: true,
                data: { ID }
            }, { status: 200 });

        }

        throw new Error(INVALID_ID_ERROR_MESSAGE);

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}