import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { UserValidation } from "@/app/DataValidation/user";
import jwt from "jsonwebtoken";
import { sendMail } from "@/helpers/mailer";
import { render } from '@react-email/render';
import VerificationEmail from "@/app/templates/VerificationEmail";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // let's first validate the data.
        const validation = UserValidation.safeParse(body);

        if (!validation.success){
            return NextResponse.json({
                error: validation.error.format(),
            }, {status: 400});
        }

        const {name, email, password} = body;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (user){
            return NextResponse.json({
                error: "This email is already being used by another user please use a different email to create a new account."
            }, {status: 400})
        }
        
        // hashing the password.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        // let's create verification token.
        const verificationToken = await jwt.sign({
            name,
            email,
            hashedPassword
        }, process.env.TOKEN_SECRET, {expiresIn: "30d"})

        const newUser = await prisma.user.create({
                            data: {
                                name,
                                email,
                                password: hashedPassword,
                                verifyToken: verificationToken,
                                verifyTokenExpiry: new Date(Date.now() + 2592000000)
                            }
                        });

        // now send varification email to the user.
        sendMail(
            'Fred Foo 👻 brightgoal@fastmail.com',
            email,
            'Verify Spotify Account',
            render(<VerificationEmail verifyUrl={`${request.nextUrl}/${verificationToken}`}/>)
        )
                        
        return Response.json({
            message: "Woo account successfully created we sent and verification email please check the email and click on given link to verify your account.",
            success: true,
            savedUser: newUser
        }, {
            status: 200
        });

    } catch (error: any) {
        return Response.json({error: error.message}, {status: 500})
    }
}