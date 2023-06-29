import { z } from "zod";

export const StringArraySchema = z.array(z.string());

type StringArray = z.infer<typeof StringArraySchema>;

export type {
    StringArray
}