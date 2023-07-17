'use client';

import { CITIES_LOCAL_STORAGE_KEY, COUNTRIES_LOCAL_STORAGE_KEY, ORGANIZATIONS_LOCAL_STORAGE_KEY, PATHS, STATES_LOCAL_STORAGE_KEY, TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, TRIATHLON_LOCAL_STORAGE_KEY, TRIATHLON_TYPES_LOCAL_STORAGE_KEY } from "@/constants";
import { apiGet } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { LayoutProps } from "@/types";
import { Cities, Countries, Organizations, States, TriathlonCategories, TriathlonTypes, Triathlons } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useProgressContext } from "./ProgressProvider";
import { useTranslationContext } from "./TranslationProvider";

interface ResourceStatus<T> {
    loading: boolean;
    data: T;
    error: any; // TODO: implement error handling
}

type TriathlonStatus = ResourceStatus<Triathlons[] | null>;
type TriathlonTypeStatus = ResourceStatus<TriathlonTypes[] | null>;
type TriathlonCategoryStatus = ResourceStatus<TriathlonCategories[] | null>;
type OrganizationStatus = ResourceStatus<Organizations[] | null>;
type CountryStatus = ResourceStatus<Countries[] | null>;
type StateStatus = ResourceStatus<States[] | null>;
type CityStatus = ResourceStatus<Cities[] | null>;

interface DataContextProps {
    triathlons: TriathlonStatus;
    triathlonTypes: TriathlonTypeStatus;
    triathlonCategories: TriathlonCategoryStatus;
    organizations: OrganizationStatus;
    countries: CountryStatus;
    states: StateStatus;
    cities: CityStatus;
}

const loadingWeights = {
    triathlons: 10,
    triathlonTypes: 1,
    triathlonCategories: 2,
    organizations: 1,
    countries: 4,
    states: 4,
    cities: 4
};

const STATIC_DATA_TTL = 10 * 24 * 60 * 60 * 1000;

const defaultResourceStatus: ResourceStatus<null> = {
    loading: false,
    data: null,
    error: null
};

const DataContext = createContext<DataContextProps>({
    triathlons: defaultResourceStatus,
    triathlonTypes: defaultResourceStatus,
    triathlonCategories: defaultResourceStatus,
    organizations: defaultResourceStatus,
    countries: defaultResourceStatus,
    states: defaultResourceStatus,
    cities: defaultResourceStatus
});

const useDataContext = () => useContext(DataContext);

function DataProvider({ children }: LayoutProps) {

    const progressContext = useProgressContext();
    const [translationsLoading] = useTranslationContext();

    const [triathlonLS, setTriathlonLS] = useLocalStorage<TriathlonStatus['data']>(TRIATHLON_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [triathlonTypesLS, setTriathlonTypesLS] = useLocalStorage<TriathlonTypeStatus['data']>(TRIATHLON_TYPES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [triathlonCategoriesLS, setTriathlonCategoriesLS] = useLocalStorage<TriathlonCategoryStatus['data']>(TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [organizationsLS, setOrganizationsLS] = useLocalStorage<OrganizationStatus['data']>(ORGANIZATIONS_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [countriesLS, setCountriesLS] = useLocalStorage<CountryStatus['data']>(COUNTRIES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [statesLS, setStatesLS] = useLocalStorage<StateStatus['data']>(STATES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [citiesLS, setCitiesLS] = useLocalStorage<CityStatus['data']>(CITIES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);

    const [triathlons, setTriathlons] = useState<TriathlonStatus>({
        ...defaultResourceStatus,
        data: triathlonLS
    });

    const [triathlonTypes, setTriathlonTypes] = useState<TriathlonTypeStatus>({
        ...defaultResourceStatus,
        data: triathlonTypesLS
    });

    const [triathlonCategories, setTriathlonCategories] = useState<TriathlonCategoryStatus>({
        ...defaultResourceStatus,
        data: triathlonCategoriesLS
    });

    const [organizations, setOrganizations] = useState<OrganizationStatus>({
        ...defaultResourceStatus,
        data: organizationsLS
    });

    const [countries, setCountries] = useState<CountryStatus>({
        ...defaultResourceStatus,
        data: countriesLS
    });

    const [states, setStates] = useState<StateStatus>({
        ...defaultResourceStatus,
        data: statesLS
    });

    const [cities, setCities] = useState<CityStatus>({
        ...defaultResourceStatus,
        data: citiesLS
    });

    useEffect(() => {

        if (translationsLoading) {
            return;
        }

        if (!triathlonLS && !triathlons.loading) {
            fetchAndSetData<Triathlons[]>(
                apiGet(PATHS.api.triathlons.all, { perPage: 500 }),
                setTriathlons,
                setTriathlonLS
            ).finally(() => progressContext.removeLoading('triathlons'));

            progressContext.add({ key: 'triathlons', weight: loadingWeights.triathlons, loading: true });
        }

        if (!triathlonTypesLS && !triathlonTypes.loading) {
            fetchAndSetData<TriathlonTypes[]>(
                apiGet(PATHS.api.triathlons.types.all, {}),
                setTriathlonTypes,
                setTriathlonTypesLS
            ).finally(() => progressContext.removeLoading('triathlonTypes'));

            progressContext.add({ key: 'triathlonTypes', weight: loadingWeights.triathlonTypes, loading: true });
        }

        if (!triathlonCategoriesLS && !triathlonCategories.loading) {
            fetchAndSetData<TriathlonCategories[]>(
                apiGet(PATHS.api.triathlons.categories.all, {}),
                setTriathlonCategories,
                setTriathlonCategoriesLS
            ).finally(() => progressContext.removeLoading('triathlonCategories'));

            progressContext.add({ key: 'triathlonCategories', weight: loadingWeights.triathlonCategories, loading: true });
        }

        if (!organizationsLS && !organizations.loading) {
            fetchAndSetData<Organizations[]>(
                apiGet(PATHS.api.organizations.all, {}),
                setOrganizations,
                setOrganizationsLS
            ).finally(() => progressContext.removeLoading('organizations'));

            progressContext.add({ key: 'organizations', weight: loadingWeights.organizations, loading: true });
        }

        if (!countriesLS && !countries.loading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.countries.all, { perPage: 250 }),
                setCountries,
                setCountriesLS
            ).finally(() => progressContext.removeLoading('countries'));

            progressContext.add({ key: 'countries', weight: loadingWeights.countries, loading: true });
        }

        if (!statesLS && !states.loading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.states.all, { perPage: 100 }),
                setStates,
                setStatesLS
            ).finally(() => progressContext.removeLoading('states'));

            progressContext.add({ key: 'states', weight: loadingWeights.states, loading: true });
        }

        if (!citiesLS && !cities.loading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.cities.all, { perPage: 100 }),
                setCities,
                setCitiesLS
            ).finally(() => progressContext.removeLoading('cities'));

            progressContext.add({ key: 'cities', weight: loadingWeights.cities, loading: true });
        }

    }, [translationsLoading]);

    return (
        <DataContext.Provider value={{
            triathlons,
            triathlonTypes,
            triathlonCategories,
            organizations,
            countries,
            states,
            cities
        }}>
            {children}
        </DataContext.Provider>
    );
}

function fetchAndSetData<T>(promise: Promise<T>, setData: Dispatch<SetStateAction<ResourceStatus<T | null>>>, setLocalStorageData: (newValue: T) => void) {

    setData(prev => ({ ...prev, loading: true }));

    return promise
        .then((data) => {
            setData({ loading: false, data, error: null });
            setLocalStorageData(data);
        })
        .catch((error) => {
            console.log(error);
            setData({ loading: false, data: null, error });
        });
}

export {
    DataProvider,
    useDataContext
}