import { Prisma, PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient({
    errorFormat: 'pretty'
});

export type TableName = Prisma.ModelName;

export default prismaClient;