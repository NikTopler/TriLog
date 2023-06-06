import { z } from "zod";

const UrlSchema = z.string().url({
    message: "Invalid URL address"
});

export type Url = z.infer<typeof UrlSchema> & { url: "Url" };

export default UrlSchema;