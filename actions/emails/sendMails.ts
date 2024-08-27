import ConfirmUserDeletion from "@/mail/confirm-user-deletion";
import { Resend } from "resend";

const resend = new Resend(process.env.EXPO_PUBLIC_RESEND_API_KEY);

export const sendUserDeletedTokenMail = async (
    email: string,
    token : string
  ) => {
    const confirmLink = `https://www.urent-rental.de/auth/delete-user?token=${token}`;
  
    await resend.emails.send({
        from: 'uRent <mail@urent-rental.de>',
        to: email,
        subject: "Bestätige die Löschung deines Accounts",
        react : ConfirmUserDeletion({confirmLink}) ,
    });
  }