import { Athletes, Triathlons, TriathlonTypes, TriathlonCategories, Participations } from "@prisma/client";

type AthleteColumns = keyof Athletes;
type TriathlonColumns = keyof Triathlons;
type TriathlonTypeColumns = keyof TriathlonTypes;
type TriathlonCategoryColumns = keyof TriathlonCategories;
type ParticipationColumns = keyof Participations;
type CityColumns = keyof Cities;
type CountryColumns = keyof Countries;
type StateColumns = keyof States;
type OrganizationColumns = keyof Organizations;

export type {
    AthleteColumns,
    TriathlonColumns,
    TriathlonTypeColumns,
    TriathlonCategoryColumns,
    ParticipationColumns,
    CityColumns,
    CountryColumns,
    StateColumns,
    OrganizationColumns
}
