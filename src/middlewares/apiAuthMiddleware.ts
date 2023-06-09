import getApiAuthPassword from "@/helpers/env/getApiAuthPassword";
import getApiAuthUsername from "@/helpers/env/getApiAuthUsername";
import { NextRequest } from "next/server";

function apiAuthMiddleware(req: NextRequest) {

    const path = req.nextUrl.pathname;

    if (path.startsWith('/api') && !path.startsWith('/api/auth')) {

        const basicAuth = req.headers.get('authorization');

        if (basicAuth) {

            const authValue = basicAuth.split(' ')[1]
            const [user, psw] = atob(authValue).split(':')

            if (getApiAuthUsername() === user && getApiAuthPassword() === psw) {
                return;
            }

        }

        throw new Error('Not authorized!');

    }

}

export default apiAuthMiddleware;