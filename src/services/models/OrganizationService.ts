import { GenericRecord, OrganizationColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { Organizations } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('organizations');
class OrganizationService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<OrganizationColumns>, count: boolean = false) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(organizations: Organizations) {
        return base.create<Organizations>(organizations);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default OrganizationService;