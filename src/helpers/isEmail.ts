import { Email, EmailSchema } from "@/schemas";

function isEmail(value: string): value is Email {
    return EmailSchema.safeParse(value).success;
}

export default isEmail;