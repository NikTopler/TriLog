import { z } from "zod";
import { PositiveIntSchema } from "../shared/PositiveIntSchema";
import { NumericStringSchema } from "../shared/FilterOptionSchema";

const TriathlonTypesFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    name: z.string().optional(),
    swimKm: NumericStringSchema.optional(),
    bikeKm: NumericStringSchema.optional(),
    runKm: NumericStringSchema.optional(),
    organizationID: PositiveIntSchema.optional(),
});

function createTriathlonTypesSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        name: required ? z.string().nonempty() : z.string().nonempty().optional(),
        swimKm: required ? NumericStringSchema : NumericStringSchema.optional(),
        bikeKm: required ? NumericStringSchema : NumericStringSchema.optional(),
        runKm: required ? NumericStringSchema : NumericStringSchema.optional(),
        organizationID: required ? PositiveIntSchema : PositiveIntSchema.optional(),
    });

}

const TriathlonTypeSchema = createTriathlonTypesSchema(true);
const TriathlonTypeSchemaOptional = createTriathlonTypesSchema(false);

export {
    TriathlonTypesFilterOptionSchema,
    TriathlonTypeSchema,
    TriathlonTypeSchemaOptional
}