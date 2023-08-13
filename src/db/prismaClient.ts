import { Prisma, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
    errorFormat: 'pretty',
    log: ['warn', 'error']
});

export type TableName = Prisma.ModelName;

export default prismaClient;