import { Cities, Countries, States, Triathlons } from "@prisma/client";
import changeFirstLetter from "./changeFirstLetter";

function getLocationFromTriathlon(
    cities: Cities[],
    states: States[],
    countries: Countries[],
    { cityID, stateID, countryID }: Triathlons
) {

    const city = cities.find(({ ID }) => ID === cityID)?.name;
    const state = states.find(({ ID }) => ID === stateID)?.name;
    const country = countries?.find(({ ID }) => ID === countryID)?.name;

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

export default getLocationFromTriathlon;