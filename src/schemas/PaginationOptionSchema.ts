import z from "zod";
import { PositiveIntSchema } from "./PositiveIntSchema";
import { Order } from "@/types";

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
        order: z.enum(['asc', 'desc']).transform((value) => value.toLowerCase() as Order).catch(DEFAULT_ORDER),
        orderBy: z.string().default(DEFAULT_ORDER).transform((value) => {

            if (!value || !allowedOrderByValues.includes(value)) {
                return DEFAULT_SORT;
            }

            return value;
        })
    });

}