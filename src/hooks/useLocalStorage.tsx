'use client';

import { useState, useEffect } from "react";

interface LocalStorageData<T> {
    value: T;
    expiresAt: number;
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

    if (parsed && Date.now() < parsed.expiresAt) {
        return parsed.value;
    }

    return defaultValue;

}

function setLocalStorageValue(key: string, value: any, ttl: number) {
    window.localStorage.setItem(key, JSON.stringify({
        value,
        expiresAt: Date.now() + ttl
    }));
}

function useLocalStorage<T>(key: string, defaultValue: T, ttl: number = DEFAULT_TTL) {

    const [value, setValue] = useState<T>(getStorageValue<T>(key, defaultValue));

    useEffect(() => {

        if (!getStorageValue(key, undefined)) {
            setLocalStorageValue(key, defaultValue, ttl);
        }

    }, []);

    const updateValue = (newValue: T) => {
        setValue(newValue);
        setLocalStorageValue(key, newValue, ttl);
    }

    return [value, updateValue] as [T, (newValue: T) => void];
};

export default useLocalStorage;