'use client';

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Tooltip } from "@mui/joy";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomTextBox, RegularButton } from "@/components/inputs";
import styles from "./navbar.module.scss";

function Navbar() {

    const router = useRouter();

    const [search, setSearch] = useState<string>('');
    const [searchFocused, setSearchFocused] = useState<boolean>(false);

    // TODO: Implement theme change
    // TODO: Remove this temporary state
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [user, setUser] = useState<any>(null);

    const handleInputChange = (value: string) => {
        setSearch(value);
    }

    const onHomeClick = () => {
        router.push('/');
    }

    const AccountView = () => {

        if (user) {
            return (
                <Tooltip title="Profile">
                    <div className={styles['navbar__container__menu-container__image-container']} data-image>
                        <img src="https://via.placeholder.com/150" alt="profile" />
                    </div>
                </Tooltip>
            );
        }

        return (
            <RegularButton
                text="Login"
                variant="solid"
                className="btn tertiary solid"
                handleOnClick={() => router.push('/auth/login')}
            />
        );

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
                        className="btn secondary plain"
                    />
                    <div className={styles['navbar__container__content-container-container__item-selector']} />
                </div>
                <div className={styles['navbar__container__content-container-container__item']}>
                    <RegularButton
                        text="Types"
                        variant="plain"
                        endDecorator={<KeyboardArrowDownIcon sx={{ fontSize: 'medium' }} />}
                        className="btn secondary plain"
                    />
                    <div className={styles['navbar__container__content-container-container__item-selector']} />
                </div>
            </div>
            <div className={styles['navbar__container__menu']}>
                <div className={styles['navbar__container__menu-search']}>
                    <CustomTextBox
                        value={search}
                        placeholder="Search"
                        handleInputFocusChange={setSearchFocused}
                        handleInputChange={handleInputChange}
                        style={{
                            width: searchFocused ? '600px' : '300px',
                            backgroundColor: '#f5f5f5',
                            color: '#000',
                            border: 'none',
                            borderRadius: '5px',
                            padding: '0 10px',
                            fontSize: '1rem'
                        }}
                        startDecorator={<SearchIcon />}
                    />
                </div>
                <div className={styles['navbar__container__menu-container']}>
                    <Tooltip title={theme === 'light' ? 'Dark mode' : 'Light mode'}>
                        <div
                            className={styles['navbar__container__menu-container__image-container']}
                            data-icon
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
                            {theme === 'light' && <LightModeIcon />}
                            {theme === 'dark' && <NightlightRoundIcon />}
                        </div>
                    </Tooltip>
                </div>
                <div className={styles['navbar__container__menu-container']}>
                    {AccountView()}
                </div>
            </div>
        </div>
    );

}

export default Navbar;