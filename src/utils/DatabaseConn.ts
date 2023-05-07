import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";

class DatabaseConn {

    protected static client = new PrismaClient({
        errorFormat: 'pretty'
    });

    static getColumnNames(tableName: string) {
        return Prisma.dmmf.datamodel.models.find(m => m.name === tableName)?.fields.map(f => f.name);
    }

    static async handle<T>(promise: PrismaPromise<T>) {

        try {
            return await promise;
        } catch (error: any) {
            // TODO: Write into a log file
            console.log(error);
            throw new Error(error.message);
        }

    }

}

export default DatabaseConn;