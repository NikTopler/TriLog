import { SupportedLanguage, SupportedLanguageSchema } from "@/schemas";

function isSupportedLanguage(value: unknown): value is SupportedLanguage {
    return SupportedLanguageSchema.safeParse(value).success;
}

export default isSupportedLanguage;