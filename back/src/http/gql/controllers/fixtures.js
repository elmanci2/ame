import { uuid } from "uuidv4";
import { sendExpoNotification } from "../../../services/notifications/expo.js";
import { UserInputError } from "apollo-server-core";

const Message = {
    sound: 'default',
    title: '¡Recordatorio Agregado!',
    body: 'Te mantendremos al tanto de tus recordatorios.',
    data: { someData: 'goes here' },
  };
  
export async function addReminders(root, args, context) {
    const { db, user } = context;

    if (!user) {
        throw new UserInputError('Usuario no encontrado');
    }

    try {
        const newGuardian = new db.reminder({
            ...args.reminder,
            id: uuid(),
            expo_tk: user.expo_tk
        });

        await newGuardian.save();
        user.reminders.push(newGuardian._id);
        await user.save();

        sendExpoNotification({
            ...Message,
            to: user.expo_tk
        })

        return {
            message: "recordatorio  agregado correctamente"
        };
    } catch (error) {
        throw new UserInputError(`Error al agregar el un recordatorio: ${error.message}`);
    }

}