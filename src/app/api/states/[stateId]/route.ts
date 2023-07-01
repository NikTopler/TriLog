import { isIdentifier } from "@/helpers";
import { StateSchemaOptional } from "@/schemas";
import { StateService } from "@/services";
import { RequestParams } from "@/types";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid state ID";

type StateParams = RequestParams<{
    stateId: string;
}>

export async function GET(req: NextRequest, { params }: StateParams) {

    try {

        const ID = Number(params.stateId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await StateService.getById(ID)
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

export async function PUT(req: NextRequest, { params }: StateParams) {

    try {

        const ID = Number(params.stateId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const state = StateSchemaOptional.parse(body);

            if (Object.keys(state).length === 0) {
                throw new Error("No valid fields to update");
            }

            // TODO: Check if countryID is valid

            return NextResponse.json({
                success: true,
                data: await StateService.update(ID, state)
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

export async function DELETE(req: NextRequest, { params }: StateParams) {

    try {

        const ID = Number(params.stateId);

        if (isIdentifier(ID)) {

            await StateService.delete(ID);

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
