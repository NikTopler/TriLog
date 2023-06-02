import { NextResponse } from "next/server";
import { AuthService } from "@/services";

export async function GET() {

    const url = AuthService.oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email',
        ],
        prompt: 'consent',
    });

    return NextResponse.redirect(url);

}