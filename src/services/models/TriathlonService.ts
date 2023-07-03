import { GenericRecord } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import BaseService from "../BaseService";
import { Triathlons } from "@prisma/client";

const base = new BaseService('triathlons');
class TriathlonService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(triathlons: Triathlons) {
        return base.create<Triathlons>(triathlons);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default TriathlonService;