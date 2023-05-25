import { Email, EmailSchema } from "@/schemas";

function isEmail(value: unknown): value is Email {
    return EmailSchema.safeParse(value).success;
}

export default isEmail;