import { z } from "zod";

const ThemeSchema = z.enum(['light', 'dark']);

const UserCookieSchema = z.object({
    authenticated: z.boolean(),
    token: z.object({}).nullable(),
    preferences: z.object({
        theme: ThemeSchema
    })
});

export const isUserCookie = (obj: unknown): obj is z.infer<typeof UserCookieSchema> => {
    return UserCookieSchema.safeParse(obj).success;
}

export default UserCookieSchema;