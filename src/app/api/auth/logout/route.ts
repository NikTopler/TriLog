import { isUrl } from "@/helpers";
import { getAuthCookie } from "@/helpers/api";
import { AuthService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { redirectUri } = Object.fromEntries(req.nextUrl.searchParams);
    const authCookie = getAuthCookie();

    try {

        if (!isUrl(redirectUri)) {
            throw new Error('Invalid redirect URI');
        }

        await AuthService.logout(authCookie);
        return NextResponse.redirect(redirectUri);

    } catch (error: any) {

        // TODO: redirect to error page

        return NextResponse.json({
            success: false,
            message: 'Logged out failed',
            error: error.message,
        });

    }

}