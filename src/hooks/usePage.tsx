import { createQueryString } from "@/helpers";
import { useRouter, useSearchParams } from "next/navigation";

export type UsePageOpen = (path: string, includeSearchParams?: boolean, queryParams?: Record<string, string>) => void;

function usePage() {

    const router = useRouter();
    const searchParams = useSearchParams();

    const open = (path: string, includeSearchParams: boolean = true, queryParams: Record<string, string> = {}) => {

        let fullPath = path;

        if (includeSearchParams) {
            const query = createQueryString(searchParams, queryParams);
            if (query.length > 0) {
                fullPath += '?' + query;
            }
        }

        router.push(fullPath);

    }

    return {
        open
    }
}

export default usePage;