'use client';

import { useState, useEffect } from "react";

interface LocalStorageData<T> {
    value: T;
    expiresAt?: number;
}

const DEFAULT_TTL = 60 * 60 * 1000;

function getStorageValue<T>(key: string, defaultValue: any) {

    if (typeof window === 'undefined') {
        return defaultValue;
    }

    const saved = window.localStorage.getItem(key);

    if (!saved) {
        return defaultValue;
    }

    const parsed = JSON.parse(saved) as LocalStorageData<T>;

    if (parsed && (!parsed.expiresAt || Date.now() < parsed.expiresAt)) {
        return parsed.value;
    }

    return defaultValue;

}

function setLocalStorageValue(key: string, value: any, ttl: number | undefined) {
    window.localStorage.setItem(key, JSON.stringify({
        value,
        expiresAt: ttl ? Date.now() + ttl : undefined
    }));
}

function useLocalStorage<T>(key: string, defaultValue: T, ttl: number | false = DEFAULT_TTL) {

    const [value, setValue] = useState<T>(getStorageValue<T>(key, defaultValue));

    useEffect(() => {

        if (!getStorageValue(key, undefined)) {
            setLocalStorageValue(key, defaultValue, ttl || undefined);
        }

    }, []);

    const updateValue = (newValue: T) => {
        setValue(newValue);
        setLocalStorageValue(key, newValue, ttl || undefined);
    }

    return [value, updateValue] as [T, (newValue: T) => void];
};

export default useLocalStorage;