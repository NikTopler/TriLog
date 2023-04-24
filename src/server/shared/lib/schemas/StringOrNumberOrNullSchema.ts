import { z } from "zod";

const StringOrNumberOrNullSchema = z.union([z.string(), z.number(), z.null()]);

export default StringOrNumberOrNullSchema;