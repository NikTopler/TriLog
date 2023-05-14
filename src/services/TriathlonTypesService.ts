import { GenericRecord } from "@/interfaces";
import { PaginationOptions } from "@/schemas";
import { DatabaseConn } from "@/utils";
import { TriathlonTypes } from "@prisma/client";

class TriathlonTypeService extends DatabaseConn {

    static getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {
            return this.handle(
                this.client.triathlonTypes.count({
                    where
                })
            );
        }

        return this.handle(
            this.client.triathlonTypes.findMany({
                where,
                orderBy: {
                    [orderBy]: order
                },
                skip: (page - 1) * perPage,
                take: perPage
            })
        );

    }

    static getById(ID: number) {

        return this.handle(
            this.client.triathlonTypes.findUnique({
                where: { ID }
            })
        );

    }

    static create({ name, swimKm, bikeKm, runKm, organizationID }: TriathlonTypes) {

        return this.handle(
            this.client.triathlonTypes.create({
                data: {
                    name,
                    swimKm,
                    bikeKm,
                    runKm,
                    organizationID
                }
            })
        );

    }

    static update(ID: number, values: GenericRecord) {

        return this.handle(
            this.client.triathlonTypes.update({
                where: { ID },
                data: values
            })
        );

    }

    static delete(ID: number) {

        return this.handle(
            this.client.triathlonTypes.delete({
                where: { ID }
            })
        );

    }

}

export default TriathlonTypeService;