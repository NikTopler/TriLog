import { z } from "zod";
import { PositiveIntSchema } from "../shared/PositiveIntSchema";

const OrganizationFilterOptionSchema = z.object({
    ID: PositiveIntSchema.optional(),
    name: z.string().optional(),
    acronym: z.string().optional()
});

function createOrganizationSchema(required: boolean) {

    return z.object({
        ID: PositiveIntSchema.optional(),
        name: required ? z.string().nonempty() : z.string().nonempty().optional(),
        acronym: required ? z.string().nonempty() : z.string().nonempty().optional()
    });

}

const OrganizationSchema = createOrganizationSchema(true);
const OrganizationSchemaOptional = createOrganizationSchema(false);

export {
    OrganizationFilterOptionSchema,
    OrganizationSchema,
    OrganizationSchemaOptional
}