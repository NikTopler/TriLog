import { GenericRecord } from "@/interfaces";
import { PaginationOptions } from "@/schemas";
import { Organizations } from "@prisma/client";
import BaseService from "./BaseService";

class OrganizationService extends BaseService {

    static getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {
            return this.handle(
                this.client.organizations.count({
                    where
                })
            );
        }

        return this.handle(
            this.client.organizations.findMany({
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
            this.client.organizations.findUnique({
                where: { ID }
            })
        );

    }

    static create({ name, acronym }: Organizations) {

        return this.handle(
            this.client.organizations.create({
                data: {
                    name,
                    acronym
                }
            })
        );

    }

    static update(ID: number, values: GenericRecord) {

        return this.handle(
            this.client.organizations.update({
                where: { ID },
                data: values
            })
        );

    }

    static delete(ID: number) {

        return this.handle(
            this.client.organizations.delete({
                where: { ID }
            })
        );

    }

}

export default OrganizationService;