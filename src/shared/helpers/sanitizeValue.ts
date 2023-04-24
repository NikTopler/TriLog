import AllowedObjectParameterType from "../types/AllowedObjectParameterType";

function sanitizeValue(value: any, type: AllowedObjectParameterType, valueName?: string) {

    if (typeof value === type) {
        return value;
    }

    if (type === 'number' && !isNaN(Number(value))) {
        return value;
    }

    if (type === 'boolean') {

        if (typeof value === 'string') {

            value = value.toLowerCase();

            if (value === 'true') {
                return true;
            }

            if (value === 'false') {
                return false;
            }

        }

        if (typeof value === 'number' && !isNaN(Number(value))) {
            return Number(value) === 1;
        }

    }

    throw new Error(`Expected ${type} but got ${typeof value}, for parameter ${valueName}`);

}

export default sanitizeValue;