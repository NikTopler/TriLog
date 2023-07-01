import { z } from "zod";
import { NullableIntSchema, NullableNonEmptyStringSchema } from "../FilterOptionSchema";

const StateFilterOptionSchema = z.object({
    ID: NullableIntSchema.optional(),
    name: NullableNonEmptyStringSchema.optional(),
    acronym: NullableNonEmptyStringSchema.optional(),
    countryID: NullableIntSchema.optional()
});

function createStateSchema(required: boolean) {

    return z.object({
        ID: NullableIntSchema.optional(),
        name: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        acronym: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        countryID: NullableIntSchema.optional()
    });

}

const StateSchema = createStateSchema(true);
const StateSchemaOptional = createStateSchema(false);

export {
    StateFilterOptionSchema,
    StateSchema,
    StateSchemaOptional
}