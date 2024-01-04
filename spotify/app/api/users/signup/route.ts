import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const {name, email, password} = body;

        const user = await prisma.user.findFirst({
            where: {
                email
            }
        })

        if (user){
            return NextResponse.json({
                error: "User already exists"
            }, {status: 400})
        }
        
        // hashing the password.
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = await prisma.user.create({
                            data: {
                                name,
                                email,
                                password: hashedPassword
                            }
                        });
                        
        return Response.json({
            message: "User created successfully",
            success: true,
            savedUser: newUser
        }, {
            status: 200
        });

    } catch (error: any) {
        return Response.json({error: error.message}, {status: 500})
    }
}