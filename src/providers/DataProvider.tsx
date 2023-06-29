'use client';

import { CITIES_LOCAL_STORAGE_KEY, COUNTRIES_LOCAL_STORAGE_KEY, ORGANIZATIONS_LOCAL_STORAGE_KEY, PATHS, STATES_LOCAL_STORAGE_KEY, TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, TRIATHLON_LOCAL_STORAGE_KEY, TRIATHLON_TYPES_LOCAL_STORAGE_KEY } from "@/constants";
import { apiGet } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { LayoutProps } from "@/types";
import { Cities, Countries, Organizations, States, TriathlonCategories, TriathlonTypes, Triathlons } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ResourceStatus<T> {
    isLoading: boolean;
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

interface DataContext {
    triathlons: TriathlonStatus;
    triathlonTypes: TriathlonTypeStatus;
    triathlonCategories: TriathlonCategoryStatus;
    organizations: OrganizationStatus;
    countries: CountryStatus;
    states: StateStatus;
    cities: CityStatus;
}

const STATIC_DATA_TTL = 10 * 24 * 60 * 60 * 1000;

const defaultResourceStatus: ResourceStatus<null> = {
    isLoading: false,
    data: null,
    error: null
};

const DataContext = createContext<DataContext>({
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

        if(!triathlonLS && !triathlons.isLoading) {
            fetchAndSetData<Triathlons[]>(
                apiGet(PATHS.api.triathlons.all, { perPage: 500 }),
                setTriathlons,
                setTriathlonLS
            );
        }

        if (!triathlonTypesLS && !triathlonTypes.isLoading) {
            fetchAndSetData<TriathlonTypes[]>(
                apiGet(PATHS.api.triathlons.types.all, {}),
                setTriathlonTypes,
                setTriathlonTypesLS
            );
        }

        if (!triathlonCategoriesLS && !triathlonCategories.isLoading) {
            fetchAndSetData<TriathlonCategories[]>(
                apiGet(PATHS.api.triathlons.categories.all, {}),
                setTriathlonCategories,
                setTriathlonCategoriesLS
            );
        }

        if (!organizationsLS && !organizations.isLoading) {
            fetchAndSetData<Organizations[]>(
                apiGet(PATHS.api.organizations.all, {}),
                setOrganizations,
                setOrganizationsLS
            );
        }

        if (!countriesLS && !countries.isLoading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.countries.all, { perPage: 250 }),
                setCountries,
                setCountriesLS
            );
        }

        if (!statesLS && !states.isLoading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.states.all, { perPage: 100 }),
                setStates,
                setStatesLS
            );
        }

        if (!citiesLS && !cities.isLoading) {
            fetchAndSetData<any>(
                apiGet(PATHS.api.cities.all, { perPage: 100 }),
                setCities,
                setCitiesLS
            );
        }

    }, []);

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

    setData(prev => ({ ...prev, isLoading: true }));

    promise
        .then((data) => {
            setData({ isLoading: false, data, error: null });
            setLocalStorageData(data);
        })
        .catch((error) => {
            console.log(error);
            setData({ isLoading: false, data: null, error });
        });
}

export {
    DataProvider,
    useDataContext
}