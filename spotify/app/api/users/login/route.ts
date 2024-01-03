import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const newUser = await prisma.user.create({
                            data: body,
                        });
                        
        return Response.json(newUser);

    } catch (error) {
        return Response.json(error)
    }
}