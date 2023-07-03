import { isIdentifier } from "@/helpers"; import { TriathlonSchemaOptional } from "@/schemas";
import { TriathlonService } from "@/services";
;
import { RequestParams } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid triathlon ID";

type TriathlonParams = RequestParams<{
    triathlonId: string;
}>

export async function GET(req: NextRequest, { params }: TriathlonParams) {

    try {

        const ID = Number(params.triathlonId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await TriathlonService.getById(ID)
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

export async function PUT(req: NextRequest, { params }: TriathlonParams) {

    try {

        const ID = Number(params.triathlonId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const triathlon = TriathlonSchemaOptional.parse(body);

            if (Object.keys(triathlon).length === 0) {
                throw new Error("No valid fields to update");
            }

            // TODO: Check if countryID is valid

            return NextResponse.json({
                success: true,
                data: await TriathlonService.update(ID, triathlon)
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

export async function DELETE(req: NextRequest, { params }: TriathlonParams) {

    try {

        const ID = Number(params.triathlonId);

        if (isIdentifier(ID)) {

            await TriathlonService.delete(ID);

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
