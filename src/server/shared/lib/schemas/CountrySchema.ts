import { z } from "zod";

const CountrySchema = z.object({
    name: z.string().nonempty("Name cannot be empty"),
    fullName: z.string().nonempty("Full name cannot be empty"),
    alpha2: z.string().nonempty("Alpha 2 cannot be empty"),
    alpha3: z.string().nonempty("Alpha 3 cannot be empty"),
    continentCode: z.string().nonempty("Continent code cannot be empty"),
    number: z.string().nonempty("Number cannot be empty")
});

const CountryOptionalSchema = z.object({
    name: z.string().nonempty("Name cannot be empty").optional(),
    fullName: z.string().nonempty("Full name cannot be empty").optional(),
    alpha2: z.string().nonempty("Alpha 2 cannot be empty").optional(),
    alpha3: z.string().nonempty("Alpha 3 cannot be empty").optional(),
    continentCode: z.string().nonempty("Continent code cannot be empty").optional(),
    number: z.string().nonempty("Number cannot be empty").optional()
});

export {
    CountrySchema,
    CountryOptionalSchema
};