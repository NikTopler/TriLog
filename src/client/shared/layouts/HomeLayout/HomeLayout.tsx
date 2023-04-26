import { useState } from "react";
import { Tooltip } from "@mui/joy";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { DisplayMode } from "../../types";
import { LayoutProp } from "../../interfaces";
import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./HomeLayout.module.scss";

interface SidebarState {
    open: boolean;
    closing: boolean;
    hovering: boolean;
}

function HomeLayout({ children }: LayoutProp) {

    const [mode, setMode] = useState<DisplayMode>('light');
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

            <nav className={styles['home__navbar']}>
                <div className={styles['home__navbar-main']}>
                    <Navbar
                        mode={mode}
                        setMode={setMode}
                    />
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
                Home
                {children}
            </section>
        </div>
    );

}

export default HomeLayout;