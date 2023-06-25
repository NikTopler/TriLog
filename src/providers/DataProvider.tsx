'use client';

import { ORGANIZATIONS_LOCAL_STORAGE_KEY, PATHS, TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, TRIATHLON_TYPES_LOCAL_STORAGE_KEY } from "@/constants";
import { apiGet } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { LayoutProps } from "@/interfaces";
import { Organizations, TriathlonCategories, TriathlonTypes } from "@prisma/client";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ResourceStatus<T> {
    isLoading: boolean;
    data: T;
    error: any; // TODO: implement error handling
}

// Temporarily used type any;
// TODO: implement pagination
type AthleteStatus = ResourceStatus<any | null>;
type OrganizationStatus = ResourceStatus<Organizations[] | null>;
type TriathlonTypeStatus = ResourceStatus<TriathlonTypes[] | null>;
type TriathlonCategoryStatus = ResourceStatus<TriathlonCategories[] | null>;
type CountryStatus = ResourceStatus<any | null>;
type StateStatus = ResourceStatus<any | null>;
type CityStatus = ResourceStatus<any | null>;

interface DataContext {
    athletes: AthleteStatus;
    organizations: OrganizationStatus;
    triathlonTypes: TriathlonTypeStatus;
    triathlonCategories: TriathlonCategoryStatus;
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
    athletes: defaultResourceStatus,
    organizations: defaultResourceStatus,
    triathlonTypes: defaultResourceStatus,
    triathlonCategories: defaultResourceStatus,
    countries: defaultResourceStatus,
    states: defaultResourceStatus,
    cities: defaultResourceStatus
});

const useDataContext = () => useContext(DataContext);

function DataProvider({ children }: LayoutProps) {

    const [triathlonTypesLS, setTriathlonTypesLS] = useLocalStorage<TriathlonTypeStatus['data']>(TRIATHLON_TYPES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [triathlonCategoriesLS, setTriathlonCategoriesLS] = useLocalStorage<TriathlonCategoryStatus['data']>(TRIATHLON_CATEGORIES_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);
    const [organizationsLS, setOrganizationsLS] = useLocalStorage<OrganizationStatus['data']>(ORGANIZATIONS_LOCAL_STORAGE_KEY, null, STATIC_DATA_TTL);

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

    const athletes = defaultResourceStatus;
    const countries = defaultResourceStatus;
    const states = defaultResourceStatus;
    const cities = defaultResourceStatus;

    useEffect(() => {

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

    }, []);

    return (
        <DataContext.Provider value={{
            athletes,
            organizations,
            triathlonTypes,
            triathlonCategories,
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