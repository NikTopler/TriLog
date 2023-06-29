import { StringArray, StringArraySchema } from "@/schemas";

function isStringArray(value: unknown): value is StringArray {
    return StringArraySchema.safeParse(value).success;
}

export default isStringArray;