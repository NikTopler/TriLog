import { z } from "zod";
import { NullableNonEmptyStringSchema } from "../FilterOptionSchema";

const CountryFilterOptionSchema = z.object({
    ID: z.number().positive().optional(),
    name: NullableNonEmptyStringSchema.optional(),
    fullName: NullableNonEmptyStringSchema.optional(),
    alpha2: NullableNonEmptyStringSchema.optional(),
    alpha3: NullableNonEmptyStringSchema.optional(),
    continentCode: NullableNonEmptyStringSchema.optional(),
    number: NullableNonEmptyStringSchema.optional()
});

function createCountrySchema(required: boolean) {

    return z.object({
        ID: z.number().positive().optional(),
        name: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        fullName: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        alpha2: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        alpha3: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        continentCode: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        number: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional()
    });

}

const CountrySchema = createCountrySchema(true);
const CountrySchemaOptional = createCountrySchema(false);

export {
    CountryFilterOptionSchema,
    CountrySchema,
    CountrySchemaOptional
}