import z from "zod";
import { Order } from "@/types";
import { PositiveIntSchema } from "./PositiveIntSchema";

export interface PaginationOptions {
    page: number;
    perPage: number;
    order: Order;
    orderBy: string;
}

const DEFAULT_PER_PAGE = 25;
const MAX_PER_PAGE = 100;
const DEFAULT_PAGE = 1;
const DEFAULT_ORDER: Order = 'desc'
const DEFAULT_SORT = 'ID';

export function createPaginationOptionSchema(allowedOrderByValues: string[]) {

    return z.object({
        page: PositiveIntSchema.catch(DEFAULT_PAGE),
        perPage: PositiveIntSchema.max(MAX_PER_PAGE).catch(DEFAULT_PER_PAGE),
        order: z.string().default(DEFAULT_ORDER).transform((value) => {

            if (!value || !(value.toLowerCase() === 'asc' || value.toLowerCase() === 'desc')) {
                return DEFAULT_ORDER;
            }

            return value.toLowerCase() as Order;

        }),
        orderBy: z.string().default(DEFAULT_SORT).transform((value) => {

            if (!value || !allowedOrderByValues.includes(value)) {
                return DEFAULT_SORT;
            }

            return value;
        })
    });

}