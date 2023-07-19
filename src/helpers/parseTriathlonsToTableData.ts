import { Cities, Countries, Organizations, States, TriathlonTypes, Triathlons } from "@prisma/client";
import getLocationFromTriathlon from "./getLocationFromTriathlon";

function parseTriathlonsToTableData(
    triathlons: Triathlons[],
    triathlonTypesData: TriathlonTypes[],
    citiesData: Cities[],
    statesData: States[],
    countriesData: Countries[],
    organizationsData: Organizations[],
    t: Record<string, string>
) {

    return triathlons.map(triathlon => ({
        year: triathlon.year,
        triathlonType: triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.name || 'N/A',
        worldChampionship: triathlon.isWorldChampionship ?? false,
        location: getLocationFromTriathlon(citiesData, statesData, countriesData, triathlon) || t['unknown'],
        organization: organizationsData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlonTypesData?.find(({ ID }) => ID === triathlon.triathlonTypeID)?.ID)?.organizationID)?.acronym || 'N/A'
    }));

}

export default parseTriathlonsToTableData;