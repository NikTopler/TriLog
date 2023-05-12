import { z } from "zod";
import { NullableStringSchema } from "../shared/FilterOptionSchema";
import { PositiveIntSchema } from "../shared/PositiveIntSchema";

const genders = ['male', 'female'] as const;

const TriathlonCategoryFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    name: z.string().optional(),
    acronym: NullableStringSchema.optional(),
    gender: z.enum(genders).optional(),
});


function createTriathlonCategorySchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        name: required ? z.string().nonempty() : z.string().nonempty().optional(),
        acronym: required ? NullableStringSchema : NullableStringSchema.optional(),
        gender: required ? z.enum(genders) : z.enum(genders).optional()
    });

}

const TriathlonCategorySchema = createTriathlonCategorySchema(true);
const TriathlonCategorySchemaOptional = createTriathlonCategorySchema(false);

export {
    TriathlonCategoryFilterOptionSchema,
    TriathlonCategorySchema,
    TriathlonCategorySchemaOptional
}