import { NextRequest, NextResponse } from "next/server";
import { Athletes } from "@prisma/client";
import { AthleteService, BaseService } from "@/services";
import { AthleteFilterOptionSchema, AthleteSchema, createPaginationOptionSchema } from "@/schemas";
import { AthleteColumns, Order, ParticipationColumns } from "@/types";

const DEFAULT_PAGE = 1;
const DEFAULT_PER_PAGE = 20;

const DEFAULT_ATHLETE_ORDER: Order = 'asc';
const DEFAULT_ATHLETE_ORDER_BY: AthleteColumns = 'lastName';

const DEFAULT_PARTICIPATION_ORDER: Order = 'asc';
const DEFAULT_PARTICIPATION_ORDER_BY: ParticipationColumns = 'rank';

export async function GET(req: NextRequest) {

    const searchParams = Object.fromEntries(req.nextUrl.searchParams);

    try {

        let countPromise, dataPromise;
        const triathlonName = searchParams.triathlonName?.replaceAll('_', ' ');

        if (triathlonName) {

            const validatedPagination = createPaginationOptionSchema<ParticipationColumns>(
                BaseService.getColumnNames('Participations') || [],
                DEFAULT_PER_PAGE,
                DEFAULT_PAGE,
                DEFAULT_PARTICIPATION_ORDER,
                DEFAULT_PARTICIPATION_ORDER_BY
            ).parse(searchParams);

            countPromise = AthleteService.getAllByTriathlonName(triathlonName, validatedPagination, true);
            dataPromise = AthleteService.getAllByTriathlonName(triathlonName, validatedPagination);

        } else {

            const validatedFilter = AthleteFilterOptionSchema.parse(searchParams);
            const validatedPagination = createPaginationOptionSchema<AthleteColumns>(
                BaseService.getColumnNames('Athletes') || [],
                DEFAULT_PER_PAGE,
                DEFAULT_PAGE,
                DEFAULT_ATHLETE_ORDER,
                DEFAULT_ATHLETE_ORDER_BY
            ).parse(searchParams);

            AthleteService.getAll(validatedFilter, validatedPagination, true),
                AthleteService.getAll(validatedFilter, validatedPagination)

            countPromise = AthleteService.getAll(validatedFilter, validatedPagination, true);
            dataPromise = AthleteService.getAll(validatedFilter, validatedPagination);

        }

        const [count, data] = await Promise.all([countPromise, dataPromise]);

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