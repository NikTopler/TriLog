import { Url, UrlSchema } from "@/schemas"

function isUrl(value: unknown): value is Url {
    return UrlSchema.safeParse(value).success;
}

export default isUrl;