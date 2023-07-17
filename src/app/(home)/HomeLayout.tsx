'use client';

import { useState } from "react";
import { Tooltip } from "@mui/joy";
import { Progress } from "@/components/ui/progress"
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LayoutProps } from "@/types";
import { BreadCrumb, Navbar, Sidebar } from "@/components/navigation";
import { useProgressContext, useTranslationContext } from "@/providers";
import { changeFirstLetter } from "@/helpers";
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

    const [translationsLoading, lang, t, setLang] = useTranslationContext();
    const progressContext = useProgressContext();

    const [sidebar, setSidebar] = useState<SidebarState>({
        open: true,
        closing: false,
        hovering: false
    });

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
            {progressContext.value !== null && (
                <div className={styles['home__loading-container']}>
                    <Progress
                        style={{ height: '0.25rem' }}
                        value={progressContext.value}
                    />
                </div>
            )}
            <nav className={styles['home__navbar']}>
                <div className={styles['home__navbar-main']}>
                    <Navbar />
                </div>
            </nav>

            <section className={styles['home__sidebar']}>
                <div className={styles['home__sidebar-container']} onMouseEnter={() => onSidebarHover(true)} onMouseLeave={() => onSidebarHover(false)}>
                    <div className={styles['home__sidebar-container__main']}>
                        <Sidebar />
                    </div>
                    <div className={styles['home__sidebar-container__slider']}>
                        <div className={styles['home__sidebar-container__slider-container']} />
                        {!translationsLoading && (
                            <div className={styles['home__sidebar-container__slider-button-container']}>
                                <div className={styles['home__sidebar-container__slider-button-container--button']} onClick={onSidebarToggle}>
                                    <Tooltip title={changeFirstLetter(sidebar.open ? t['close'] : t['open'])} placement="right">
                                        <div className={styles['home__sidebar-slider-content-icon']}>
                                            {sidebar.open
                                                ? <KeyboardArrowLeftIcon />
                                                : <KeyboardArrowRightIcon />
                                            }
                                        </div>
                                    </Tooltip>
                                </div>
                            </div>
                        )}
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

// TODO: Implement better skeleton views
function SkeletonContentView() {
    return (
        <div>
            <span>Loading ...</span>
        </div>
    );
}

function SkeletonSidebarView() {
    return (
        <div>
            <span>Loading ...</span>
        </div>
    );
}

export default HomeLayout;