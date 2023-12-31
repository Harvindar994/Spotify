import prisma from "@/prisma/client";

export async function POST(request: Request) {
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