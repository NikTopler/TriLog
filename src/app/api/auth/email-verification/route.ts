import { ApiResponse } from "@/interfaces";
import { ApiMessages } from "@/services";
import UserService from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, verificationCode } = await req.json();

    try {

        if (!email || !verificationCode) {
            throw new Error(ApiMessages.INVALID_PARAMS);
        }

        await UserService.verifyVerificationCode(email, verificationCode)
        await UserService.updateUserVerificationStatus(email);

        // TODO: Create JWT token and send it back to the client

        const res: ApiResponse<never> = {
            success: true,
            message: ApiMessages.EMAIL_VERIFIED
        }

        return NextResponse.json(res, { status: 200 });

    } catch (error: any) {

        const res: ApiResponse<never> = {
            success: false,
            message: ApiMessages.EMAIL_VERIFIED_ERROR,
            errors: error.message
        };

        return NextResponse.json(res, { status: 400 });

    }

}