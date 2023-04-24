import mariadb, { PoolConnection } from "mariadb";
import dotenv from "dotenv";

dotenv.config();

const pool = mariadb.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

function getPoolConnection(): Promise<PoolConnection> {
    return pool.getConnection();
}

export default getPoolConnection;