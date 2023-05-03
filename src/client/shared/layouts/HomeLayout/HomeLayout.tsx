import { useState } from "react";
import styles from "./HomeLayout.module.scss";
import Navbar from "../../components/Navbar/Navbar";
import { DisplayMode } from "../../types";
import { LayoutProp } from "../../interfaces";
import Sidebar from "../../components/Sidebar/Sidebar";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Tooltip } from "@mui/joy";

function HomeLayout({ children }: LayoutProp) {

    const [mode, setMode] = useState<DisplayMode>('light');
    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (
        <div className={styles['home']} data-sidebar-open={sidebarOpen}>

            <nav className={styles['home__navbar']}>
                <div className={styles['home__navbar-main']}>
                    <Navbar
                        mode={mode}
                        setMode={setMode}
                    />
                </div>
            </nav>

            <aside className={styles['home__sidebar']}>
                <section className={styles['home__sidebar-main']}>
                    <Sidebar />
                </section>
                <section className={styles['home__sidebar-slider']}>
                    <div className={styles['home__sidebar-slider-content']} onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Tooltip title={sidebarOpen ? "Close" : "Open"} placement="right">
                            <div className={styles['home__sidebar-slider-content-icon']}>
                                {sidebarOpen ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
                            </div>
                        </Tooltip>
                    </div>
                </section>
            </aside>

            <div className={styles['home__main']}>
                <div className={styles['home__main-content']}>
                    Home Page
                </div>
            </div>

            {children}
        </div>
    );

}

export default HomeLayout;