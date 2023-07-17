import { z } from "zod";

const SupportedLanguageSchema = z.enum(['en','si']);

export type SupportedLanguage = z.infer<typeof SupportedLanguageSchema>;

export default SupportedLanguageSchema;