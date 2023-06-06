import { isUrl } from "@/helpers";
import { getUserCookie } from "@/helpers/api";
import { AuthService } from "@/services";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { redirectUri } = Object.fromEntries(req.nextUrl.searchParams);
    const userCookie = getUserCookie();

    try {

        if (!isUrl(redirectUri)) {
            throw new Error('Invalid redirect URI');
        }

        await AuthService.logout(userCookie);
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