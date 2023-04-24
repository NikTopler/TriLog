import ConfigOptions from "../interfaces/ConfigOptions";
import ObjectTypeDefinition from "../interfaces/ObjectTypeDefinition";
import sanitizeValue from "./sanitizeValue";

function sanitizeObject(obj: ConfigOptions, configArr: ObjectTypeDefinition[]) {

    const sanitizedObj: ConfigOptions = {};

    for (const { name, type } of configArr) {

        if (obj[name]) {
            sanitizedObj[name] = sanitizeValue(obj[name], type, name);
        }

    }

    return sanitizedObj;
}

export default sanitizeObject;