import * as z from "zod";
import { numericString } from "@/server/shared/lib/schemas/helpers";
import StringOrNumberOrNullSchema from "./StringOrNumberOrNullSchema";

const AthleteSchema = z.object({
    firstName: z.string().nonempty("First name cannot be empty"),
    lastName: z.string().nonempty("Last name cannot be empty"),
    age: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Age must be bigger than 0" }),
    countryID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Country ID must be bigger than 0" }),
    stateID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "State ID must be bigger than 0" }),
    cityID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "City ID must be bigger than 0" })
});

const AthleteOptionalSchema = z.object({
    firstName: z.string().nonempty("First name cannot be empty").optional(),
    lastName: z.string().nonempty("Last name cannot be empty").optional(),
    age: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Age must be bigger than 0" }).optional(),
    countryID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Country ID must be bigger than 0" }).optional(),
    stateID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "State ID must be bigger than 0" }).optional(),
    cityID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "City ID must be bigger than 0" }).optional(),
});

export {
    AthleteSchema,
    AthleteOptionalSchema
};