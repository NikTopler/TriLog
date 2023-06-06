'use client';

import { useState, useEffect } from "react";

function getStorageValue(key: string, defaultValue: any) {

    if (typeof window === 'undefined') {
        return defaultValue;
    }

    const saved = window.localStorage.getItem(key);

    if (saved) {
        return JSON.parse(saved);
    }

    return defaultValue;

}

function useLocalStorage(key: string, defaultValue: any) {

    const [value, setValue] = useState(() => {
        return getStorageValue(key, defaultValue);
    });

    useEffect(() => {
        window.localStorage.setItem(key, JSON.stringify(value));
    }, [key, value]);

    return [value, setValue];
};

export default useLocalStorage;