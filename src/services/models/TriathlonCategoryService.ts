import { GenericRecord, TriathlonCategoryColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { TriathlonCategories } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('triathlonCategories');
class TriathlonCategoryService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<TriathlonCategoryColumns>, count: boolean = false) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(triathlonCategory: TriathlonCategories) {
        return base.create<TriathlonCategories>(triathlonCategory);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default TriathlonCategoryService;