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

    static getAllByTriathlonName(
        triathlonName: string,
        { page, perPage, order, orderBy }: PaginationOptions<ParticipationColumns>,
        count?: boolean
    ) {

        if (count) {
            return prismaClient.athletes.count({
                where: {
                    Participations: {
                        some: {
                            Triathlons: {
                                name: triathlonName
                            }
                        }
                    }
                }
            });
        }

        return prismaClient.participations.findMany({
            where: {
                Triathlons: {
                    name: triathlonName,
                },
            },
            include: {
                Athletes: {
                    include: {
                        Countries: true
                    }
                },
                TriathlonCategories: true
            },
            orderBy: {
                [orderBy]: {
                    nulls: 'last',
                    sort: order
                },
            },
            skip: (page - 1) * perPage,
            take: perPage
        });
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