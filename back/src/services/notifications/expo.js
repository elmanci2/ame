import axios from 'axios';

const Expo_notification_url = 'https://exp.host/--/api/v2/push/send';

const Message = {
    to: 'ExponentPushToken[sDCgk-KIWyMZ0E4s3_RAyN]',
    sound: 'default',
    title: 'Original Title',
    body: 'And here is the body!',
    data: { someData: 'goes here' },
};

/* export const sendExpoNotification = async (message) => {
    try {
        const { data } = await axios.post(Expo_notification_url, message, {
            headers: {
                Accept: 'application/json',
                'Accept-encoding': 'gzip, deflate',
                'Content-Type': 'application/json',
            },
        });

        return {
            ...data.data,
            message: "notificación enviada "
        };
    } catch (error) {
        // Handle any errors here
        console.error('Error sending Expo notification:', error);
        throw error; // You can rethrow the error or handle it as needed
    }
};
 */

const serverKey = 'AAAASK2BZU8:APA91bHFq6-BDsmfityhFr1wTuy2D0dtfE_xo1xFkLIFl1V6f7ST4CpZsHWejYmurb-IPB0plCnQOrsHhy7iyblG5YdbsUzURr3GfwxSt5d9AyYU7HgF0Ovw9nIa9qNu4pLw51Q-XN_y'; // Reemplaza con tu clave de servidor
const deviceRegistrationToken = 'f5loMwzqTumFtvGK0KjQr5:APA91bHeRbJdkg4aurK4YIwTA6DNjUFGei02YuRrDGO6wWz3O6Yo36WgMKYsWd0DDV0JwqF_dRYWaHJI6Fqc720oJV3AmQ-r9UJBS3Vcqs30D4nUS-eicanOLXx-Jptz6c_6pmoECUz2'; // Reemplaza con el token de registro del dispositivo


export const sendExpoNotification = async (message) => {

    const fcmEndpoint = 'https://fcm.googleapis.com/fcm/send';
    const data = {
        to: message?.to,
        notification: {
            title: message?.title,
            body: message?.body
        },
        data: {
            custom_key: 'valor_personalizado'
        }
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `key=${serverKey}`
        }
    };

    axios.post(fcmEndpoint, data, config)
        .then(response => {
            console.log('Notificación enviada con éxito:', response.data);
        })
        .catch(error => {
            console.error('Error al enviar la notificación:', error);
        });



}

