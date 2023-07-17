'use client';

import { CSSProperties, useRef, useState } from "react";
import { LayoutProps } from "@/types";
import { Skeleton } from "@mui/material";
import { DropdownList, DropdownTabs } from "./templates";
import { useOutsideClick } from "@/hooks";
import styles from "./dropdown-layout.module.scss";

export interface DropdownItem {
    uid: string | number;
    label: string;
    active?: boolean;
    handleOnClick?: (...params: any) => void;
}

export interface TabsConfig {
    groupTitle?: string;
    tabs: {
        [key: string]: {
            uid: string;
            label: string;
            active: boolean;
            items: DropdownItem[]
        }
    }
}

export interface ListConfig {
    groupTitle?: string;
    list: DropdownItem[];
}

export interface CheckBoxConfig {
    items: DropdownItem[];
    handleChange?: (...params: any) => void;
}

export interface RadioConfig {
    items: DropdownItem[];
}

type DropdownTemplate = 'tab' | 'list' | 'radio' | 'checkbox';

type ConfigType<T extends DropdownTemplate> = T extends 'tab'
    ? TabsConfig
    : ListConfig;

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
};

function DropdownLayout<T extends DropdownTemplate>({ children, template, config, loading, error, style }: DropdownLayoutProps<T>) {

    const [open, setOpen] = useState<boolean>(false);

    const dropdownContainerRef = useRef(null);
    useOutsideClick(dropdownContainerRef, () => setOpen(false));

    const MainView = () => {

        if (loading || error) {
            return;
        }

        if (template === 'tab') {
            return (
                <DropdownTabs
                    setDropdownOpen={setOpen}
                    {...config as TabsConfig}
                />
            );
        }

        return (
            <DropdownList
                setDropdownOpen={setOpen}
                {...config as ListConfig}
            />
        );

    }

    return (
        <div className={styles['dropdown']}>
            <div onClick={() => setOpen(!open)}>
                {children}
            </div>
            <div ref={dropdownContainerRef}
                className={styles['dropdown-container']}
                style={style}
                data-active={open}>
                {loading && LoadingSkeleton(template)}
                {error && ErrorView()}
                <div className={styles['dropdown-container__content']}>
                    {MainView()}
                </div>
            </div>
        </div>
    );

}

function ErrorView() {

    return (
        <div>
            Error
        </div>
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

export default DropdownLayout;