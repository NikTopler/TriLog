import { State } from "@/shared/models";
import executeQuery from "./helpers/executeQuery";

class StateQueries {

    static async getById(id: string | number) {

        try {

            const rows = await executeQuery(
                "SELECT * FROM States WHERE ID = ?",
                [id]
            );

            return rows.length > 0
                ? rows[0]
                : null;

        } catch (error: any) {
            throw new Error("Error on table: States (getById)");
        }

    }

    static async create({ name, acronym, countryID }: State) {

        try {

            const rows = await executeQuery(
                "INSERT INTO States (name, acronym, countryID) VALUES (?, ?, ?)",
                [name, acronym, countryID]
            );

            return Number(rows.insertId);

        } catch (error: any) {
            throw new Error("Error on table: States (create)");
        }

    }

    static isTypeState(res: any): res is State {

        return (
            typeof res === 'object'
            && res !== null
            && res.hasOwnProperty('ID') && (typeof res.ID === 'string' || typeof res.ID === 'number')
            && res.hasOwnProperty('name') && typeof res.name === 'string'
            && res.hasOwnProperty('acronym') && typeof res.acronym === 'string'
            && res.hasOwnProperty('countryID') && typeof res.countryID === 'number'
        );

    }

}

export default StateQueries;