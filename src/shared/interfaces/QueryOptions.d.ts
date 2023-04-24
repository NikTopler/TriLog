import Order from "../types/Order";

interface QueryOptions {
    page: number;
    perPage: number;
    order: Order;
    orderBy: string;
}

export default QueryOptions;