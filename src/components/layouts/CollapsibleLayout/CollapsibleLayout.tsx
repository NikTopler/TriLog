import { useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { LayoutProps } from "@/interfaces";
import styles from "./collapsible-layout.module.scss";

interface CollapsibleLayoutProp extends LayoutProps {
    title: string;
}

function CollapsibleLayout({ children, title }: CollapsibleLayoutProp) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <section className={styles['collapsible-layout']}>
            <header className={styles['collapsible-layout--container']} onClick={() => setIsOpen(!isOpen)}>
                {isOpen
                    ? <KeyboardArrowDownIcon />
                    : <KeyboardArrowRightIcon />
                }
                <h1>{title}</h1>
            </header>
            <div className={styles['collapsible-layout--content']}>
                {isOpen && children}
            </div>
        </section>
    );

}

export default CollapsibleLayout;