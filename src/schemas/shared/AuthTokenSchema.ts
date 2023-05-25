import { VERIFICATION_TOKEN_LENGTH } from "@/constants";
import { z } from "zod";

const AuthTokenSchema = z.string().length(VERIFICATION_TOKEN_LENGTH);

export default AuthTokenSchema;