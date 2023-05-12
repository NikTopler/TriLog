import { GenericRecord } from "@/interfaces";
import { PaginationOptions } from "@/schemas";
import { DatabaseConn } from "@/utils";
import { TriathlonCategories } from "@prisma/client";

class TriathlonCategoryService extends DatabaseConn {

    static getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {
            return this.handle(
                this.client.triathlonCategories.count({
                    where
                })
            );
        }

        return this.handle(
            this.client.triathlonCategories.findMany({
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
            this.client.triathlonCategories.findUnique({
                where: { ID }
            })
        );

    }

    static create({ name, acronym, gender }: TriathlonCategories) {

        return this.handle(
            this.client.triathlonCategories.create({
                data: {
                    name,
                    acronym,
                    gender
                }
            })
        );

    }

    static update(ID: number, values: GenericRecord) {

        return this.handle(
            this.client.triathlonCategories.update({
                where: { ID },
                data: values
            })
        );

    }

    static delete(ID: number) {

        return this.handle(
            this.client.triathlonCategories.delete({
                where: { ID }
            })
        );

    }

}

export default TriathlonCategoryService;