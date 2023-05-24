import { isEmail, parseQueryStringToObject } from "@/helpers";
import AuthService from "@/services/AuthService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {

    const { recipient } = parseQueryStringToObject(await req.text());

    try {

        if (!isEmail(recipient)) {
            throw 'Invalid email';
        }

        await AuthService.sendVerificationMail(recipient);

        return NextResponse.json({
            message: 'Email verification link sent successfully'
        }, { status: 200 })

    } catch (error: any) {

        return NextResponse.json({
            message: error
        }, { status: 400 })

    }

}