import { Prisma, PrismaClient, PrismaPromise } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";

class DatabaseConn {

    protected static client = new PrismaClient();

    static getColumnNames(tableName: string) {
        return Prisma.dmmf.datamodel.models.find(m => m.name === tableName)?.fields.map(f => f.name);
    }

    static async handle<T>(promise: PrismaPromise<T>) {

        try {
            return await promise;
        } catch (error: any) {

            // TODO: Write into a log file
            console.log(error);

            if (error instanceof PrismaClientKnownRequestError) {

                switch (error.code) {
                    case 'P1000':
                        throw new Error(`Authentication failed against database server at ${process.env.DB_HOST}, the provided database credentials for ${process.env.DB_USERNAME} are not valid. Please make sure to provide valid database credentials for the database server at ${process.env.DB_HOST}`);
                    case 'P1001':
                        throw new Error(`Can't reach database server at ${process.env.DB_HOST}:${process.env.DB_PORT} Please make sure your database server is running at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
                    case 'P1002':
                        throw new Error(`Schema not found in database server at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
                    case 'P1003':
                        throw new Error(`Database ${process.env.DB_NAME} not found in database server at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
                    case 'P1009':
                        throw new Error(`Database ${process.env.DB_NAME} already exists on the database server at ${process.env.DB_HOST}:${process.env.DB_PORT}`);
                    case 'P1010':
                        throw new Error(`User ${process.env.DB_USER} was denied access on the database ${process.env.DB_NAME}`);
                    default:
                        throw new Error(error.message);
                }

            }

            throw new Error(error.message);

        }

    }

}

export default DatabaseConn;