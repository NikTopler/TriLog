import { z } from "zod";

const EmailSchema = z.string().email({
    message: "Invalid email address"
});

export type Email = z.infer<typeof EmailSchema> & { kind: "Email" };

export default EmailSchema;