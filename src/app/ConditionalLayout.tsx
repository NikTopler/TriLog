'use client';

import { LayoutProps } from "@/types";
import { usePathname } from "next/navigation";
import HomeLayout from "./(home)/HomeLayout";
import { validatePaths } from "@/helpers";
import { CookiesProvider } from "react-cookie";
import { AuthProvider } from "@/providers";

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
    let childrenToRender = children;

    if (validatePaths(HOME_PATHS, pathname)) {
        childrenToRender = (
            <HomeLayout>
                {children}
            </HomeLayout>
        );
    }

    return (
        <CookiesProvider>
            <AuthProvider>
                {childrenToRender}
            </AuthProvider>
        </CookiesProvider>
    );

}

export default ConditionalLayout;