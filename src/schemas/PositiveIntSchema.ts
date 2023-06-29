import z from "zod";

const PositiveIntSchema = z.coerce.number().int().positive();

export type Identifier = z.infer<typeof PositiveIntSchema> & { kind: "ID" };

export {
    PositiveIntSchema
}