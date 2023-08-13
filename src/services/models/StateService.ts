import { GenericRecord, StateColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { States } from "@prisma/client";
import BaseService from "../BaseService";

const base = new BaseService('states');
class StateService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<StateColumns>, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(state: States) {
        return base.create<States>(state);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default StateService;