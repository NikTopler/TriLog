import z from "zod";
import { PositiveIntSchema } from "@/schemas/PositiveIntSchema";

const checkIfStringIsNull = (value: unknown) => (value === 'null') ? null : value;

const NullableStringSchema = z.preprocess(checkIfStringIsNull, z.string().nullable());
const NullableIntSchema = z.preprocess(checkIfStringIsNull, PositiveIntSchema.nullable());

export {
    NullableStringSchema,
    NullableIntSchema
}