'use client';

import { LoginSuccessResponse } from "@/app/api/auth/login/route";
import { AUTH_COOKIE_KEY, PATHS } from "@/constants";
import { apiPost } from "@/helpers";
import { LayoutProps } from "@/types"
import { Email, Url, isAuthCookie } from "@/schemas";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"
import { useCookies } from "react-cookie";

export type SocialLoginProvider = 'google' | 'facebook' | 'github';

interface AuthContextProps {
    loading: boolean;
    authenticated: boolean;
    login: (email: Email) => Promise<void>;
    emailVerification: (email: Email, code: string) => Promise<void>;
    socialLogin: (provider: SocialLoginProvider) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    loading: true,
    authenticated: false,
    login: async () => { },
    emailVerification: async () => { },
    socialLogin: () => { },
    logout: () => { }
});

const useAuthContext = () => useContext(AuthContext);

function AuthProvider({ children }: LayoutProps) {

    const router = useRouter();

    const [cookies, setCookie, removeCookie] = useCookies();
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const authCookie = cookies[AUTH_COOKIE_KEY];

        if (isAuthCookie(authCookie)) {

            const isUserAuthenticated = authCookie.authenticated;

            if (isUserAuthenticated !== authenticated) {
                setAuthenticated(isUserAuthenticated);
            }

            setAuthenticated(cookies[AUTH_COOKIE_KEY].authenticated);
        }

        setLoading(false);

    }, []);

    const login = (email: Email) => {
        return apiPost<LoginSuccessResponse>(PATHS.api.auth.login, { recipient: email })
            .then((res) => {

                if (!res) {
                    throw new Error("There has been an error. Please try again later.");
                }

                if (res.isVerified) {
                    router.push(PATHS.auth.verificationLinkSent);
                } else {
                    router.push(PATHS.auth.emailVerification + '?email=' + email);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    const emailVerification = (email: Email, code: string) => {
        return apiPost(PATHS.api.auth.emailVerification, { email, verificationCode: code })
            .then(() => {
                setAuthenticated(true);
                router.push(PATHS.home);
            })
            .catch((err) => console.log(err));
    }

    const socialLogin = (provider: SocialLoginProvider) => {
        router.push(PATHS.api.auth.social[provider].login);
    }

    const logout = (redirectUri?: Url) => {
        router.push(PATHS.api.auth.logout + '?redirectUri=' + (redirectUri?.url || window.location.origin + PATHS.auth.login));
    }

    return (
        <AuthContext.Provider value={{
            loading,
            authenticated,
            login,
            emailVerification,
            socialLogin,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );

}

export {
    useAuthContext,
    AuthProvider
}