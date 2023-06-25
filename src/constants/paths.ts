const PATHS = {
    home: '/',
    triathlons: {
        all: '/triathlons',
        leaderboards: '/triathlons/leaderboards',
        types: {
            all: '/triathlons/types',
            specific: '/triathlons/types/:id'
        },
        categories: {
            all: '/triathlons/categories',
            specific: '/triathlons/categories/:id'
        }
    },
    countries: {
        all: '/countries'
    },
    states: {
        all: '/states'
    },
    cities: {
        all: '/cities'
    },
    athletes: {
        all: '/athletes'
    },
    api: {
        athletes: {
            all: '/api/athletes',
            specific: '/api/athletes/:id'
        },
        triathlons: {
            all: '/api/triathlons',
            specific: '/api/triathlons/:id',
            categories: {
                all: '/api/triathlons/categories',
                specific: '/api/triathlons/categories/:id'
            },
            types: {
                all: '/api/triathlons/types',
                specific: '/api/triathlons/types/:id'
            }
        },
        organizations: {
            all: '/api/organizations',
            specific: '/api/organizations/:id'
        },
        auth: {
            social: {
                google: {
                    login: '/api/auth/social/google',
                    callback: '/api/auth/social/google/callback',
                },
                facebook: {
                    login: '/api/auth/social/facebook',
                    callback: '/api/auth/social/facebook/callback',
                },
                github: {
                    login: '/api/auth/social/github',
                    callback: '/api/auth/social/github/callback',
                }
            },
            login: '/api/auth/login',
            logout: '/api/auth/logout',
            emailVerification: '/api/auth/email-verification',
        }
    },
    auth: {
        login: '/auth/login',
        emailVerification: '/auth/email-verification',
        verificationLinkSent: '/auth/verification-link-sent',
    }
};


export default Object.freeze(PATHS);