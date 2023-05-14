'use client';

import { CSSProperties, Dispatch, SetStateAction, useState } from "react";
import { LayoutProps } from "@/interfaces";
import { ClickAwayListener, Skeleton } from "@mui/material";
import Link from "next/link";
import styles from "./dropdown-layout.module.scss";

interface TabsConfigItem {
    name: string;
    path: string;
    pathAs?: string;
}

export interface TabsConfig {
    groupTitle?: string;
    tabs: {
        [key: string]: {
            name: string;
            active: boolean;
            items: TabsConfigItem[]
        }
    }
}

export interface ListConfig {
    groupTitle?: string;
    list: TabsConfigItem[];
}

type DropdownTemplate = 'tab' | 'list';

type ConfigType<T extends DropdownTemplate> = T extends 'tab' ? TabsConfig : T extends 'list' ? ListConfig : never;

type DropdownLayoutProps<T extends DropdownTemplate> = Omit<LayoutProps, 'style'> & {
    style?: {
        width?: string;
        height?: string;
        top?: string;
        left?: string;
        right?: string;
        bottom?: string;
    };
    template: T;
    config: ConfigType<T>;
    loading: boolean;
    error: any; // TODO: Implement error handling
    onTabChange?: (tab: string) => void;
};

function DropdownLayout<T extends DropdownTemplate>({ children, template, config, loading, error, onTabChange, style }: DropdownLayoutProps<T>) {

    const [open, setOpen] = useState<boolean>(false);

    const MainView = () => {

        if (loading || error) {
            return;
        }

        if (template === 'tab') {

            return (
                <TabsTemplate
                    setDropdownOpen={setOpen}
                    setTabsConfig={onTabChange}
                    tabs={(config as TabsConfig).tabs}
                    groupTitle={(config as TabsConfig).groupTitle}
                />
            );

        }

        return (
            <ListTemplate
                setDropdownOpen={setOpen}
                list={(config as ListConfig).list}
                groupTitle={(config as ListConfig).groupTitle}
            />
        );

    }

    return (
        <ClickAwayListener onClickAway={() => setOpen(false)}>
            <div className={styles['dropdown']}>
                <div onClick={() => setOpen(!open)}>
                    {children}
                </div>
                {open && (
                    <div className={styles['dropdown-container']} style={style}>
                        {loading && LoadingSkeleton(template)}
                        {error && <div>Error</div>}
                        <div className={styles['dropdown-container__content']}>
                            {MainView()}
                        </div>
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );

}

// TODO: Implement better loading skeleton
function LoadingSkeleton(template: DropdownTemplate) {

    const tabContainerStyle: CSSProperties = {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 'auto',
        marginBottom: '0.5rem'
    }

    const tabStyle: CSSProperties = {
        width: 'calc(33% - 0.25rem)',
        height: '2rem',
    }

    const groupTitleStyle: CSSProperties = {
        width: '100%',
        height: '1.5rem',
        margin: 'auto',
        marginBottom: '0.5rem'
    }

    const buttonStyle: CSSProperties = {
        width: '100%',
        height: '3rem',
        margin: 'auto',
        marginBottom: '0.5rem',
    }

    return (
        <div style={{ padding: '1rem' }}>
            {template === 'tab' && (
                <header style={tabContainerStyle}>
                    <Skeleton
                        variant="rounded"
                        style={tabStyle}
                    />
                    <Skeleton
                        variant="rounded"
                        style={tabStyle}
                    />
                    <Skeleton
                        variant="rounded"
                        style={tabStyle}
                    />
                </header>
            )}
            <div>
                <Skeleton
                    variant="rounded"
                    style={groupTitleStyle}
                />
                <Skeleton
                    variant="rounded"
                    style={buttonStyle}
                />
                <Skeleton
                    variant="rounded"
                    style={buttonStyle}
                />
                <Skeleton
                    variant="rounded"
                    style={{
                        ...buttonStyle,
                        marginBottom: '0'
                    }}
                />
            </div>
        </div>
    );

}

interface TabsTemplateProps extends TabsConfig {
    setTabsConfig?: (tab: string) => void;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

function TabsTemplate({ tabs, groupTitle, setTabsConfig, setDropdownOpen }: TabsTemplateProps) {

    const tabNames = Object.keys(tabs);
    const activeTab = Object.keys(tabs).find((key: string) => tabs[key].active);

    return (
        <>
            <header className={styles['dropdown-container__content__header']}>
                <div className={styles['dropdown-container__content__header__tabs-container']}>
                    {tabNames.map((key: any, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => {
                                if (setTabsConfig) {
                                    setTabsConfig(key);
                                }
                            }}
                            className={styles['dropdown-container__content__header__tabs-container--tab-container']}
                            data-active={tabs[key].active}>
                            <span>{tabs[key].name}</span>
                        </div>
                    ))}
                </div>
            </header>
            <div className={styles['dropdown-container__content--main']}>
                {groupTitle && (
                    <section className={styles['dropdown-container__content--main__group-title']}>
                        <span>
                            {groupTitle}
                        </span>
                    </section>
                )}
                <div className={styles['dropdown-container__content--main__buttons-container']}>
                    {tabs[activeTab as string].items.map((item: any, idx: number) => (
                        <Link
                            key={idx}
                            className={styles['dropdown-container__content--main__buttons-container--button-container']}
                            href={item.path}
                            as={item.pathAs || item.path}
                            onClick={() => setDropdownOpen(false)}>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );

}

interface ListTemplateProps extends ListConfig {
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

function ListTemplate({ groupTitle, list, setDropdownOpen }: ListTemplateProps) {

    return (
        <div className={styles['dropdown-container__content--main']}>
            {groupTitle && (
                <section className={styles['dropdown-container__content--main__group-title']}>
                    <span>
                        {groupTitle}
                    </span>
                </section>
            )}
            <div className={styles['dropdown-container__content--main__buttons-container']}>
                {list.map((item: any, idx: number) => (
                    <Link
                        key={idx}
                        className={styles['dropdown-container__content--main__buttons-container--button-container']}
                        href={item.path}
                        as={item.pathAs || item.path}
                        onClick={() => setDropdownOpen(false)}>
                        <span>{item.name}</span>
                    </Link>
                ))}
            </div>
        </div>
    );

}

export default DropdownLayout;