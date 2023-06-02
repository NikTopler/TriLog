interface GoogleAuthUserInfo {
    id: string;
    email: Email;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    locale: string;
}

export default GoogleAuthUserInfo;