import z from "zod";
import { PositiveIntSchema } from "@/schemas/PositiveIntSchema";
import { NullableIntSchema, NullableStringSchema } from "./FilterOptionSchema";

const AthleteFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    firstName: NullableStringSchema.optional(),
    lastName: NullableStringSchema.optional(),
    age: NullableIntSchema.optional(),
    countryID: NullableIntSchema.optional(),
    stateID: NullableIntSchema.optional(),
    cityID: NullableIntSchema.optional()
});


function createAthleteSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        firstName: required ? z.string().nullable() : NullableStringSchema.optional(),
        lastName: required ? z.string().nullable() : NullableStringSchema.optional(),
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