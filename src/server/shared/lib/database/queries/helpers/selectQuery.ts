import ConfigOptions from "@/shared/interfaces/ConfigOptions";
import QueryOptions from "@/shared/interfaces/QueryOptions";
import executeQuery from "./executeQuery";

async function selectQuery(
    tableName: string,
    isCount: boolean,
    whereParams: ConfigOptions,
    filterQueryParams?: QueryOptions
) {

    let query = `SELECT * FROM ${tableName} `;
    if (isCount) {
        query = `SELECT COUNT(*) AS count FROM ${tableName} `;
    }

    if (Object.keys(whereParams).length > 0) {
        query += "WHERE ";
    }

    for (const key in whereParams) {

        if (whereParams[key] === null) {
            query += `${key} IS NULL AND `;
        } else {

            const value = whereParams[key];

            if (value.trim().length > 0 && isNaN(Number(value))) {
                query += `LOWER(${key}) LIKE '%${value.toLowerCase()}%' AND `;
            } else if (!isNaN(Number(value))) {
                query += `${key} = ${value} AND `;
            }
        }

    }

    if (Object.keys(whereParams).length > 0) {
        query = query.slice(0, -5);
    }

    if (!isCount && filterQueryParams) {

        const { page, perPage, order, orderBy } = filterQueryParams;

        query += ` ORDER BY ${orderBy} ${order}`;
        query += ` LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`;

    }

    try {

        const rows = await executeQuery(query, []);

        if (isCount) {
            return Number(rows[0].count);
        }

        return rows;

    } catch (error: any) {
        throw new Error(`Error on table: ${tableName} (select)`);
    }

}

export default selectQuery;