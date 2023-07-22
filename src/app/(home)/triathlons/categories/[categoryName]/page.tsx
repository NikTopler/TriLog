'use client';

import { SpecificTriathlonCategoryResponse } from "@/app/api/triathlons/categories/[categoryId]/route";
import { LoadingTableSkeletonView, MainHeaderSkeletonLoaderView } from "@/components/loaders";
import DataTable from "@/components/tables/DataTable/DataTable";
import { triathlonColumns } from "@/components/tables/columns";
import { PATHS } from "@/constants";
import { apiGet, parseTriathlonsToTableData } from "@/helpers";
import { usePage } from "@/hooks";
import { ResourceStatus, defaultResourceStatus, useDataContext, useTranslationContext } from "@/providers";
import { Triathlons } from "@prisma/client";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function SpecificTriathlonCategoryPage() {

    const page = usePage();
    const pathname = usePathname();
    const [translationsLoading, lang, t, setLang] = useTranslationContext();

    const {
        dataProviderHasDataLoaded,
        triathlonTypes,
        triathlonCategories,
        organizations,
        countries,
        states,
        cities
    } = useDataContext();

    const getCategoryAcronym = useCallback(() => pathname.split('/').pop() || '', [pathname]);
    const getCurrentTriathlonCategory = useCallback(() => triathlonCategories.data?.find(({ acronym }) => acronym === getCategoryAcronym()), [triathlonCategories.data]);

    const triathlonTypesData = triathlonTypes.data;
    const organizationsData = organizations.data;
    const countriesData = countries.data;
    const statesData = states.data;
    const citiesData = cities.data;

    const [triathlons, setTriathlons] = useState<ResourceStatus<Triathlons[] | null>>(defaultResourceStatus);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (triathlonCategories.data && !getCurrentTriathlonCategory()) {
            page.open('/triathlons/categories');
        }

    }, [triathlonCategories.data]);

    useEffect(() => {

        const triathlonCategory = getCurrentTriathlonCategory();

        if (!triathlonCategory) {
            return;
        }

        if (!triathlons.data) {
            apiGet<SpecificTriathlonCategoryResponse>(PATHS.api.triathlons.categories.specific.replace(':id', triathlonCategory.ID.toString()), { includeTriathlons: true })
                .then(({ triathlons }) => setTriathlons({ loading: false, data: triathlons || [], error: null }))
                .catch((err) => {
                    console.log({ err });
                    setTriathlons({ loading: false, data: null, error: err });
                });
        }

    }, [
        translationsLoading,
        dataProviderHasDataLoaded(),
        triathlons.loading
    ]);

    useEffect(() => {

        if (loading && !triathlons.loading && triathlons.data) {
            setLoading(false);
        }

    }, [triathlons]);

    const TableView = () => (
        <DataTable
            data={parseTriathlonsToTableData(
                triathlons.data!,
                triathlonTypesData!,
                citiesData!,
                statesData!,
                countriesData!,
                organizationsData!,
                t
            )}
            columns={triathlonColumns}
            handleRowClick={({ ID }) => page.open(`/triathlons/${ID}`)}
            includeSearch={true}
            searchPlaceholder={t['placeholder-search_triathlons']}
        />
    );

    return (
        <div>
            <header>
                {translationsLoading && <MainHeaderSkeletonLoaderView />}
                {!translationsLoading && (
                    <>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {t[getCategoryAcronym()]}
                        </h1>
                        <p className="text-muted-foreground">
                            {t[getCategoryAcronym() + '-description']}
                        </p>
                    </>
                )}
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

export default SpecificTriathlonCategoryPage;