import { z } from "zod";
import { PositiveIntSchema } from "../PositiveIntSchema";

const TriathlonSchema = z.object({
    ID: PositiveIntSchema.optional(),
    year: PositiveIntSchema,
    countryID: PositiveIntSchema.optional(),
    stateID: PositiveIntSchema.optional(),
    cityID: PositiveIntSchema.optional(),
    isWorldChampionship: z.boolean().optional(),
    triathlonTypeID: PositiveIntSchema
});

function createTriathlonSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        year: required ? PositiveIntSchema : PositiveIntSchema.optional(),
        countryID: required ? PositiveIntSchema : PositiveIntSchema.optional(),
        stateID: required ? PositiveIntSchema : PositiveIntSchema.optional(),
        cityID: required ? PositiveIntSchema : PositiveIntSchema.optional(),
        isWorldChampionship: z.boolean().optional(),
        triathlonTypeID: required ? PositiveIntSchema : PositiveIntSchema.optional(),
    });

}

const TriathlonSchemaRequired = createTriathlonSchema(true);
const TriathlonSchemaOptional = createTriathlonSchema(false);

export {
    TriathlonSchema,
    TriathlonSchemaRequired,
    TriathlonSchemaOptional
}