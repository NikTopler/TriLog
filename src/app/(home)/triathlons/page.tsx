'use client';

import { useDataContext, useTranslationContext } from "@/providers";
import { useEffect, useState } from "react";
import DataTable from "@/components/tables/DataTable/DataTable";
import { triathlonColumns } from "@/components/tables/columns";
import { changeFirstLetter, parseTriathlonsToTableData } from "@/helpers";
import { LoadingTableSkeletonView, MainHeaderSkeletonLoaderView } from "@/components/loaders";
import { usePage } from "@/hooks";

function TriathlonsPage() {

    const page = usePage();
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

    const triathlonsData = triathlons.data;
    const triathlonTypesData = triathlonTypes.data;
    const organizationsData = organizations.data;
    const countriesData = countries.data;
    const statesData = states.data;
    const citiesData = cities.data;

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

    const getFilters = () => {

        const triathlonTypes = triathlonTypesData?.map(({ name }) => name);
        const organizations = organizationsData?.map(({ acronym }) => acronym);

        return [
            {
                title: changeFirstLetter(t['type_plural']),
                columnName: 'triathlonType',
                defaultValues: triathlonTypes,
                options: triathlonTypes?.map(type => ({ label: type, value: type })) || []
            },
            {
                title: changeFirstLetter(t['organization_plural']),
                columnName: 'organization',
                defaultValues: organizations,
                options: organizations?.map(organization => ({ label: organization, value: organization })) || []
            }
        ];

    }

    const TableView = () => (
        <DataTable
            data={parseTriathlonsToTableData(
                triathlonsData!,
                triathlonTypesData!,
                citiesData!,
                statesData!,
                countriesData!,
                organizationsData!,
                t
            )}
            columns={triathlonColumns}
            handleRowClick={({ name }) => page.open(`/triathlons/${name.replace(/\s/g, '-').toLowerCase()}`)}
            includeSearch={true}
            searchPlaceholder={t['placeholder-search_triathlons']}
            filters={getFilters()}
        />
    );

    return (
        <div>
            <header>
                {translationsLoading && <MainHeaderSkeletonLoaderView />}
                {!translationsLoading && (
                    <>
                        <h1 className="text-2xl font-bold tracking-tight">
                            {changeFirstLetter(t['recent'])}
                        </h1>
                        <p className="text-muted-foreground">
                            {t['triathlons_page-description']}
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

export default TriathlonsPage;