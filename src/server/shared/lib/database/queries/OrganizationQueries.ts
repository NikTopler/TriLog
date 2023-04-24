import { Organization } from "@/shared/models";
import executeQuery from "./helpers/executeQuery";

class OrganizationQueries {

    static async getById(id: string | number) {

        try {

            const rows = await executeQuery(
                "SELECT * FROM Organizations WHERE ID = ?",
                [id]
            );

            return rows.length > 0
                ? rows[0]
                : null;

        } catch (error: any) {
            throw new Error("Error on table: Organizations (getById)");
        }

    }

    static async create({ name, acronym }: Organization) {

        try {

            const rows = await executeQuery(
                "INSERT INTO Organizations (name, acronym) VALUES (?, ?)",
                [name, acronym]
            );

            return Number(rows.insertId);

        } catch (error: any) {
            throw new Error("Error on table: Organizations (create)");
        }

    }

    static isTypeOrganization(res: any): res is Organization {

        return (
            typeof res === 'object'
            && res !== null
            && res.hasOwnProperty('ID') && (typeof res.ID === 'string' || typeof res.ID === 'number')
            && res.hasOwnProperty('name') && typeof res.name === 'string'
            && res.hasOwnProperty('acronym') && typeof res.acronym === 'string'
        );

    }

}

export default OrganizationQueries;