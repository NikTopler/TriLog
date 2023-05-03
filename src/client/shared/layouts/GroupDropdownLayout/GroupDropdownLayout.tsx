import { useState } from "react";
import { LayoutProp } from "../../interfaces";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import styles from "./GroupDropdownLayout.module.scss";

interface GroupDropdownLayoutProp extends LayoutProp {
    title: string;
}

function GroupDropdownLayout({ children, title }: GroupDropdownLayoutProp) {

    const [isOpen, setIsOpen] = useState(true);

    return (
        <section className={styles['group-dropdown-layout']}>
            <header className={styles['group-dropdown-layout--container']} onClick={() => setIsOpen(!isOpen)}>
                {isOpen
                    ? <KeyboardArrowDownIcon />
                    : <KeyboardArrowRightIcon />
                }
                <h1>{title}</h1>
            </header>
            <div className={styles['group-dropdown-layout--content']}>
                {isOpen && children}
            </div>
        </section>
    );

}

export default GroupDropdownLayout;