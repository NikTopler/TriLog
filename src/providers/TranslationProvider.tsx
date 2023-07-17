import { createQueryString, isSupportedLanguage } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { SupportedLanguage } from "@/schemas";
import { LayoutProps } from "@/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

function TranslationProvider({ children }: LayoutProps) {

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [t, setT] = useState(TranslationLocalStorage);
    const [langLS, setLangLS] = useLocalStorage('lang', DEFAULT_LANGUAGE, false);

    useEffect(() => {

        const { lang } = Object.fromEntries(searchParams);
        if (isSupportedLanguage(lang) && lang !== langLS) {
            setLangLS(lang);
        } else {
            router.push(pathname + '?' + createQueryString(searchParams, { lang: langLS }));
        }

        Promise.all([
            import("../translations/en/index"),
            import("../translations/si/index"),
        ])
            .then(([en, si]) => {
                setT({
                    en: en.default,
                    si: si.default
                });
                setLoading(false);
            })
            .catch((error) => console.log(error));


    }, []);

    useEffect(() => router.push(pathname + '?' + createQueryString(searchParams, { lang: langLS })), [langLS])

    return (
        <TranslationContext.Provider value={[
            loading,
            langLS,
            t[langLS],
            setLangLS
        ]}>
            {children}
        </TranslationContext.Provider>
    );

}

export {
    TranslationProvider,
    useTranslationContext
}