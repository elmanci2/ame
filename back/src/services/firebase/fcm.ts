import axios from "axios";

const serverKey =
  "AAAAM7V2EuY:APA91bEJEOQU1BZEiD7JDuXZ8tk_3jf5jA13f-b64sB_8O7eBmi4KPo2LZGc_JAM1eCUAbECDunFlOZ_DKx6qbAAcResUwZwgjsBY3mtI6HV2WrMy3HBrs0Ksbq197rmC3w7kOKZj6Vw";

interface NotificationMessage {
  to: string;
  title: string;
  body: string;
  sound?: string;
  icon?: string;
  priority?: string;
  customData?: never;
}

export const sendNotification = async (message: NotificationMessage) => {
  try {
    const fcmEndpoint = "https://fcm.googleapis.com/fcm/send";

    const data = {
      to: message?.to,
      notification: {
        title: message?.title,
        body: message?.body,
      },
      data: {
        custom_key: "valor_personalizado",
      },
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `key=${serverKey}`,
      },
    };

    const response = await axios.post(fcmEndpoint, data, config);
    console.log("Notificaciones enviadas con éxito:", response.data);
  } catch (error) {
    console.error("Error al enviar las notificaciones:", error);
  }
};
