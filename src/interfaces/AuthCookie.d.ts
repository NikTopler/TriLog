import { Email } from "@/schemas";
import { UserCookieSchema } from "@/schemas";
import z from "zod"

type AuthCookie = z.infer<typeof UserCookieSchema>;

export default AuthCookie;