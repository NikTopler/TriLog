import { useRouter } from "next/router";
import { useState } from "react";
import { DisplayMode } from "../../types";
import TextBox from "../inputs/TextBox";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RegularButton from "../buttons/RegularButton/RegularButton";
import styles from "./Navbar.module.scss";
import { Tooltip } from "@mui/joy";

interface NavbarProps {
    mode: DisplayMode;
    setMode: (mode: DisplayMode) => void;
}

function Navbar({ mode, setMode }: NavbarProps) {

    const router = useRouter();

    const [search, setSearch] = useState<string>('');
    const [searchFocused, setSearchFocused] = useState<boolean>(false);

    const handleInputChange = (value: string) => {
        setSearch(value);
    }

    const onHomeClick = () => {
        router.push('/');
    }

    const buttonStyle = {
        color: mode === 'light' ? '#000' : '#fff',
        fontSize: '1rem',
        padding: '0.6rem',
        fontWeight: 500,
        borderRadius: '4px',
        ":hover": {
            backgroundColor: mode === 'light' ? '#f5f5f5' : '#303030'
        },
        ":active": {
            backgroundColor: mode === 'light' ? '#e6e6e6' : '#303030'
        }
    }

    return (
        <div className={styles['navbar__container']}>
            <div className={styles['navbar__container__logo-container']}>
                <span onClick={onHomeClick}>TriLog</span>
            </div>
            <div className={styles['navbar__container__content-container']}>
                <div className={styles['navbar__container__content-container-container__item']} data-active>
                    <RegularButton
                        text="Categories"
                        variant="plain"
                        endDecorator={<KeyboardArrowDownIcon sx={{ fontSize: 'medium' }} />}
                        style={buttonStyle}
                    />
                    <div className={styles['navbar__container__content-container-container__item-selector']} />
                </div>
                <div className={styles['navbar__container__content-container-container__item']}>
                    <RegularButton
                        text="Types"
                        variant="plain"
                        endDecorator={<KeyboardArrowDownIcon sx={{ fontSize: 'medium' }} />}
                        style={buttonStyle}
                    />
                    <div className={styles['navbar__container__content-container-container__item-selector']} />
                </div>
            </div>
            <div className={styles['navbar__container__menu']}>
                <div className={styles['navbar__container__menu-search']}>
                    <TextBox
                        value={search}
                        placeholder="Search"
                        handleInputFocusChange={setSearchFocused}
                        handleInputChange={handleInputChange}
                        style={{
                            width: searchFocused ? '600px' : '300px',
                            backgroundColor: mode === 'light' ? '#f5f5f5' : '#303030',
                            color: mode === 'light' ? '#000' : '#fff',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '0 10px',
                            fontSize: '1rem'
                        }}
                        startDecorator={<SearchIcon />}
                    />
                </div>
                <div className={styles['navbar__container__menu-container']}>
                    <Tooltip title={mode === 'light' ? 'Dark mode' : 'Light mode'}>
                        <div
                            onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
                            className={styles['navbar__container__menu-container__image-container']}
                            data-icon>
                            {mode === 'light' && <LightModeIcon />}
                            {mode === 'dark' && <NightlightRoundIcon />}
                        </div>
                    </Tooltip>
                </div>
                <div className={styles['navbar__container__menu-container']}>
                    <Tooltip title="Profile">
                        <div className={styles['navbar__container__menu-container__image-container']} data-image>
                            <img src="https://via.placeholder.com/150" alt="profile" />
                        </div>
                    </Tooltip>
                </div>
            </div>
        </div>
    );

}

export default Navbar;