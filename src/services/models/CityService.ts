import { CityColumns, GenericRecord } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { Cities } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('cities');
class CityService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<CityColumns>, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(city: Cities) {
        return base.create<Cities>(city);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default CityService;