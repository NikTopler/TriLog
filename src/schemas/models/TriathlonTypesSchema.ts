import { z } from "zod";
import { PositiveIntSchema } from "../shared/PositiveIntSchema";

const TriathlonTypesFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    name: z.string().optional(),
    swimKm: z.number().optional(),
    bikeKm: z.number().optional(),
    runKm: z.number().optional(),
    organizationID: PositiveIntSchema.optional(),
});

function createTriathlonTypesSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        name: required ? z.string().nonempty() : z.string().nonempty().optional(),
        swimKm: required ? z.number() : z.number().optional(),
        bikeKm: required ? z.number() : z.number().optional(),
        runKm: required ? z.number() : z.number().optional(),
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