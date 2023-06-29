import { AuthCookieSchema, Email } from "@/schemas";
import z from "zod"

type AuthCookie = z.infer<typeof AuthCookieSchema>;

export default AuthCookie;