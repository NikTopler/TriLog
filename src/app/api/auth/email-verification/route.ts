import { ApiMessage } from "@/constants";
import { ApiResponse } from "@/interfaces";
import { AuthService } from "@/services";
import UserService from "@/services/UserService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { email, verificationCode } = await req.json();

    try {

        if (!email || !verificationCode) {
            throw new Error(ApiMessage.INVALID_PARAMS);
        }

        await AuthService.verifyVerificationCode(email, verificationCode)
        await UserService.updateUserVerificationStatus(email);

        // TODO: Create JWT token and send it back to the client

        const res: ApiResponse<never> = {
            success: true,
            message: ApiMessage.EMAIL_VERIFIED
        }

        return NextResponse.json(res, { status: 200 });

    } catch (error: any) {

        const res: ApiResponse<never> = {
            success: false,
            message: ApiMessage.EMAIL_VERIFIED_ERROR,
            errors: error.message
        };

        return NextResponse.json(res, { status: 400 });

    }

}