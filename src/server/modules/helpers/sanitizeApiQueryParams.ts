import Order from "@/shared/types/Order";
import QueryOptions from "@/shared/interfaces/QueryOptions";
import { NextApiRequest } from "next";

const DEFAULT_PER_PAGE = 25;
const MAX_PER_PAGE = 100;
const DEFAULT_PAGE = 1;
const DEFAULT_ORDER: Order = 'DESC'
const DEFAULT_SORT = 'ID';

function sanitizeApiQueryParams(req: NextApiRequest, allowedOrderByValues?: string[]) {

    let perPage = Number(req.query.perPage);
    let page = Number(req.query.page);
    let order = req.query.order || null;
    let orderBy = req.query.orderBy || null;

    if (isNaN(perPage)
        || perPage <= 0
        || perPage > MAX_PER_PAGE) {
        perPage = DEFAULT_PER_PAGE;
    }

    if (isNaN(page)
        || page <= 0) {
        page = DEFAULT_PAGE;
    }

    if (typeof order !== 'string' || !['ASC', 'DESC'].includes(order.toString().toUpperCase())) {
        order = DEFAULT_ORDER;
    }

    if (orderBy && allowedOrderByValues && !allowedOrderByValues.includes(orderBy.toString())) {
        throw new Error(`Invalid sort property: ${orderBy}`);
    }

    return {
        page,
        perPage,
        order,
        orderBy: orderBy || DEFAULT_SORT
    } as QueryOptions;

}

export default sanitizeApiQueryParams;