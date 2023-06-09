import { ApiMessage } from "@/constants";
import { generateCode, generateToken, isEmail } from "@/helpers";
import { ApiResponse } from "@/types";
import AuthService from "@/services/AuthService";
import { UserService } from "@/services";
import { Users } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export interface LoginSuccessResponse {
    isVerified: boolean;
}

export async function POST(req: NextRequest) {

    const { recipient } = await req.json();

    try {

        if (!isEmail(recipient)) {
            throw new Error(ApiMessage.INVALID_EMAIL);
        }

        const { origin } = req.nextUrl;
        let user: Users | null = await UserService.getByEmail(recipient);

        if (!user || !user.isVerified) {
            const verificationCode = generateCode();
            if (!user) {
                user = await UserService.createThroughEmail(recipient, verificationCode);
            } else {
                await UserService.updateVerificationCode(recipient, verificationCode);
            }
            await AuthService.sendVerificationMail(recipient, verificationCode, false, origin);
        } else {
            const verificationToken = generateToken();
            await UserService.updateVerificationToken(recipient, verificationToken);
            await AuthService.sendVerificationMail(recipient, verificationToken, true, origin);
        }

        const res: ApiResponse<LoginSuccessResponse> = {
            success: true,
            message: ApiMessage.AUTH_VERIFICATION_LINK_SENT,
            data: {
                isVerified: user.isVerified
            }
        }

        return NextResponse.json(res, { status: 200 });

    } catch (error: any) {

        const res: ApiResponse<never> = {
            success: false,
            message: ApiMessage.AUTH_VERIFICATION_LINK_SENT_ERROR,
            errors: (error instanceof Error) ? error.message : error
        };

        return NextResponse.json(res, { status: 400 });

    }

}