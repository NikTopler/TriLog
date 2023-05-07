'use client';

import { LayoutProps } from "@/interfaces";
import { usePathname } from "next/navigation";
import HomeLayout from "./(home)/HomeLayout";

const HOME_PATHS = [
    '/'
];

function ConditionalLayout({ children }: LayoutProps) {

    const pathname = usePathname();

    if (HOME_PATHS.includes(pathname)) {
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