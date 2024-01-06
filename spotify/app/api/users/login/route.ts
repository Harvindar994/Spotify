import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { LoginUserValidation } from "@/app/DataValidation/user";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        // let's first validate the data.
        const validation = LoginUserValidation.safeParse(body);

        if (!validation.success){
            return NextResponse.json({
                error: validation.error.format(),
            }, {status: 400});
        }

        const {email, password} = body;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (!user){
            return NextResponse.json({
                error: " This user does not exist please provide valid credentials."
            }, {status: 400})
        }

        // now let's check fro the password.
        const isPasswordValid = await bcryptjs.compare(password, user.password);

        if (!isPasswordValid){
            return NextResponse.json({
                error: "Given password is an invalid password please provide a correct password to login into your account."
            }, {status: 400})
        }

        // let's create token data.
        const tokenData = {
            id: user.id,
            email: user.email,
        }

        //  let's create token.
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {expiresIn: "1d"})

        const response = NextResponse.json({
            message: "Login successful",
            success: true
        });

        response.cookies.set("token", token, {
            httpOnly: true
        })

        return response;

    } catch (error: any) {
        return Response.json({error: error.message}, {status: 500})
    }
}