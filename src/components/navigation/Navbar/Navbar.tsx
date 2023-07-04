'use client';

import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Tooltip } from "@mui/joy";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CustomTextBox, RegularButton } from "@/components/inputs";
import DropdownLayout, { ListConfig, TabsConfig } from "@/components/layouts/DropdownLayout/DropdownLayout";
import { TriathlonCategories, TriathlonTypes } from "@prisma/client";
import { StateObject } from "@/app/(home)/HomeLayout";
import { useAuthContext } from "@/providers";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import styles from "./navbar.module.scss";
import { Skeleton } from "@/components/ui/skeleton";

const triathlonCategoriesStyle = {
    width: '300px',
    height: 'auto',
    top: 'calc(100% - 10px)',
    left: '0'
}

const triathlonTypesStyle = {
    width: '200px',
    height: 'auto',
    top: 'calc(100% - 10px)',
    left: '0'
}

export interface TriathlonCategoriesRef {
    setCategories: (category: any) => void;
    setTypes: (types: any) => void;
}

const Navbar = forwardRef(({ }, ref) => {

    const router = useRouter();
    const pathname = usePathname();

    const auth = useAuthContext();
    const [search, setSearch] = useState<string>('');
    const [searchFocused, setSearchFocused] = useState<boolean>(false);

    // TODO: Implement theme change
    // TODO: Remove this temporary state
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
    const [user, setUser] = useState<any>(null);

    const [categories, setCategories] = useState<StateObject<TabsConfig>>({
        data: { tabs: {} },
        loading: true,
        errors: null
    });

    const [types, setTypes] = useState<StateObject<ListConfig>>({
        data: { list: [] },
        loading: true,
        errors: null
    });

    useEffect(() => {
        console.log('isLoading', auth.loading);
        console.log('is authenticated: ', auth.authenticated);
    }, []);

    useImperativeHandle(ref, () => ({
        setCategories: ({ data, loading, errors }: StateObject<TriathlonCategories[]>) => {
            setCategories({
                data: parseTriathlonCategories(data),
                loading,
                errors
            });
        },
        setTypes: ({ data, loading, errors }: StateObject<TriathlonTypes[]>) => {
            setTypes({
                data: parseTriathlonTypes(data),
                loading,
                errors
            });
        }
    }));

    const handleInputChange = (value: string) => {
        setSearch(value);
    }

    const handleCategoriesTabChange = (tab: string) => {

        const tempObj = { ...categories.data };

        Object.keys(tempObj.tabs).forEach((key: string) => {
            tempObj.tabs[key].active = false;
        });

        tempObj.tabs[tab].active = true;

        setCategories(prev => ({
            ...prev,
            data: tempObj
        }));
    }

    const AccountView = () => {

        if (auth.loading) {
            return (
                <Skeleton className="h-[40px] w-[40px] rounded-full" style={{ backgroundColor: '#ced4da' }} />
            );
        }

        if (auth.authenticated) {
            return (
                <Tooltip title="Profile">
                    <Avatar className={styles['navbar__container__menu-container__image-container']} data-image onClick={auth.logout}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback></AvatarFallback>
                    </Avatar>
                </Tooltip>
            );
        }

        return (
            <RegularButton
                text="Login"
                variant="default"
                className="btn tertiary solid"
                handleOnClick={() => router.push('/auth/login')}
                style={{
                    color: '#fff'
                }}
            />
        );

    }

    return (
        <div className={styles['navbar__container']}>
            <div className={styles['navbar__container__logo-container']}>
                <span onClick={() => router.push('/')}>TriLog</span>
            </div>
            <div className={styles['navbar__container__content-container']}>
                <DropdownLayout
                    template="tab"
                    loading={categories.loading}
                    error={categories.errors}
                    config={categories.data}
                    onTabChange={handleCategoriesTabChange}
                    style={triathlonCategoriesStyle}>
                    <div className={styles['navbar__container__content-container-container__item']} data-active={new RegExp('/triathlons/categories/*').test(pathname)}>
                        <RegularButton
                            text="Categories"
                            variant="ghost"
                            endDecorator={<KeyboardArrowDownIcon sx={{ fontSize: 'medium' }} />}
                            className="btn secondary plain"
                        />
                        <div className={styles['navbar__container__content-container-container__item-selector']} />
                    </div>
                </DropdownLayout>
                <DropdownLayout
                    template="list"
                    loading={types.loading}
                    error={types.errors}
                    config={types.data}
                    style={triathlonTypesStyle}>
                    <div className={styles['navbar__container__content-container-container__item']} data-active={new RegExp('/triathlons/types/*').test(pathname)}>
                        <RegularButton
                            text="Types"
                            variant="ghost"
                            endDecorator={<KeyboardArrowDownIcon sx={{ fontSize: 'medium' }} />}
                            className="btn secondary plain"
                        />
                        <div className={styles['navbar__container__content-container-container__item-selector']} />
                    </div>
                </DropdownLayout>
            </div>
            <div className={styles['navbar__container__menu']}>
                <div className={styles['navbar__container__menu-search']}>
                    {/* TODO: Move into styles */}
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

});

function parseTriathlonCategories(triathlonCategories: TriathlonCategories[]): TabsConfig {

    const obj: TabsConfig = {
        groupTitle: 'Age group',
        tabs: {
            male: {
                name: 'Male',
                active: true,
                items: []
            },
            female: {
                name: 'Female',
                active: false,
                items: []
            }
        }
    }

    triathlonCategories.forEach(({ ID, name, acronym, gender }) => {

        if (!gender) {
            return;
        }

        obj.tabs[gender].items.push(
            {
                name: name + ' (' + acronym + ')',
                path: '/triathlons/categories/' + ID,
                pathAs: '/triathlons/categories/' + acronym
            }
        );

    });

    return obj;

}

function parseTriathlonTypes(triathlonTypes: TriathlonTypes[]): ListConfig {

    return {
        groupTitle: 'Competitions',
        list: triathlonTypes.map(({ ID, name }) => ({
            name,
            path: '/triathlons/types/' + ID,
            pathAs: '/triathlons/types/' + name.replace(' ', '-').toLowerCase()
        }))
    }

}

Navbar.displayName = 'Navbar';

export default Navbar;