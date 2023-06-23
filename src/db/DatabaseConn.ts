import { Prisma, PrismaClient } from "@prisma/client";

class DatabaseConn {

    static client = new PrismaClient({ errorFormat: 'pretty' });

    static getColumnNames(tableName: string) {
        return Prisma.dmmf.datamodel.models.find(m => m.name === tableName)?.fields.map(f => f.name);
    }

}

export default DatabaseConn;