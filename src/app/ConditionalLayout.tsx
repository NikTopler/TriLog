'use client';

import { LayoutProps } from "@/interfaces";
import { usePathname } from "next/navigation";
import HomeLayout from "./(home)/HomeLayout";
import { validatePaths } from "@/helpers";

const HOME_PATHS = [
    '/',
    '/athletes',
    '/athletes/*',
    '/countries',
    '/countries/*',
    '/states',
    '/states/*',
    '/cities',
    '/cities/*',
    '/triathlons',
    '/triathlons/*',
];

function ConditionalLayout({ children }: LayoutProps) {

    const pathname = usePathname();

    if (validatePaths(HOME_PATHS, pathname)) {
        return (
            <HomeLayout>
                {children}
            </HomeLayout>
        );
    }

    return (
        <>
            {children}
        </>
    );

}

export default ConditionalLayout;