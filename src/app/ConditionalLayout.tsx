'use client';

import { LayoutProps } from "@/interfaces";
import { usePathname } from "next/navigation";
import HomeLayout from "./(home)/HomeLayout";
import { validatePaths } from "@/helpers";
import { CookiesProvider } from "react-cookie";

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
            <CookiesProvider>
                <HomeLayout>
                    {children}
                </HomeLayout>
            </CookiesProvider>
        );
    }

    return (
        <CookiesProvider>
            {children}
        </CookiesProvider>
    );

}

export default ConditionalLayout;