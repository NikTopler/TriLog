import sanitizeRequestNumber from "@/server/modules/helpers/sanitizeRequestNumber";
import StringNumberBooleanOrNullMap from "@/shared/interfaces/StringNumberBooleanOrNullMap";

function validateRequestBody(
    keys: string[],
    requiredKeys: string[],
    numberKeys: string[],
    reqBody: StringNumberBooleanOrNullMap
): [obj: StringNumberBooleanOrNullMap, errors: string[]] {

    const obj: StringNumberBooleanOrNullMap = {};
    const errors: string[] = [];

    for (const key of keys) {

        if (reqBody[key] === undefined) {

            if (requiredKeys.includes(key)) {
                errors.push(`Missing ${key}`);
            }

            continue;
        }

        if (numberKeys.includes(key)) {

            let sanitized = sanitizeRequestNumber(reqBody[key]);
            if (sanitized !== undefined) {
                obj[key] = sanitized;
                continue;
            }

            errors.push(`Invalid ${key}`);
            continue;
        }

        obj[key] = reqBody[key];
    }

    return [obj, errors];

}

export default validateRequestBody;