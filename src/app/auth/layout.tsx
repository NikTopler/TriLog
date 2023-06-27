'use client';

import { LayoutProps } from "@/types";
import { createContext, useState } from "react";
import "./auth.scss";

export const EmailAuthContext = createContext({
    email: "",
    setEmail: (email: string) => { }
});

function AuthLayout({ children }: LayoutProps) {

    const [email, setEmail] = useState<string>('');

    return (
        <main className="auth-container">
            <div className="auth-container__popup">
                <EmailAuthContext.Provider value={{ email, setEmail }}>
                    {children}
                </EmailAuthContext.Provider>
            </div>
        </main>
    );

}

export default AuthLayout;