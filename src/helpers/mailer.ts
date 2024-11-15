import User from "@/models/user.model";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10); //for generating hashed token

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const TOKEN = "********2ee6";

    const transport = nodemailer.createTransport(
      MailtrapTransport({
        token: TOKEN,
        testInboxId: 3280659,
      })
    );

    const mailOptions = {
      from: "om@om.com",
      to: email,
      subject:
        emailType === "verify" ? "verify your email" : "reset your password",
      html:`<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser. <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken} </p>`,
    };
    const mailResponse = await transport.sendMail(mailOptions);
  } catch (error: any) {
    throw new Error(error.message);
  }
};
function MailtrapTransport(arg0: {
  token: string;
  testInboxId: number;
}):
  | import("nodemailer/lib/smtp-pool")
  | import("nodemailer/lib/smtp-pool").Options {
  throw new Error("Function not implemented.");
}
