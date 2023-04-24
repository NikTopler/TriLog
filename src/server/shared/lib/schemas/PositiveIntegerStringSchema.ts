import { z } from "zod";

const PositiveIntegerStringSchema = z.union([
    z.string().regex(/^\d+$/).transform(Number),
    z.number()
]);

export default PositiveIntegerStringSchema;