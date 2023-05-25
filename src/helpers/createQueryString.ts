import { ReadonlyURLSearchParams } from "next/navigation";

function createQueryString(searchParams: ReadonlyURLSearchParams, obj: Record<string, string>) {
    const params = new URLSearchParams(searchParams);

    for (const key in obj) {
        params.set(key, obj[key]);
    }

    return params.toString();
}

export default createQueryString;