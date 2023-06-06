type UserRole = 'admin' | 'user';


interface RefreshTokenData {
    email: Email;
    exp?: number;
    iat?: number;
}


interface AccessTokenData extends RefreshTokenData {
    role: UserRole;
}

export {
    UserRole,
    RefreshTokenData,
    AccessTokenData,
};