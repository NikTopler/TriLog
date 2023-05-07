import { PositiveIntSchema } from "@/schemas";

function parsePositiveInt(value: unknown, errorMessage?: string) {

    return PositiveIntSchema.parseAsync(value)
        .catch(() => {
            throw new Error(errorMessage || "Invalid value");
        });
}

export default parsePositiveInt;