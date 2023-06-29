'use client';

import React from "react";
import { changeFirstLetter } from "@/helpers";
import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./breadcrumb.module.scss";

function BreadCrumb() {

    let accumulatedPath = '';
    const pathnames = usePathname().substring(1).split('/');

    if (pathnames.length === 1) {
        return null;
    }

    return (

        <nav className={styles['breadcrumbs-container']}>
            {
                pathnames.map((path, idx) => {

                    accumulatedPath += '/' + path;

                    return (
                        <React.Fragment key={idx}>
                            {idx > 0 && <span className={styles['breadcrumbs-container__separator']}>/</span>}
                            <Link
                                href={accumulatedPath}
                                className={styles['breadcrumbs-container__breadcrumb']}
                            >
                                {changeFirstLetter(path)}
                            </Link>
                        </React.Fragment>
                    );
                })
            }
        </nav>
    );

}

export default BreadCrumb;