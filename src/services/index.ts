import AthleteService from "./models/AthleteService";
import AuthService from "./AuthService";
import BaseService, { handleResult } from "./BaseService";
import OrganizationService from "./models/OrganizationService";
import TriathlonCategoryService from "./models/TriathlonCategoryService";
import TriathlonTypeService from "./models/TriathlonTypesService";
import CountryService from "./models/CountryService";
import UserService from "./UserService";
import StateService from "./models/StateService";
import CityService from "./models/CityService";
import TriathlonService from "./models/TriathlonService";

export {
    AuthService,
    UserService,
    BaseService,
    AthleteService,
    TriathlonCategoryService,
    TriathlonTypeService,
    OrganizationService,
    CountryService,
    StateService,
    CityService,
    TriathlonService,
    handleResult
}