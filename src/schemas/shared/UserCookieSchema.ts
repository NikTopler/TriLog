import { z } from "zod";

const UserCookieSchema = z.object({
    authenticated: z.boolean(),
    accessToken: z.string().nullable(),
    refreshToken: z.string().nullable(),
});

export const isUserCookie = (obj: unknown): obj is z.infer<typeof UserCookieSchema> => {
    return UserCookieSchema.safeParse(obj).success;
}

export default UserCookieSchema;