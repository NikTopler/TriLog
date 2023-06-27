'use client';

import { LoginSuccessResponse } from "@/app/api/auth/login/route";
import { USER_AUTH_COOKIE_KEY, USER_AUTH_LOCAL_STORAGE_KEY } from "@/constants";
import { apiPost } from "@/helpers";
import { useLocalStorage } from "@/hooks";
import { LayoutProps } from "@/types"
import { Email, Url } from "@/schemas";
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
    const [userAuth, setUserAuth] = useLocalStorage(USER_AUTH_LOCAL_STORAGE_KEY, {
        authenticated: false,
        accessToken: null,
        refreshToken: null
    });

    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(userAuth.authenticated);

    useEffect(() => {

        if (cookies[USER_AUTH_COOKIE_KEY]) {
            setUserAuth(cookies[USER_AUTH_COOKIE_KEY]);
            setAuthenticated(cookies[USER_AUTH_COOKIE_KEY].authenticated);
        }

        setLoading(false);

    }, []);

    useEffect(() => {

        if (authenticated) {
            console.log('user logged in');
        } else {
            console.log('not authenticated');
        }

    }, [authenticated]);

    const login = (email: Email) => {
        return apiPost<LoginSuccessResponse>('/api/auth/login', { recipient: email })
            .then((res) => {

                if (!res) {
                    throw new Error("There has been an error. Please try again later.");
                }

                if (res.isVerified) {
                    router.push('/auth/verification-link-sent');
                } else {
                    router.push('/auth/email-verification?email=' + email);
                }

            })
            .catch((err) => {
                console.log(err);
            });
    }

    const emailVerification = (email: Email, code: string) => {
        return apiPost('/api/auth/email-verification', { email, verificationCode: code })
            .then(() => {
                setAuthenticated(true);
                router.push('/');
            })
            .catch((err) => console.log(err));
    }

    const socialLogin = (provider: SocialLoginProvider) => {
        router.push('/api/auth/social/' + provider);
    }

    const logout = (redirectUri?: Url) => {
        router.push('/api/auth/logout?redirectUri=' + (redirectUri?.url || window.location.origin + '/auth/login'));
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

export { useAuthContext, AuthProvider }