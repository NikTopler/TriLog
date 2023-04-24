import { City } from "@/shared/models";
import executeQuery from "./helpers/executeQuery";
import { CityOptionalSchema, CitySchema } from "../../schemas";

class CityQueries {

    static async getById(id: string | number) {

        try {

            const rows = await executeQuery(
                "SELECT * FROM Cities WHERE ID = ?",
                [id]
            );

            return rows.length > 0
                ? rows[0]
                : null;

        } catch (error: any) {
            throw new Error("Error on table: Cities (getById)");
        }

    }

    static async create({ name, stateID, countryID }: City) {

        try {

            const rows = await executeQuery(
                "INSERT INTO Cities (name, stateID, countryID) VALUES (?, ?, ?)",
                [name, stateID, countryID]
            );

            return Number(rows.insertId);

        } catch (error: any) {
            throw new Error("Error on table: Cities (create)");
        }

    }

    static isTypeCity(res: any, allRequired: boolean): res is City {

        try {

            if (allRequired) {
                CitySchema.parse(res);
            } else {
                CityOptionalSchema.parse(res);
            }

            return true;

        } catch (error: any) {
            console.log(error.message);
            return false;
        }

    }

}

export default CityQueries;