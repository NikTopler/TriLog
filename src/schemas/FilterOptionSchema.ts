import z from "zod";
import { PositiveIntSchema } from "@/schemas/PositiveIntSchema";

const checkIfStringIsNull = (value: unknown) => (value === 'null') ? null : value;

const NullableNonEmptyStringSchema = z.preprocess(checkIfStringIsNull, z.string().nonempty().nullable());
const NullableStringSchema = z.preprocess(checkIfStringIsNull, z.string().nullable());
const NullableIntSchema = z.preprocess(checkIfStringIsNull, PositiveIntSchema.nullable());
const NumericStringSchema = z.string().regex(/^\d+(\.\d+)?$/).transform(parseFloat);

export {
    NullableStringSchema,
    NullableNonEmptyStringSchema,
    NullableIntSchema,
    NumericStringSchema
}