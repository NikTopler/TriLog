import z from "zod";
import { PositiveIntSchema } from "./PositiveIntSchema";
import { Order } from "@/types";

export interface PaginationOptions<T> {
    page: number;
    perPage: number;
    order: Order;
    orderBy: T;
}

const MAX_PER_PAGE = 500;
const DEFAULT_PER_PAGE = 25;
const DEFAULT_PAGE = 1;
const DEFAULT_ORDER: Order = 'desc'
const DEFAULT_SORT = 'ID';

export function createPaginationOptionSchema<T>(
    allowedOrderByValues: string[],
    perPage = DEFAULT_PER_PAGE,
    page = DEFAULT_PAGE,
    order = DEFAULT_ORDER,
    orderBy = DEFAULT_SORT
) {

    return z.object({
        page: PositiveIntSchema.catch(page),
        perPage: PositiveIntSchema.max(MAX_PER_PAGE).catch(perPage),
        order: z.enum(['asc', 'desc']).transform((value) => value.toLowerCase() as Order).catch(order),
        orderBy: z.string().default(orderBy).transform((value) => {
            if (!value || !allowedOrderByValues.includes(value)) {
                return orderBy as T;
            }

            return value as T;
        })
    });

}