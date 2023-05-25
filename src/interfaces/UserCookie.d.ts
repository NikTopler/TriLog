import { Email } from "@/schemas";

// TODO: Implement token type
interface UserCookieToken { }

// TODO: Implement preferences type
interface UserCookiePreferences { 
    theme: 'light' | 'dark';
}

interface UserCookie {
    authenticated: boolean;
    token: UserCookieToken | null;
    preferences: UserCookiePreferences;
}

export default UserCookie;