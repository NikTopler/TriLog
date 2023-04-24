import { Country } from "@/shared/models";
import executeQuery from "./helpers/executeQuery";
import { CountryOptionalSchema, CountrySchema } from "../../schemas";

class CountryQueries {

    static async getById(id: string | number) {

        try {

            const rows = await executeQuery(
                "SELECT * FROM Countries WHERE ID = ?",
                [id]
            );

            return rows.length > 0
                ? rows[0]
                : null;

        } catch (error: any) {
            throw new Error("Error on table: Countries (getById)");
        }

    }

    static async create({ name, fullName, alpha2, alpha3, continentCode, number }: Country) {

        try {

            const rows = await executeQuery(
                "INSERT INTO Countries (name, fullName, alpha2, alpha3, continentCode, number) VALUES (?, ?, ?, ?, ?, ?)",
                [name, fullName, alpha2, alpha3, continentCode, number]
            );

            return Number(rows.insertId);

        } catch (error: any) {
            throw new Error("Error on table: Countries (create)");
        }

    }

    static isTypeCountry(res: any, allRequired: boolean): res is Country {

        try {

            if (allRequired) {
                CountrySchema.parse(res);
            } else {
                CountryOptionalSchema.parse(res);
            }

            return true;

        } catch (error: any) {
            console.log(error.message);
            return false;
        }

    }

}

export default CountryQueries;