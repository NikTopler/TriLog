import ConfigOptions from "../interfaces/ConfigOptions";
import StringNumberBooleanOrNullMap from "../interfaces/StringNumberBooleanOrNullMap";
import isBoolean from "./isBoolean";
import isNumber from "./isNumber";

interface ValidateObjectsConfig {
    [key: string]: {
        allowedTypes: ('string' | 'number' | 'boolean' | 'null')[]
        required?: boolean;
    }
}

const validators = {
    string: (val: string) => ({ isValid: typeof val === 'string', value: val }),
    number: (val: string) => ({ isValid: isNumber(val), value: Number(val) }),
    boolean: (val: string) => ({ isValid: isBoolean(val), value: val.toLowerCase() === 'true' }),
    null: (val: string) => ({ isValid: (val.toLowerCase() === 'null' || val.trim().length === 0), value: null })
}

function validateObjects<T>(
    data: ConfigOptions, 
    config: ValidateObjectsConfig,
    returnAllParams: boolean = false
) {

    const tempObj: StringNumberBooleanOrNullMap = {};

    for (const [key, { allowedTypes, required }] of Object.entries(config)) {

        if (required && data[key] === undefined) {
            throw new Error("Missing required property");
        }

        if (data[key] === undefined) {

            if (returnAllParams) {
                tempObj[key] = null;
            }

            continue;
        }

        if (data[key].length === 0) {

            if (allowedTypes.includes('null')) {
                tempObj[key] = null;
                continue;
            }

            throw new Error(`Expected ${allowedTypes.toString()} but got ${null}, for parameter ${key}`);

        }

        const areValid = allowedTypes.some(type => {

            const { isValid, value } = validators[type](data[key]);

            if (isValid) {
                tempObj[key] = value;
            }

            return isValid;

        });

        if (!areValid) {
            throw new Error(`Expected ${allowedTypes.toString()} but got ${typeof data[key]}, for parameter ${key}`);
        }

    }

    return tempObj as T;

}

export default validateObjects;