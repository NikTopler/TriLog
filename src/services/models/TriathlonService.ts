import { GenericRecord, TriathlonColumns } from "@/types";
import { Identifier, PaginationOptions } from "@/schemas";
import BaseService, { handleResult } from "../BaseService";
import { Triathlons } from "@prisma/client";
import { prismaClient } from "@/db";

const base = new BaseService('triathlons');
class TriathlonService {

    static getAll(where: GenericRecord, paginationOptions: PaginationOptions<TriathlonColumns>, count?: boolean) {
        return base.getAll(where, paginationOptions, count);
    }

    static getAllByCategory(categoryId: Identifier) {
        return handleResult<Triathlons[]>(
            prismaClient.triathlons.findMany({
                distinct: ['ID'],
                where: {
                    Participations: {
                        some: {
                            triathlonCategoryID: categoryId
                        }
                    }
                }
            })
        );
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