import StringNumberBooleanOrNullMap from "@/shared/interfaces/StringNumberBooleanOrNullMap";
import executeQuery from "./executeQuery";

async function updateQuery(
    tableName: string,
    setParams: StringNumberBooleanOrNullMap,
    whereParams: StringNumberBooleanOrNullMap
) {

    let query = `UPDATE ${tableName} SET `;
    for (const key in setParams) {
        query += `${key} = ?, `;
    }
    query = query.slice(0, -2);

    query += " WHERE ";
    for (const key in whereParams) {

        if (whereParams[key] === null) {
            query += `${key} IS NULL AND `;
            continue;
        }

        query += `${key} = ? AND `;

    }

    query = query.slice(0, -5);

    try {

        await executeQuery(
            query,
            [...Object.values(setParams), ...Object.values(whereParams)]
        );

    } catch (error: any) {
        throw new Error(`Error on table: ${tableName} (update)`);
    }

}

export default updateQuery;