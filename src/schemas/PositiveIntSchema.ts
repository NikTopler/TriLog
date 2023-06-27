import z from "zod";

const PositiveIntSchema = z.coerce.number().int().positive();

export {
    PositiveIntSchema
}