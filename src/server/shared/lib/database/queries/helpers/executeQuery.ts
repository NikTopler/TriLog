import DbConn from "@/server/shared/utils/types/DbConn";
import getPoolConnection from "../../connection";

async function executeQuery(sql: string, params: any[]) {

    let conn: DbConn = null;

    try {
        conn = await getPoolConnection();
        return await conn.query(sql, params);
    } catch (error) {
        // TODO: implement logger
        console.log(error);
        throw error;
    } finally {
        conn?.release();
    }

}

export default executeQuery;