import { NextResponse, NextRequest } from "next/server";
import prisma from "@/prisma/client";
import nodemailer from "nodemailer";
import { sendMail } from "@/helpers/mailer";
import { render } from '@react-email/render';
import OtpEmailTemplate from "@/app/templates/OtpEmailTemplate";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest){
    try {
        const body = await request.json();
        
        const { email, otp, password } = body;

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (!user){
            return NextResponse.json({
                error: "Please provided valid email to reset your password provided the email does not exist."
            }, {status: 400});
        }

        // let's create ecrypt the password.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // now let's match up the otp. and is it's valid set the new password.
        if (user.forgotPasswordToken === otp && user.forgotTokenExpiry! > new Date(Date.now())){
            const updatedUser = await prisma.user.update({
                where: {
                    email: email,
                },
                data: {
                    password: hashedPassword,
                    forgotPasswordToken: "",
                    forgotTokenExpiry: null
                }
            })
        }
        else{
            return NextResponse.json({
                error: "Please provide an valid otp in order to reset password of your account given otp is an invalid one"
            }, {status: 400});
        }

        return NextResponse.json({
            message: "Your password is successfully updated you will be redirected to the login page now.",
            success: true
        }, {status: 200});
        
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {status: 400})
    }
}