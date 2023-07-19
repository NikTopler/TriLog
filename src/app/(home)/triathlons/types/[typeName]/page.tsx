'use client';

import { LoadingTableSkeletonView, MainHeaderSkeletonLoaderView } from "@/components/loaders";
import DataTable from "@/components/tables/DataTable/DataTable";
import { triathlonColumns } from "@/components/tables/columns";
import { parseTriathlonsToTableData } from "@/helpers";
import { usePage } from "@/hooks";
import { useDataContext, useTranslationContext } from "@/providers";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

function SpecificTriathlonTypePage() {

    const page = usePage();
    const pathname = usePathname();
    const [translationsLoading, lang, t, setLang] = useTranslationContext();

    const {
        dataProviderHasDataLoaded,
        dataProviderLoading,
        triathlons,
        triathlonTypes,
        organizations,
        countries,
        states,
        cities
    } = useDataContext();

    const getTriathlonTypeIds = () => triathlonTypes.data?.map(({ name }) => name.toLowerCase().replace(/\s/g, '-')) || [];
    const getTriathlonType = useCallback(() => pathname.split('/').pop() || '', []);
    const getTitle = useCallback(() => getTriathlonType().replaceAll(' ', '-').toLowerCase(), []);

    const triathlonTypesData = triathlonTypes.data;
    const organizationsData = organizations.data;
    const countriesData = countries.data;
    const statesData = states.data;
    const citiesData = cities.data;

    const triathlonsData = useCallback(() => triathlons?.data?.filter(({ triathlonTypeID }) => triathlonTypeID === triathlonTypesData?.find(({ name }) => name.toLowerCase().replace(/\s/g, '-') === getTriathlonType())?.ID) || [], [])

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (dataProviderHasDataLoaded()) {
            setLoading(false);
        }

    }, [
        dataProviderLoading,
        triathlons.loading,
        triathlonTypes.loading,
        organizations.loading,
        countries.loading,
        states.loading,
        cities.loading
    ]);

    if (!getTriathlonTypeIds().includes(getTriathlonType())) {
        page.open('/triathlons/types');
        return null;
    }

    const TableView = () => (
        <DataTable
            data={parseTriathlonsToTableData(
                triathlonsData(),
                triathlonTypesData!,
                citiesData!,
                statesData!,
                countriesData!,
                organizationsData!,
                t
            )}
            columns={triathlonColumns}
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
                            {t[getTitle()]}
                        </h1>
                        <p className="text-muted-foreground">
                            {t[getTitle() + '-description']}
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

export default SpecificTriathlonTypePage;