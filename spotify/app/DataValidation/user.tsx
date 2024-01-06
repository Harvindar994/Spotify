import { z } from "zod";

export const UserValidation = z.object({
    name: z.string().min(1, "Name is required").max(255),
    email: z.string().min(1, "Email is required"),
    password: z.string().min(4, "Password length shouuld be atleast 4 characters.").max(15, "password length should not be grater than 15 characters.")
})

export const LoginUserValidation = z.object({
    email: z.string().min(1, "Email is required"),
    password: z.string().min(4, "Password length shouuld be atleast 4 characters.").max(15, "password length should not be grater than 15 characters.")
})