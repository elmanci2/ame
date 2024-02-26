import { config as dotenv } from "dotenv";
dotenv();
export const config = {
  port: {
    port: 3000,
  },
  sms: {
    accountSid: `${process.env.accountSid}`,
    authToken: `${process.env.authToken}`,
    phone: "+17658197039",
  },

  jwt: {
    secretKey: `${process.env.secretKey}`,
  },
};
