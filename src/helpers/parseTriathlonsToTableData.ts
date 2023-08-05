import { Cities, Countries, Organizations, States, TriathlonTypes, Triathlons } from "@prisma/client";
import getLocationFromTriathlon from "./getLocationFromTriathlon";
import { Order } from "@/types";
import { TriathlonTable } from "@/components/tables/columns";

function parseTriathlonsToTableData(
    triathlons: Triathlons[],
    triathlonTypesData: TriathlonTypes[],
    citiesData: Cities[],
    statesData: States[],
    countriesData: Countries[],
    organizationsData: Organizations[],
    t: Record<string, string>,
    orderBy: keyof TriathlonTable = 'year',
    order: Order = 'desc'
) {

    return triathlons.map(triathlon => ({
        ID: triathlon.ID,
        name: triathlon.name,
        year: triathlon.year,
        triathlonType: triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.name || 'N/A',
        worldChampionship: triathlon.isWorldChampionship ?? false,
        location: getLocationFromTriathlon(citiesData, statesData, countriesData, triathlon) || t['unknown'],
        organization: organizationsData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.ID)?.organizationID)?.acronym || 'N/A'
    })).sort((a, b) =>
        order === 'asc'
            ? a[orderBy] > b[orderBy]
                ? 1
                : -1
            : a[orderBy] < b[orderBy]
                ? 1
                : -1
    );

}

export default parseTriathlonsToTableData;