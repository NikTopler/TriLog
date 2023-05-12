import z from "zod";
import { PositiveIntSchema } from "@/schemas/shared/PositiveIntSchema";

const checkIfStringIsNull = (value: unknown) => (value === 'null') ? null : value;

const NullableNonEmptyStringSchema = z.preprocess(checkIfStringIsNull, z.string().nonempty().nullable());
const NullableStringSchema = z.preprocess(checkIfStringIsNull, z.string().nullable());
const NullableIntSchema = z.preprocess(checkIfStringIsNull, PositiveIntSchema.nullable());

export {
    NullableStringSchema,
    NullableNonEmptyStringSchema,
    NullableIntSchema
}