import PlaceIds from "@/shared/interfaces/PlaceIds";
import CityQueries from "../CityQueries";
import StateQueries from "../StateQueries";
import CountryQueries from "../CountryQueries";

async function validatePlaceIds({ cityID, stateID, countryID }: PlaceIds, requiredArr = ['cityID', 'stateID', 'countryID']) {

    if (!cityID
        && !stateID
        && !countryID
        && requiredArr.length === 0
    ) {
        return;
    }

    const errors: string[] = [];

    if (!cityID && requiredArr.includes('cityID')) {
        errors.push("missing CityID");
    }

    if (!stateID && requiredArr.includes('stateID')) {
        errors.push("missing StateID");
    }

    if (!countryID && requiredArr.includes('countryID')) {
        errors.push("missing CountryID");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(','));
    }

    const [city, state, country] = await Promise.all([
        cityID ? CityQueries.getById(cityID) : true,
        stateID ? StateQueries.getById(stateID) : true,
        countryID ? CountryQueries.getById(countryID) : true
    ]);

    if (!city) {
        errors.push("invalid CityID");
    }

    if (!state) {
        errors.push("invalid StateID");
    }

    if (!country) {
        errors.push("invalid CountryID");
    }

    if (errors.length > 0) {
        throw new Error(errors.join(','));
    }

}

export default validatePlaceIds;