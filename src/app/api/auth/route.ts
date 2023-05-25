import { AuthTokenSchema, Email } from "@/schemas";
import { ApiMessages } from "@/services";
import UserService from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

    const { token } = Object.fromEntries(req.nextUrl.searchParams);

    try {

        if (!AuthTokenSchema.safeParse(token).success) {
            throw new Error(ApiMessages.INVALID_PARAMS);
        }

        const { email } = await UserService.verifiyVerificationToken(token);
        await UserService.updateUserVerificationToken(email as Email);

        // TODO: Create JWT token and save it in the cookie

        return NextResponse.redirect(new URL('/', req.nextUrl.origin));

    } catch (error: any) {

        // TODO: Redirect to login page with error message
        console.log(error.message);
        
        return NextResponse.redirect(new URL('/auth/login', req.nextUrl.origin));

    }

}