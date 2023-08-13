import { CountryColumns, GenericRecord } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { Countries } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('countries');
class CountryService extends BaseService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<CountryColumns>, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(country: Countries) {
        return base.create<Countries>(country);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default CountryService;