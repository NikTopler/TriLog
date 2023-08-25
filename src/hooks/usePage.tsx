import { createQueryString } from "@/helpers";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export type UsePageOpen = (path: string, includeSearchParams?: string[], queryParams?: Record<string, string>) => void;

function usePage() {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [searchParamsObj, setSearchParamsObj] = useState<Record<string, string>>({});

    useEffect(() => router.push(pathname + '?' + createQueryString(searchParams, searchParamsObj)), [searchParamsObj]);

    const open = (path: string, includedSearchParams: string[] = ['lang'], queryParams: Record<string, string> = {}) => {

        let obj: Record<string, string | null | undefined> = {};

        includedSearchParams.forEach((value) => {
            if (includedSearchParams.includes(value)) {
                obj[value] = searchParams.get(value);
            }
        });

        router.push(path + '?' + createQueryString(obj as any, queryParams));
    }

    return {
        open,
        setSearchParams: setSearchParamsObj
    }
}

export default usePage;