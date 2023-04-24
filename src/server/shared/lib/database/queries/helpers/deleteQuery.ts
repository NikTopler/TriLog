import StringNumberBooleanOrNullMap from "@/shared/interfaces/StringNumberBooleanOrNullMap";
import executeQuery from "./executeQuery";

async function deleteQuery(tableName: string, whereParams: StringNumberBooleanOrNullMap) {

    let query = `DELETE FROM ${tableName} WHERE `;
    for (const key in whereParams) {

        if (whereParams[key] === null) {
            query += `${key} IS NULL AND `;
            continue;
        }

        query += `${key} = ? AND `;

    }

    query = query.slice(0, -5);

    try {

        const rows = await executeQuery(
            query,
            Object.values(whereParams)
        );

        return rows.affectedRows;

    } catch (error: any) {
        throw new Error(`Error on table: ${tableName} (delete)`);
    }

}

export default deleteQuery;