'use client';

import { LayoutProps } from "@/types";
import { createContext, useEffect, useState } from "react";
import { useTranslationContext } from "@/providers";
import "./auth.scss";

export const EmailAuthContext = createContext({
    email: "",
    setEmail: (email: string) => { }
});

function AuthLayout({ children }: LayoutProps) {

    const [translationsLoading, lang, t, setLang] = useTranslationContext();

    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => setLoading(translationsLoading), [translationsLoading]);

    return (
        <main className="auth-container">
            <div className="auth-container__popup">
                <EmailAuthContext.Provider value={{ email, setEmail }}>
                    {loading && AuthSkeletonLoading()}
                    {!loading && children}
                </EmailAuthContext.Provider>
            </div>
        </main>
    );

}

function AuthSkeletonLoading() {
    return (
        <div>
            Loading ...
        </div>
    );
}

export default AuthLayout;