import { createTransport, getTestMessageUrl } from 'nodemailer';

// building out transporter
const transport = createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

function createEmail(text: string): string {
    return `
    <div style="
        border: 1px solid black;
        padding: 20px: 
        font-family: 2;
        font-size: 20px;
        ">
        <h2>Hello there!!</h2>
        <p>${text}</p>
        <p>Sincerely, Shroom Town</p>
        `;
}

export async function SendPasswordResetEmail(
    resetToken: string,
    to: string
): Promise<void> {
    // email the token
    const info = await transport.sendMail({
        to,
        from: 'reset@shroomtown.com',
        subject: 'Your password reset',
        html: createEmail(`Your password reset token is here.
            
            <a href="${process.env.FRONTEND_URL}/reset?token=${resetToken}">Click here to reset</a>`),
    });
    if (process.env.MAIL_USER.includes('ethereal.email')) {
        console.log(`Message sent!  Preview it at ${getTestMessageUrl(info)}`);
    }
}
