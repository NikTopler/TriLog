import { PATHS } from "@/constants";
import { apiGet, isSupportedLanguage } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { SupportedLanguage } from "@/schemas";
import { LayoutProps } from "@/types";
import { createContext, useContext, useEffect, useState } from "react";

type TranslationDataConfig = Record<string, string>;

type TranslationData = {
    [lang in SupportedLanguage]: TranslationDataConfig;
};

type TranslationContext = [
    loading: boolean,
    language: SupportedLanguage,
    translations: TranslationDataConfig,
    setLanguage: (lang: SupportedLanguage) => void
];

const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

const TranslationLocalStorage: TranslationData = {
    en: {},
    si: {}
}

const TranslationContext = createContext<TranslationContext>([
    false,
    DEFAULT_LANGUAGE,
    {},
    () => { }
]);

const useTranslationContext = () => useContext(TranslationContext);

// TODO: add a safeguard for localStorage data
function TranslationProvider({ children }: LayoutProps) {

    const [loading, setLoading] = useState<boolean>(true);
    const [langLS, setLangLS] = useLocalStorage('lang', DEFAULT_LANGUAGE, false);
    const [t, setT] = useState(TranslationLocalStorage);

    useEffect(() => {

        if (!isSupportedLanguage(langLS)) {
            setLangLS(DEFAULT_LANGUAGE);
            return;
        }

        if (Object.keys(t[langLS]).length > 0) {

            if (loading) {
                setLoading(false);
            }

            return;
        }

        setLoading(true);
        fetchTranslations();

    }, [langLS]);


    const fetchTranslations = () => {
        apiGet<TranslationData>(PATHS.api.translations.specific.replace(':id', langLS), {})
            .then((translations) => {

                setT({
                    ...t,
                    [langLS]: translations
                });

                loading && setLoading(false);
            })
            .catch((error) => console.error(error));
    }

    const changeLanguage = (lang: SupportedLanguage) => {

        setLoading(true);

        if (Object.keys(t[lang]).length > 0) {
            setLangLS(lang)
            return;
        }

        setTimeout(() => setLangLS(lang), 200);
    }

    return (
        <TranslationContext.Provider value={[
            loading,
            langLS,
            t[langLS],
            changeLanguage
        ]}>
            {children}
        </TranslationContext.Provider>
    );

}

export {
    TranslationProvider,
    useTranslationContext
}