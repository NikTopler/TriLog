import { isIdentifier } from "@/helpers";
import { RequestParams } from "@/types";
import { AthleteSchemaOptional } from "@/schemas";
import { AthleteService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid athlete ID";

type AthleteParams = RequestParams<{
    athleteId: string
}>;

export async function GET(req: NextRequest, { params }: AthleteParams) {

    try {

        const ID = Number(params.athleteId);

        if (isIdentifier(ID)) {

            return NextResponse.json({
                success: true,
                data: await AthleteService.getById(ID)
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

export async function PUT(req: NextRequest, { params }: AthleteParams) {

    try {

        const ID = Number(params.athleteId);

        if (isIdentifier(ID)) {

            const body = await req.json();
            const athlete = AthleteSchemaOptional.parse(body);

            if (Object.keys(athlete).length === 0) {
                throw new Error("No valid fields to update");
            }

            //TODO: validate place ids
            return NextResponse.json({
                success: true,
                data: await AthleteService.update(ID, athlete)
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

export async function DELETE(req: NextRequest, { params }: AthleteParams) {

    try {

        const ID = Number(params.athleteId);

        if (isIdentifier(ID)) {

            // TODO: delete athlete's children (participations, results, etc.)
            await AthleteService.delete(ID);

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