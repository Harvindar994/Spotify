import nodemailer from 'nodemailer';

export async function sendMail(from: string, to: string, subject: string, html: string) {

    try {
        var transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USER,
                pass: process.env.MAILTRAP_PASS
            }
        });
            
        const info = await transporter.sendMail({
            from, 
            to, 
            subject, 
            html
        });

        return true;

    } catch (error) {
        return false;
    }
}