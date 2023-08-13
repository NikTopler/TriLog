'use client';

import { LoadingTableSkeletonView, MainHeaderSkeletonLoaderView } from "@/components/loaders";
import DataTable from "@/components/tables/DataTable/DataTable";
import { ParticipationTable, SpecificTriathlonParticipationColumns, participationColumns } from "@/components/tables/columns";
import { PATHS } from "@/constants";
import { apiGet, changeFirstLetter, formatTime } from "@/helpers";
import { usePage } from "@/hooks";
import { useTranslationContext } from "@/providers";
import { PaginationOptions } from "@/schemas";
import { ParticipationColumns } from "@/types";
import { PaginationState } from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";

interface SpecificTriathlonViewProps {
    triathlonName: string;
    count: number;
    data: SpecificTriathlonParticipationColumns[];
    pagination: PaginationOptions<ParticipationColumns>
}

function SpecificTriathlonView({ triathlonName, count, data, pagination }: SpecificTriathlonViewProps) {

    const page = usePage();
    const [translationsLoading, lang, t, setLang] = useTranslationContext();

    const [participations, setParticipations] = useState<SpecificTriathlonParticipationColumns[]>(data);
    const [loading, setLoading] = useState(false);

    const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
        pageIndex: pagination.page - 1,
        pageSize: pagination.perPage
    });

    const tableData = useMemo(() => parseParticipationsToTableData(participations), [participations]);

    useEffect(() => {

        if (pageIndex === pagination.page - 1
            && pageSize === pagination.perPage
            && areTwoParticipationArraysEqual(participations, data)) {
            return;
        }

        setLoading(true);

        apiGet<SpecificTriathlonParticipationColumns[]>(PATHS.api.athletes.all, {
            page: pageIndex + 1,
            perPage: pageSize,
            order: pagination.order,
            orderBy: pagination.orderBy,
            triathlonName
        })
            .then(setParticipations)
            .catch(console.error)
            .finally(() => setLoading(false));

        page.setSearchParams(pagination as unknown as Record<string, string>);

    }, [pageIndex, pageSize]);

    const TableView = () => (
        <DataTable
            data={tableData}
            columns={participationColumns}
            handleRowClick={() => { }}
            controlledPagination={{
                pageIndex,
                pageSize,
                pageCount: Math.ceil(count / pageSize),
                onPaginationChange: setPagination,
            }}
        />
    )

    return (
        <div>
            <header>
                {translationsLoading && <MainHeaderSkeletonLoaderView />}
            </header>
            <section style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem'
            }}>
            </section >
            <div>
                {loading && <LoadingTableSkeletonView />}
                {!loading && TableView()}
            </div>
        </div>
    );

}

function parseParticipationsToTableData(participations: SpecificTriathlonParticipationColumns[]): ParticipationTable[] {

    return participations.map(({
        athleteID,
        Athletes: { firstName, lastName, Countries },
        swimTimeSeconds,
        bikeTimeSeconds,
        runTimeSeconds,
        timeSeconds,
        firstTransitionSeconds,
        secondTransitionSeconds,
        startNumber,
        rank,
        DNS,
        DNF,
        points
    }: SpecificTriathlonParticipationColumns) => ({
        athleteID,
        athleteFirstName: changeFirstLetter(firstName),
        athleteLastName: changeFirstLetter(lastName),
        countryAcronym: Countries.alpha3,
        time: timeSeconds && formatTime(timeSeconds) || null,
        swimTime: swimTimeSeconds && formatTime(swimTimeSeconds) || null,
        bikeTime: bikeTimeSeconds && formatTime(bikeTimeSeconds) || null,
        runTime: runTimeSeconds && formatTime(runTimeSeconds) || null,
        firstTransition: firstTransitionSeconds && formatTime(firstTransitionSeconds) || null,
        secondTransition: secondTransitionSeconds && formatTime(secondTransitionSeconds) || null,
        startNumber,
        placement: rank || (DNS ? 'DNS' : DNF ? 'DNF' : '---'),
        points: points ?? 0
    }))

}

function areTwoParticipationArraysEqual(arr1: SpecificTriathlonParticipationColumns[], arr2: SpecificTriathlonParticipationColumns[]) {

    return arr1.every((p, index) => (p.ID === arr2[index].ID
        && p.Athletes.ID === arr2[index].Athletes.ID
        && p.triathlonCategoryID === arr2[index].triathlonCategoryID
        && p.triathlonID === arr2[index].triathlonID
        && p.timeSeconds === arr2[index].timeSeconds
        && p.swimTimeSeconds === arr2[index].swimTimeSeconds
        && p.bikeTimeSeconds === arr2[index].bikeTimeSeconds));

}

export default SpecificTriathlonView;