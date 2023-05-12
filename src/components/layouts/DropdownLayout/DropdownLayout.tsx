'use client';

import { Dispatch, SetStateAction, useState } from "react";
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

type DropdownTemplate = 'tab' | 'list';

type ConfigType<T extends DropdownTemplate> = T extends 'tab' ? TabsConfig : T extends 'list' ? string : never;

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
                        {(!loading && !error && template === 'tab') &&
                            <TabsTemplate
                                setDropdownOpen={setOpen}
                                setTabsConfig={onTabChange}
                                tabs={(config as TabsConfig).tabs}
                                groupTitle={(config as TabsConfig).groupTitle}
                            />
                        }
                    </div>
                )}
            </div>
        </ClickAwayListener>
    );

}


// TODO: Implement better loading skeleton
function LoadingSkeleton(template: DropdownTemplate) {

    if (template === 'tab') {

        return (
            <div style={{ padding: '1rem' }}>
                <header>
                    <Skeleton
                        variant="rounded"
                        width={"calc(100% - 2.5rem)"}
                        style={{
                            margin: 'auto',
                            marginBottom: '0.5rem',
                            padding: '0.75rem'
                        }}
                    />
                </header>
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                        marginBottom: '0.5rem',
                    }}
                />
                <Skeleton
                    variant="rounded"
                    width={"calc(100% - 1rem)"}
                    style={{
                        margin: 'auto',
                    }}
                />
            </div>
        );

    }

}

interface TabsTemplateProps extends TabsConfig {
    setTabsConfig?: (tab: string) => void;
    setDropdownOpen: Dispatch<SetStateAction<boolean>>;
}

function TabsTemplate({ tabs, groupTitle, setTabsConfig, setDropdownOpen }: TabsTemplateProps) {

    const tabNames = Object.keys(tabs);
    const activeTab = Object.keys(tabs).find((key: string) => tabs[key].active);

    return (
        <div className={styles['tab-template']}>
            <header className={styles['tab-template__header']}>
                <div className={styles['tab-template__header__tabs-container']}>
                    {tabNames.map((key: any, idx: number) => (
                        <div
                            key={idx}
                            onClick={() => {
                                if (setTabsConfig) {
                                    setTabsConfig(key);
                                }
                            }}
                            className={styles['tab-template__header__tabs-container--tab-container']}
                            data-active={tabs[key].active}>
                            <span>{tabs[key].name}</span>
                        </div>
                    ))}
                </div>
            </header>
            <div className={styles['tab-template--main']}>
                {groupTitle && (
                    <section className={styles['tab-template--main__group-title']}>
                        <span>
                            {groupTitle}
                        </span>
                    </section>
                )}
                <div className={styles['tab-template--main__buttons-container']}>
                    {tabs[activeTab as string].items.map((item: any, idx: number) => (
                        <Link
                            key={idx}
                            className={styles['tab-template--main__buttons-container--button-container']}
                            href={item.path}
                            as={item.pathAs || item.path}
                            onClick={() => setDropdownOpen(false)}>
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );

}


export default DropdownLayout;