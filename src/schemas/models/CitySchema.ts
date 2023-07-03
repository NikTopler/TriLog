import { z } from "zod";
import { NullableIntSchema, NullableNonEmptyStringSchema } from "../FilterOptionSchema";

const CityFilterOptionSchema = z.object({
    ID: NullableIntSchema.optional(),
    name: NullableNonEmptyStringSchema.optional(),
    stateID: NullableIntSchema.optional(),
    countryID: NullableIntSchema.optional()
});

function createCitySchema(required: boolean) {

    return z.object({
        ID: NullableIntSchema.optional(),
        name: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        stateID: NullableIntSchema.optional(),
        countryID: NullableIntSchema.optional()
    });

}

const CitySchema = createCitySchema(true);
const CitySchemaOptional = createCitySchema(false);

export {
    CityFilterOptionSchema,
    CitySchema,
    CitySchemaOptional
}