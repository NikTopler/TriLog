import { AthleteColumns, GenericRecord, ParticipationColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import { Athletes } from "@prisma/client";
import BaseService from "../BaseService";
import { prismaClient } from "@/db";

const base = new BaseService('athletes');
class AthleteService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<AthleteColumns>, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getById(ID: Identifier) {
        return base.getById(ID);
    }

    static create(athlete: Athletes) {
        return base.create<Athletes>(athlete);
    }

    static update(ID: Identifier, values: GenericRecord) {
        return base.update(ID, values);
    }

    static delete(ID: Identifier) {
        return base.delete(ID);
    }

}

export default AthleteService;