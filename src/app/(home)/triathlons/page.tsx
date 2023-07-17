'use client';

import { useDataContext, useTranslationContext } from "@/providers";
import { useEffect, useState } from "react";
import DataTable from "@/components/tables/DataTable/DataTable";
import { triathlonColumns } from "@/components/tables/columns";
import { Triathlons } from "@prisma/client";
import { changeFirstLetter } from "@/helpers";
import { Skeleton } from "@/components/ui/skeleton";

function TriathlonsPage() {

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
    ])

    const getLocation = (triathlon: Triathlons) => {

        const city = citiesData?.find(({ ID }) => ID === triathlon.cityID)?.name;
        const state = statesData?.find(({ ID }) => ID === triathlon.stateID)?.name;
        const country = countriesData?.find(({ ID }) => ID === triathlon.countryID)?.name;

        let locations: string[] = [];

        if (city) {
            locations.push(changeFirstLetter(city));
        }

        if (state) {
            locations.push(state);
        }

        if (country) {
            locations.push(country);
        }

        return locations.join(', ');

    }

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

    const TableView = () => {

        const data = triathlonsData?.map(triathlon => ({
            year: triathlon.year,
            triathlonType: triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.name || 'N/A',
            worldChampionship: triathlon.isWorldChampionship ?? false,
            location: getLocation(triathlon) || t['unknown'],
            organization: organizationsData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.ID)?.organizationID)?.acronym || 'N/A'
        }));

        return (
            <DataTable
                data={data || []}
                columns={triathlonColumns}
                includeSearch={true}
                searchPlaceholder={t['placeholder-search_triathlons']}
                filters={getFilters()}
            />
        );

    }

    return (
        <div>
            <header>
                {translationsLoading && <HeaderSkeletonLoaderView />}
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

function HeaderSkeletonLoaderView() {
    return (
        <div style={{ display: 'grid', gap: '0.25rem' }}>
            <Skeleton className="h-9 w-[8rem]" style={{ marginBottom: '0.5rem' }} />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
        </div>
    );
}

function LoadingTableSkeletonView() {

    return (
        <>
            <div style={{
                display: 'grid',
                gridTemplateColumns: '12rem 6rem 6rem 1fr 4rem',
                gap: '1rem',
                marginBottom: '0.25rem'
            }}>
                <div style={{ gridColumn: '1/2' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '2/3' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '3/4' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
                <div style={{ gridColumn: '5/6' }}>
                    <Skeleton className="h-8 w-full mx-auto" />
                </div>
            </div>
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-slate-50">
                        <tr>
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                            <th className="py-3 px-4" />
                        </tr>
                    </thead>

                    <tbody className="bg-white divide-y divide-gray-200">
                        {Array(8).fill(null).map((_, index) => (
                            <tr key={index}>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                                <td className="py-3 px-2">
                                    <Skeleton className="h-4 w-20 mx-auto" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="py-3 flex items-center justify-between">
                <nav className="relative z-0 inline-flex shadow-sm -space-x-px" style={{
                    display: 'grid',
                    gridTemplateColumns: '9rem 1fr 8rem 10rem',
                    gap: '1rem',
                    width: '100%'
                }}>
                    <div style={{ gridColumn: '1/2', display: 'flex', alignItems: 'center' }}>
                        <Skeleton className="h-4 w-full mx-auto" />
                    </div>
                    <div style={{ gridColumn: '2/3' }} />
                    <div style={{ gridColumn: '3/4', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Skeleton className="h-4 w-10 mx-auto" />
                        <Skeleton className="h-8 w-20 mx-auto" />
                    </div>
                    <div style={{ gridColumn: '4/5', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                        <Skeleton className="h-8 w-full mx-auto" />
                    </div>
                </nav>
            </div>
        </>
    );

}

export default TriathlonsPage;