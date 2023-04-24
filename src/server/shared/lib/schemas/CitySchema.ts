import { z } from "zod";
import numericString from "./helpers/numericString";
import StringOrNumberOrNullSchema from "./StringOrNumberOrNullSchema";

const CitySchema = z.object({
    name: z.string().nonempty("City name cannot be empty"),
    stateID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "State ID must be bigger than 0" }),
    countryID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Country ID must be bigger than 0" })
});

const CityOptionalSchema = z.object({
    name: z.string().nonempty("City name cannot be empty").optional(),
    stateID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "State ID must be bigger than 0" }).optional(),
    countryID: numericString(StringOrNumberOrNullSchema).refine((val) => { return val > 0 }, { message: "Country ID must be bigger than 0" }).optional()
});

export {
    CitySchema,
    CityOptionalSchema
};