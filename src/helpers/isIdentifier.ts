import { Identifier, PositiveIntSchema } from "@/schemas";

function isIdentifier(value: unknown): value is Identifier {
    return PositiveIntSchema.safeParse(value).success;
}

export default isIdentifier;