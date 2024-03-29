import { z } from "zod";
import { NullableNonEmptyStringSchema } from "../FilterOptionSchema";
import { PositiveIntSchema } from "../PositiveIntSchema";

const genders = ['male', 'female'] as const;

const TriathlonCategoryFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    name: z.string().optional(),
    acronym: z.string().optional(),
    gender: z.enum(genders).optional(),
});

function createTriathlonCategorySchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        name: required ? z.string().nonempty() : z.string().nonempty().optional(),
        acronym: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        gender: required ? z.enum(genders) : z.enum(genders).optional()
    });

}

const TriathlonCategorySchema = createTriathlonCategorySchema(true);
const TriathlonCategorySchemaOptional = createTriathlonCategorySchema(false);

const SpecificTriathlonCategorySchema = z.object({
    includeTriathlons: z.string().refine((value) => value.toLowerCase() === 'true' || value.toLowerCase() === 'false').optional()
})

export {
    TriathlonCategoryFilterOptionSchema,
    TriathlonCategorySchema,
    TriathlonCategorySchemaOptional,
    SpecificTriathlonCategorySchema
}