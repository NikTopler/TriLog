'use client';

import { useEffect, useRef, useState } from "react";
import { Tooltip } from "@mui/joy";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LayoutProps } from "@/interfaces";
import { BreadCrumb, Navbar, Sidebar } from "@/components/navigation";
import { fetchData } from "@/helpers";
import { TriathlonCategories } from "@prisma/client";
import { TriathlonCategoriesRef } from "@/components/navigation/Navbar/Navbar";
import styles from "./home-layout.module.scss";

interface SidebarState {
    open: boolean;
    closing: boolean;
    hovering: boolean;
}

// TODO: Implement better interface
export interface StateObject<T> {
    data: T;
    loading: boolean;
    errors: any;
}

function HomeLayout({ children }: LayoutProps) {

    const navbarRef = useRef<TriathlonCategoriesRef>(null);

    const [sidebar, setSidebar] = useState<SidebarState>({
        open: true,
        closing: false,
        hovering: false
    });

    useEffect(() => {

        fetchData<TriathlonCategories[]>('/api/triathlons/categories', {})
            .then((res) => {

                if (res === undefined) {
                    throw new Error('Error fetching data');
                }

                navbarRef.current?.setCategories({
                    data: res,
                    loading: false,
                    errors: null
                });

            })
            .catch((err) => {
                console.log(err);
                navbarRef.current?.setCategories({
                    data: [],
                    loading: false,
                    errors: 'Error fetching data'
                });
            });

        fetchData<TriathlonCategories[]>('/api/triathlons/types', {})
            .then((res) => {

                if (res === undefined) {
                    throw new Error('Error fetching data');
                }

                navbarRef.current?.setTypes({
                    data: res,
                    loading: false,
                    errors: null
                });

            })
            .catch((err) => {
                console.log(err);
                navbarRef.current?.setTypes({
                    data: [],
                    loading: false,
                    errors: 'Error fetching data'
                });
            });

    }, []);

    const onSidebarToggle = () => {

        setSidebar({
            open: !sidebar.open,
            closing: true,
            hovering: false
        });

        setTimeout(() => {
            setSidebar({
                ...sidebar,
                open: !sidebar.open,
                hovering: false
            });
        }, 300);

    }

    const onSidebarHover = (hovering: boolean) => {

        if (sidebar.closing) {
            return;
        }

        setSidebar({
            ...sidebar,
            hovering
        });
    }

    return (
        <div className={styles['home']} data-sidebar-open={sidebar.open} data-hovering={sidebar.hovering}>

            <nav className={styles['home__navbar']}>
                <div className={styles['home__navbar-main']}>
                    <Navbar ref={navbarRef} />
                </div>
            </nav>

            <section className={styles['home__sidebar']}>
                <div className={styles['home__sidebar-container']} onMouseEnter={() => onSidebarHover(true)} onMouseLeave={() => onSidebarHover(false)}>
                    <div className={styles['home__sidebar-container__main']}>
                        <Sidebar />
                    </div>
                    <div className={styles['home__sidebar-container__slider']}>
                        <div className={styles['home__sidebar-container__slider-container']} />
                        <div className={styles['home__sidebar-container__slider-button-container']}>
                            <div className={styles['home__sidebar-container__slider-button-container--button']} onClick={onSidebarToggle}>
                                <Tooltip title={sidebar.open ? 'Close' : 'Open'} placement="right">
                                    <div className={styles['home__sidebar-slider-content-icon']}>
                                        {sidebar.open
                                            ? <KeyboardArrowLeftIcon />
                                            : <KeyboardArrowRightIcon />
                                        }
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles['home__content']}>
                <BreadCrumb />
                {children}
            </section>
        </div>
    );

}

export default HomeLayout;