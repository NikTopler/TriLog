import { z } from "zod";

const AuthCookieSchema = z.object({
    authenticated: z.boolean(),
    accessToken: z.string().nullable(),
    refreshToken: z.string().nullable(),
});

export const isAuthCookie = (obj: unknown): obj is z.infer<typeof AuthCookieSchema> => {
    return AuthCookieSchema.safeParse(obj).success;
}

export default AuthCookieSchema;