'use client';

import { CITIES_LOCAL_STORAGE_KEY, COUNTRIES_LOCAL_STORAGE_KEY, ORGANIZATIONS_LOCAL_STORAGE_KEY, PATHS, STATES_LOCAL_STORAGE_KEY, TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, TRIATHLON_LOCAL_STORAGE_KEY, TRIATHLON_TYPES_LOCAL_STORAGE_KEY } from "@/constants";
import { apiGet } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { LayoutProps } from "@/types";
import { Cities, Countries, Organizations, States, TriathlonCategories, TriathlonTypes, Triathlons } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { useProgressContext } from "./ProgressProvider";
import { useTranslationContext } from "./TranslationProvider";

export interface ResourceStatus<T> {
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
    dataProviderHasDataLoaded: () => boolean;
    dataProviderLoading: boolean;
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

export const defaultResourceStatus: ResourceStatus<null> = {
    loading: true,
    data: null,
    error: null
};

const DataContext = createContext<DataContextProps>({
    dataProviderHasDataLoaded: () => false,
    dataProviderLoading: true,
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

    const [triathlons, setTriathlons] = useState<TriathlonStatus>(defaultResourceStatus);
    const [triathlonTypes, setTriathlonTypes] = useState<TriathlonTypeStatus>(defaultResourceStatus);
    const [triathlonCategories, setTriathlonCategories] = useState<TriathlonCategoryStatus>(defaultResourceStatus);
    const [organizations, setOrganizations] = useState<OrganizationStatus>(defaultResourceStatus);
    const [countries, setCountries] = useState<CountryStatus>(defaultResourceStatus);
    const [states, setStates] = useState<StateStatus>(defaultResourceStatus);
    const [cities, setCities] = useState<CityStatus>(defaultResourceStatus);

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => setLoading(translationsLoading), [translationsLoading])

    useEffect(() => {

        if (triathlonLS) {
            setTriathlons({ loading: false, data: triathlonLS, error: null });
        } else {
            fetchAndSetData<Triathlons[]>(
                apiGet(PATHS.api.triathlons.all, { perPage: 500 }),
                setTriathlons,
                setTriathlonLS
            ).finally(() => progressContext.removeLoading('triathlons'));
            progressContext.add({ key: 'triathlons', weight: loadingWeights.triathlons, loading: true });
        }

        if (triathlonTypesLS) {
            setTriathlonTypes({ loading: false, data: triathlonTypesLS, error: null });
        } else {
            fetchAndSetData<TriathlonTypes[]>(
                apiGet(PATHS.api.triathlons.types.all, {}),
                setTriathlonTypes,
                setTriathlonTypesLS
            ).finally(() => progressContext.removeLoading('triathlonTypes'));
            progressContext.add({ key: 'triathlonTypes', weight: loadingWeights.triathlonTypes, loading: true });
        }

        if (triathlonCategoriesLS) {
            setTriathlonCategories({ loading: false, data: triathlonCategoriesLS, error: null });
        } else {
            fetchAndSetData<TriathlonCategories[]>(
                apiGet(PATHS.api.triathlons.categories.all, {}),
                setTriathlonCategories,
                setTriathlonCategoriesLS
            ).finally(() => progressContext.removeLoading('triathlonCategories'));
            progressContext.add({ key: 'triathlonCategories', weight: loadingWeights.triathlonCategories, loading: true });
        }

        if (organizationsLS) {
            setOrganizations({ loading: false, data: organizationsLS, error: null });
        } else {
            fetchAndSetData<Organizations[]>(
                apiGet(PATHS.api.organizations.all, {}),
                setOrganizations,
                setOrganizationsLS
            ).finally(() => progressContext.removeLoading('organizations'));
            progressContext.add({ key: 'organizations', weight: loadingWeights.organizations, loading: true });
        }

        if (countriesLS) {
            setCountries({ loading: false, data: countriesLS, error: null });
        } else {
            fetchAndSetData<Countries[]>(
                apiGet(PATHS.api.countries.all, {}),
                setCountries,
                setCountriesLS
            ).finally(() => progressContext.removeLoading('countries'));
            progressContext.add({ key: 'countries', weight: loadingWeights.countries, loading: true });
        }

        if (statesLS) {
            setStates({ loading: false, data: statesLS, error: null });
        } else {
            fetchAndSetData<States[]>(
                apiGet(PATHS.api.states.all, {}),
                setStates,
                setStatesLS
            ).finally(() => progressContext.removeLoading('states'));
            progressContext.add({ key: 'states', weight: loadingWeights.states, loading: true });
        }

        if (citiesLS) {
            setCities({ loading: false, data: citiesLS, error: null });
        } else {
            fetchAndSetData<Cities[]>(
                apiGet(PATHS.api.cities.all, {}),
                setCities,
                setCitiesLS
            ).finally(() => progressContext.removeLoading('cities'));
            progressContext.add({ key: 'cities', weight: loadingWeights.cities, loading: true });
        }

    }, []);

    const haveAllDataLoaded = () => (
        !loading
        && !triathlons.loading
        && !triathlonTypes.loading
        && !triathlonCategories.loading
        && !organizations.loading
        && !countries.loading
        && !states.loading
        && !cities.loading
    );

    return (
        <DataContext.Provider value={{
            dataProviderHasDataLoaded: haveAllDataLoaded,
            dataProviderLoading: loading,
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