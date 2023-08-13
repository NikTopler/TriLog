import { Athletes, Triathlons, TriathlonTypes, TriathlonCategories, Participations } from "@prisma/client";

type AthleteColumns = keyof Athletes;
type TriathlonColumns = keyof Triathlons;
type TriathlonTypeColumns = keyof TriathlonTypes;
type TriathlonCategoryColumns = keyof TriathlonCategories;
type ParticipationColumns = keyof Participations;

export type {
    AthleteColumns,
    TriathlonColumns,
    TriathlonTypeColumns,
    TriathlonCategoryColumns,
    ParticipationColumns
}
