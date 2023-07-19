'use client';

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Tooltip } from "@mui/joy";
import LightModeIcon from '@mui/icons-material/LightMode';
import NightlightRoundIcon from '@mui/icons-material/NightlightRound';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import DropdownLayout, { ListConfig, TabsConfig } from "@/components/layouts/DropdownLayout/DropdownLayout";
import { CustomTextBox, RegularButton } from "@/components/inputs";
import { TriathlonCategories, TriathlonTypes } from "@prisma/client";
import { StateObject } from "@/app/(home)/HomeLayout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthContext, useDataContext, useTranslationContext } from "@/providers";
import { Skeleton } from "@/components/ui/skeleton";
import { PATHS } from "@/constants";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { changeFirstLetter } from "@/helpers";
import styles from "./navbar.module.scss";
import { UsePageOpen, usePage } from "@/hooks";

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

function Navbar() {

    const page = usePage();
    const pathname = usePathname();

    const auth = useAuthContext();
    const [translationsLoading, lang, t, setLang] = useTranslationContext();
    const { triathlonCategories, triathlonTypes } = useDataContext();

    const [search, setSearch] = useState<string>("");
    const [searchFocused, setSearchFocused] = useState<boolean>(false);
    const [theme, setTheme] = useState<'light' | 'dark'>('light');
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

        if (translationsLoading) {
            return;
        }

        if (!triathlonCategories.loading && triathlonCategories.data) {
            setCategories({
                data: parseTriathlonCategories(triathlonCategories.data, page.open),
                loading: false,
                errors: null
            });
        }

        if (!triathlonTypes.loading && triathlonTypes.data) {
            setTypes({
                data: parseTriathlonTypesToDropdownItem(triathlonTypes.data, page.open),
                loading: false,
                errors: null
            });
        }

    }, [translationsLoading, triathlonCategories, triathlonTypes]);

    const handleInputChange = (value: string) => {
        setSearch(value);
    }

    const parseTriathlonCategories = (triathlonCategories: TriathlonCategories[], open: UsePageOpen): TabsConfig => {

        const obj: TabsConfig = {
            groupTitle: changeFirstLetter(t['age_group']),
            tabs: {
                male: {
                    uid: 'male',
                    label: changeFirstLetter(t['male_plural']),
                    active: true,
                    items: []
                },
                female: {
                    uid: 'female',
                    label: changeFirstLetter(t['female_plural']),
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
                    uid: ID,
                    label: name + ' (' + acronym + ')',
                    handleOnClick() {
                        open(PATHS.triathlons.categories.specific.replace(':id', acronym))
                    }
                }
            );

        });

        return obj;

    }

    const parseTriathlonTypesToDropdownItem = (triathlonTypes: TriathlonTypes[], open: UsePageOpen): ListConfig => {

        return {
            groupTitle: changeFirstLetter(t['type_plural']),
            list: triathlonTypes.map(({ ID, name }) => ({
                uid: ID,
                label: name,
                handleOnClick() {
                    open(PATHS.triathlons.types.specific.replace(':id', name.replace(' ', '-').toLowerCase()))
                },
            }))
        }

    }

    const AccountView = () => {

        if (auth.authenticated) {
            return (
                <Tooltip title={changeFirstLetter(t['account'])}>
                    <Avatar className={styles['navbar__container__menu-container__image-container']} data-image onClick={auth.logout}>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback />
                    </Avatar>
                </Tooltip>
            );
        }

        return (
            <RegularButton
                text={changeFirstLetter(t['login'])}
                variant="default"
                className="btn tertiary solid"
                handleOnClick={() => page.open(PATHS.auth.login)}
                style={{
                    color: '#fff'
                }}
            />
        );

    }

    return (
        <div className={styles['navbar__container']}>
            <div className={styles['navbar__container__logo-container']}>
                <span onClick={() => page.open(PATHS.home)}>TriLog</span>
            </div>
            {translationsLoading && <SkeletonLoaderView />}
            {!translationsLoading && (
                <>
                    <div className={styles['navbar__container__content-container']}>
                        <DropdownLayout
                            template="tab"
                            loading={categories.loading}
                            error={categories.errors}
                            config={categories.data}
                            style={triathlonCategoriesStyle}>
                            <div className={styles['navbar__container__content-container-container__item']} data-active={new RegExp(PATHS.triathlons.categories.all + '/*').test(pathname)}>
                                <RegularButton
                                    text={changeFirstLetter(t['category_plural'])}
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
                            <div className={styles['navbar__container__content-container-container__item']} data-active={new RegExp(PATHS.triathlons.types.all + '/*').test(pathname)}>
                                <RegularButton
                                    text={changeFirstLetter(t['type_plural'])}
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
                                placeholder={changeFirstLetter(t['search'])}
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
                            <Tooltip title={theme === 'light' ? changeFirstLetter(t['dark_mode']) : changeFirstLetter(t['light_mode'])}>
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
                </>
            )}
        </div>
    );

};

// TODO: Move style to .scss file
function SkeletonLoaderView() {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '6rem 6rem 1fr 2.25rem 6rem',
            gap: '1rem',
            padding: '0 1rem',
            alignItems: 'center',
            height: '100%'
        }}>
            <Skeleton className="h-9" style={{
                gridColumn: '1/2'
            }} />
            <Skeleton className="h-9" style={{
                gridColumn: '2/3'
            }} />
            <Skeleton className="h-9" style={{
                gridColumn: '3/4'
            }} />
            <Skeleton className="h-9 rounded-full" style={{
                gridColumn: '4/5'
            }} />
            <Skeleton className="h-9" style={{
                gridColumn: '5/6'
            }} />
        </div>
    );
}

export default Navbar;