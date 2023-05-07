import { parsePositiveInt, parseQueryStringToObject } from "@/helpers";
import { AthleteSchemaOptional } from "@/schemas";
import { AthleteService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

const INVALID_ID_ERROR_MESSAGE = "Invalid athlete ID";

export async function GET(req: NextRequest) {

    try {

        const [, , , athleteId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(athleteId, INVALID_ID_ERROR_MESSAGE);

        return NextResponse.json({
            success: true,
            data: await AthleteService.getById(ID)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function PUT(req: NextRequest) {

    try {

        const [, , , athleteId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(athleteId, INVALID_ID_ERROR_MESSAGE);

        const body = parseQueryStringToObject(await req.text());

        const athlete = AthleteSchemaOptional.parse({ ...body, ID });

        if (Object.keys(athlete).length === 1) {
            throw new Error("No valid fields to update");
        }

        //TODO: validate place ids

        return NextResponse.json({
            success: true,
            athlete: await AthleteService.update(ID, athlete)
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}

export async function DELETE(req: NextRequest) {

    try {

        const [, , , athleteId] = req.nextUrl.pathname.split('/');
        const ID = await parsePositiveInt(athleteId, INVALID_ID_ERROR_MESSAGE);

        // TODO: delete athlete's children (participations, results, etc.)

        await AthleteService.delete(ID);

        return NextResponse.json({
            success: true,
            data: { ID }
        }, { status: 200 });

    } catch (error: any) {

        return NextResponse.json({
            success: false,
            error: (error instanceof Error) ? error.message : error
        }, { status: 400 });

    }

}