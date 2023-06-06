import { Email } from "@/schemas";
import { UserCookieSchema } from "@/schemas";
import z from "zod"

type UserCookie = z.infer<typeof UserCookieSchema>;

export default UserCookie;