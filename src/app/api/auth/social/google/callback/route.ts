import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { code } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!code) {
            throw new Error("Did not receive code from Google", {
                cause: "User did not grant access to their Google account"
            });
        }

        const { tokens: { id_token, access_token } } = await AuthService.oauth2Client.getToken(code);

        if (!id_token || !access_token) {
            throw new Error("Did not receive tokens from Google", {
                cause: "User did not grant access to their Google account"
            });
        }

        const {
            id,
            email,
            picture,
        } = (await AuthService.getGoogleUserData(id_token, access_token));

        let user = await UserService.getByEmail(email);

        // TODO: Upload profile image to server

        if (user) {

            if (!user.googleID) {

                await UserService.update(email, {
                    isVerified: true,
                    profileImageUrl: picture,
                    googleID: id
                });

            }

        } else {

            user = await UserService.createThroughSocial(email, {
                profileImageUrl: picture,
                googleID: id
            });

        }

        // TODO: Create JWT token and save it in the cookie

        return NextResponse.json(user);

    } catch (error: any) {

        console.log(error);

        // TODO: Redirect to login page with error message
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));
    }

}