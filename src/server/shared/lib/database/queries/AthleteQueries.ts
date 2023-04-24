import { Athlete } from "@/shared/models";
import executeQuery from "@/server/shared/lib/database/queries/helpers/executeQuery";
import { AthleteOptionalSchema, AthleteSchema } from "@/server/shared/lib/schemas";

class AthleteQueries {

    static async getById(id: string | number) {

        try {

            const rows = await executeQuery(
                "SELECT * FROM Athletes WHERE ID = ?",
                [id]
            );

            return rows.length > 0
                ? rows[0]
                : null;

        } catch (error: any) {
            throw new Error("Error on table: Athletes (getById)");
        }

    }

    static async create({ firstName, lastName, age, countryID, stateID, cityID }: Athlete) {

        try {

            const rows = await executeQuery(
                "INSERT INTO Athletes (firstName, lastName, age, countryID, stateID, cityID) VALUES (?, ?, ?, ?, ?, ?)",
                [firstName, lastName, age, countryID, stateID, cityID]
            );

            return Number(rows.insertId);

        } catch (error: any) {
            throw new Error("Error on table: Athletes (create)");
        }

    }

    static isTypeAthlete(res: unknown, allRequired: boolean): res is Athlete {

        try {

            if (allRequired) {
                AthleteSchema.parse(res);
            } else {
                AthleteOptionalSchema.parse(res);
            }

            return true;

        } catch (error: any) {
            console.log(error.message);
            return false;
        }

    }

}

export default AthleteQueries;