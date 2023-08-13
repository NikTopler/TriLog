import { GenericRecord, TriathlonTypeColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { TriathlonTypes } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('triathlonTypes');
class TriathlonTypeService extends BaseService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<TriathlonTypeColumns>, count: boolean = false) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(triathlonType: TriathlonTypes) {
        return base.create<TriathlonTypes>(triathlonType);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default TriathlonTypeService;