const PATHS = {
    AUTH: {
        SOCIAL: {
            GOOGLE: {
                LOGIN: '/api/auth/social/google',
                CALLBACK: '/api/auth/social/google/callback',
            },
            FACEBOOK: {
                LOGIN: '/api/auth/social/facebook',
                CALLBACK: '/api/auth/social/facebook/callback',
            },
            GITHUB: {
                LOGIN: '/api/auth/social/github',
                CALLBACK: '/api/auth/social/github/callback',
            }
        },
        LOGIN: '/api/auth/login',
        EMAIL_VERIFICATION: '/api/auth/email-verification',
    },
};

export default PATHS;