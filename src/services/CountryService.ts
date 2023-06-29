import { PaginationOptions } from "@/schemas";
import { Countries } from "@prisma/client";
import BaseService from "./BaseService";
import { GenericRecord } from "@/types";

class CountryService extends BaseService {

    static getAll(
        where: GenericRecord,
        { page, perPage, order, orderBy }: PaginationOptions,
        count: boolean = false
    ) {

        if (count) {
            return this.handle(
                this.client.countries.count({
                    where
                })
            );
        }

        return this.handle(
            this.client.countries.findMany({
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
            this.client.countries.findUnique({
                where: { ID }
            })
        );

    }

    static create({ name, fullName, alpha2, alpha3, continentCode, number }: Countries) {

        return this.handle(
            this.client.countries.create({
                data: {
                    name,
                    fullName,
                    alpha2,
                    alpha3,
                    continentCode,
                    number
                }
            })
        );

    }

    static update(ID: number, values: GenericRecord) {

        return this.handle(
            this.client.countries.update({
                where: { ID },
                data: values
            })
        );

    }

    static delete(ID: number) {

        return this.handle(
            this.client.countries.delete({
                where: { ID }
            })
        );

    }

}

export default CountryService;