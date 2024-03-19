import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> =
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "velanovelasgratis@gmail.com",
      pass: "34F6285C7B27C2482F7A968EF4C0FB0E80C1",
    },
  });

interface EmailOptions {
  from?: string;
  to: string;
  cc?: string[];
  bcc?: string[];
  subject: string;
  text?: string;
  html?: string;
  attachments?: { filename: string; content: string }[];
}

export async function sendEmail(options: EmailOptions) {
  try {
    const mailOptions = {
      from: options.from || "mancillaandres7@gmail.com",
      to: options.to,
      cc: options.cc,
      bcc: options.bcc,
      subject: options.subject,
      text: options.text,
      html: options.html,
      attachments: options.attachments,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}
