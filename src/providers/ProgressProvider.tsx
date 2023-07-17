import { LayoutProps } from "@/types";
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";

interface ProgressContextPendingItem {
    key: string;
    weight: number;
    loading: boolean;
}

interface ProgressContextProps {
    value: number | null;
    pendingItems: ProgressContextPendingItem[];
    setPendingItems: Dispatch<SetStateAction<ProgressContextPendingItem[]>>;
    add: (items: ProgressContextPendingItem) => void;
    removeLoading: (key: string) => void;
}

const ProgressContext = createContext<ProgressContextProps>({
    value: null,
    pendingItems: [],
    setPendingItems: () => { },
    add: () => { },
    removeLoading: () => { },
});

const useProgressContext = () => useContext(ProgressContext);

const defaultPendingItems = [
    {
        key: 'initial',
        weight: 1,
        loading: false
    },
    {
        key: 'page-visibility',
        weight: 8,
        loading: true
    }
];

function ProgressProvider({ children }: LayoutProps) {

    const [pendingItems, setPendingItems] = useState<ProgressContextProps['pendingItems']>(defaultPendingItems);

    useEffect(() => removeLoading('page-visibility'), []);

    useEffect(() => {

        if (pendingItems.length === 0) {
            return;
        }

        if (pendingItems.every(({ loading }) => !loading)) {
            setPendingItems([]);
        }

    }, [pendingItems]);

    const add = (item: ProgressContextPendingItem) => {

        setPendingItems(prev => {

            if (prev.find(p => p.key === item.key)) {
                return prev;
            }

            return [
                ...prev,
                item
            ];

        });

    }

    const removeLoading = (key: string) => {

        setPendingItems(prev => prev.map(p => {

            if (p.key === key) {
                return {
                    ...p,
                    loading: false
                };
            }

            return p;

        }));

    }

    const calculateValue = () => {

        if (pendingItems.length === 0) {
            return null;
        }

        let totalWeight = 0;
        let completedWeight = 0;

        for (const item of pendingItems) {
            totalWeight += item.weight;

            if (!item.loading) {
                completedWeight += item.weight;
            }
        }

        const calculatedValue = (completedWeight / totalWeight) * 100;
        return Math.min(Math.max(calculatedValue, 0), 100);
    }

    return (
        <ProgressContext.Provider value={{
            value: calculateValue(),
            pendingItems,
            setPendingItems,
            add,
            removeLoading
        }}>
            {children}
        </ProgressContext.Provider>
    );
};

export {
    ProgressProvider,
    useProgressContext
}
