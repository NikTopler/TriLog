import { GenericRecord } from "@/types";
import { PaginationOptions } from "@/schemas";
import { Athletes } from "@prisma/client";
import BaseService from "../BaseService";

class AthleteService extends BaseService {

    static getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {
            return this.handle(
                this.client.athletes.count({
                    where
                })
            );
        }

        return this.handle(
            this.client.athletes.findMany({
                where,
                orderBy: {
                    [orderBy]: order
                },
                skip: (page - 1) * perPage,
                take: perPage
            })
        );

    }

    static getById(ID: number) {

        return this.handle(
            this.client.athletes.findUnique({
                where: { ID }
            })
        );

    }

    static create({ firstName, lastName, age, countryID, stateID, cityID }: Athletes) {

        return this.handle(
            this.client.athletes.create({
                data: {
                    firstName,
                    lastName,
                    age,
                    countryID,
                    stateID,
                    cityID
                }
            })
        );

    }

    static update(ID: number, values: GenericRecord) {

        return this.handle(
            this.client.athletes.update({
                where: { ID },
                data: values
            })
        );

    }

    static delete(ID: number) {

        return this.handle(
            this.client.athletes.delete({
                where: { ID }
            })
        );

    }

}

export default AthleteService;