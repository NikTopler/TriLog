import { TableName, prismaClient } from "@/db";
import { Identifier, PaginationOptions } from "@/schemas";
import { GenericRecord } from "@/types";
import { Prisma, PrismaPromise } from "@prisma/client";

class BaseService {

    public _tableClient;

    constructor(tableName: Uncapitalize<TableName>) {
        this._tableClient = prismaClient[tableName] as any;
    }

    static getColumnNames(tableName: TableName) {
        return Prisma.dmmf.datamodel.models.find(m => m.name === tableName)?.fields.map(f => f.name);
    }

    getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {

            return handleResult(
                this._tableClient.count({
                    where
                })
            );

        }

        return handleResult(
            this._tableClient.findMany({
                where,
                orderBy: {
                    [orderBy]: order
                },
                skip: (page - 1) * perPage,
                take: perPage
            })
        );

    }

    getById<T>(ID: Identifier) {

        return handleResult(
            this._tableClient.findUnique({
                where: { ID }
            })
        ) as Promise<T>;

    }

    create<T>(values: T) {

        return handleResult(
            this._tableClient.create({
                data: values
            })
        );
    }

    update(ID: Identifier, values: GenericRecord) {

        return handleResult(
            this._tableClient.update({
                where: { ID },
                data: values
            })
        );
    }

    delete(ID: Identifier) {

        return handleResult(
            this._tableClient.delete({
                where: { ID }
            })
        );

    }

}

export function handleResult<T>(promise: PrismaPromise<T>) {
    return promise.catch((error: any) => {
        throw new Error(error.message);
    });
}


export default BaseService;