import { ZodTypeAny, z } from "zod";

const numericString = (schema: ZodTypeAny) => z.preprocess((a) => {

    if (typeof a === 'string') {
        return parseInt(a, 10)
    }

    if (typeof a === 'number') {
        return a;
    }

    if (a === null) {
        return null;
    }

    return undefined;

}, schema);

export default numericString;