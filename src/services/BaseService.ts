import { DatabaseConn, prismaClient } from "@/db";
import { PrismaPromise } from "@prisma/client";

class BaseService extends DatabaseConn {

    static client = prismaClient;

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

export default BaseService;