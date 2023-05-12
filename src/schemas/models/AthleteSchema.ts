import z from "zod";
import { PositiveIntSchema } from "@/schemas/shared/PositiveIntSchema";
import { NullableIntSchema, NullableNonEmptyStringSchema } from "../shared/FilterOptionSchema";

const AthleteFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    firstName: NullableNonEmptyStringSchema.optional(),
    lastName: NullableNonEmptyStringSchema.optional(),
    age: NullableIntSchema.optional(),
    countryID: NullableIntSchema.optional(),
    stateID: NullableIntSchema.optional(),
    cityID: NullableIntSchema.optional()
});


function createAthleteSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        firstName: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        lastName: required ? NullableNonEmptyStringSchema : NullableNonEmptyStringSchema.optional(),
        age: required ? PositiveIntSchema.nullable() : NullableIntSchema.optional(),
        countryID: required ? PositiveIntSchema.nullable() : NullableIntSchema.optional(),
        stateID: required ? PositiveIntSchema.nullable() : NullableIntSchema.optional(),
        cityID: required ? PositiveIntSchema.nullable() : NullableIntSchema.optional()
    });

}

const AthleteSchema = createAthleteSchema(true);
const AthleteSchemaOptional = createAthleteSchema(false);

export {
    AthleteFilterOptionSchema,
    AthleteSchema,
    AthleteSchemaOptional
}