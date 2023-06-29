'use client';

import { useDataContext } from "@/providers";
import { useEffect, useState } from "react";
import DataTable from "@/components/tables/DataTable/DataTable";
import { triathlonColumns } from "@/components/tables/columns";
import { Triathlons } from "@prisma/client";
import { changeFirstLetter } from "@/helpers";

function TriathlonsPage() {

    const {
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

        if (!triathlons.loading
            && !triathlonTypes.loading
            && !organizations.loading
            && !countries.loading
            && !states.loading
            && !cities.loading
        ) {
            setLoading(false);
        }

    }, [triathlons.loading, triathlonTypes.loading, organizations.loading, countries.loading, states.loading, cities.loading])

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
                title: 'Types',
                columnName: 'triathlonType',
                defaultValues: triathlonTypes,
                options: triathlonTypes?.map(type => ({ label: type, value: type })) || []
            },
            {
                title: 'Organizations',
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
            location: getLocation(triathlon) || 'unknown',
            organization: organizationsData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.ID)?.organizationID)?.acronym || 'N/A'
        }));

        return (
            <DataTable
                data={data || []}
                columns={triathlonColumns}
                includeSearch={true}
                searchPlaceholder="Search Triathlons..."
                filters={getFilters()}
            />
        );

    }

    return (
        <div>
            <header>
                <h1 className="text-2xl font-bold tracking-tight">Recent</h1>
                <p className="text-muted-foreground">
                    Here&apos;s a list of of the most recent triathlons!
                </p>
            </header>
            <section style={{
                display: 'flex',
                alignItems: 'center',
                padding: '1rem'
            }}>
            </section >
            <div>
                {loading && LoadingTableSkeleton()}
                {!loading && TableView()}
            </div>
        </div>
    );

}

function LoadingTableSkeleton() {

    return (
        <div>
            Loading...
        </div>
    );

}

export default TriathlonsPage;