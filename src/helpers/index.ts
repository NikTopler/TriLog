import createQueryString from "./createQueryString";
import isEmail from "./isEmail";
import isStringArray from "./isStringArray";
import validatePaths from "./validatePaths";
import changeFirstLetter from "./changeFirstLetter";
import { apiDelete, apiGet, apiPost, apiPut } from "./apiRequest";
import generateCode from "./generateCode";
import generateToken from "./generateToken";
import isUrl from "./isUrl";
import getCurrentTimestamp from "./getCurrentTimestamp";
import isIdentifier from "./isIdentifier";
import isSupportedLanguage from "./isSupportedLanguage";
import getLocationFromTriathlon from "./getLocationFromTriathlon";
import parseTriathlonsToTableData from "./parseTriathlonsToTableData";

export {
    isEmail,
    isStringArray,
    isUrl,
    isSupportedLanguage,
    isIdentifier,
    createQueryString,
    validatePaths,
    changeFirstLetter,
    apiGet,
    apiPost,
    apiPut,
    apiDelete,
    generateCode,
    generateToken,
    getCurrentTimestamp,
    getLocationFromTriathlon,
    parseTriathlonsToTableData
}