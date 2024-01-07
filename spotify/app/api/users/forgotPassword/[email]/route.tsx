import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import { sendMail } from "@/helpers/mailer";
import { render } from '@react-email/render';
import OtpEmailTemplate from "@/app/templates/OtpEmailTemplate";

export async function GET(request: NextRequest, {params}: {params: {email: string}}){
    try {
        const { email } = params;

        // let's generate otp.
        var minm = 100000;
        var maxm = 999999;
        var otp =  String(Math.floor(Math.random() * (maxm - minm + 1)) + minm);

        var updatedUser = null;

        try {
            updatedUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    forgotPasswordToken: otp,
                    forgotTokenExpiry: new Date(Date.now() + 900000)
                },
            })
            
        } catch (error) {
            return NextResponse.json({
                error: " This email does not exist please provide valid credentials to reset your password."
            }, {status: 400})
        }

        if (!sendMail(
            'Fred Foo 👻 brightgoal@fastmail.com',
            updatedUser.email,
            'Your Password Reset OTP',
            render(<OtpEmailTemplate name={updatedUser.name} otp={otp}/>, {pretty: true})
        )){
            return NextResponse.json({
                error: "We are unable to send otp at this moment due to some problems please try again or check your email."
            }, {status: 400})
        }

        return NextResponse.json({
            message: "OTP sent successfully on your email please check your email. It will be valid only for 15 minutes.",
            success: true
        }, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 400})
    }
}