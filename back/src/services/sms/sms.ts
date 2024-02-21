import twilio from "twilio";

interface TwilioCredentials {
  accountSid: string;
  authToken: string;
  twilioPhoneNumber: string;
}

interface SMSData {
  to: string;
  body: string;
}

const twilioCredentials: TwilioCredentials = {
  accountSid: "ACb93a5469a5f19b266605a1c440244670",
  authToken: "b95c28ae6b94f6f6b38e7d21398d4303",
  twilioPhoneNumber: "+17658197039",
};

export async function sendSMS(smsData: SMSData) {
  const { accountSid, authToken, twilioPhoneNumber } = twilioCredentials;
  const client = twilio(accountSid, authToken);

  try {
    const result = await client.messages.create({
      body: smsData.body,
      from: twilioPhoneNumber,
      to: smsData.to,
    });

    return result;
  } catch (error) {
    console.log(error);
  }
}

// Ejemplo de uso:
