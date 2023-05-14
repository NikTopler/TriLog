import { GenericRecord } from "@/interfaces";
import { PaginationOptions } from "@/schemas";
import { DatabaseConn } from "@/utils";

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

}

export default TriathlonTypeService;