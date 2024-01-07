import { UserInputError } from "apollo-server-core";
import { uuid } from "uuidv4";
import { sendExpoNotification } from "../../../../../services/notifications/expo.js";

export const getAllMedicamentos = (rot, args, { db }) => {



    return
}


const Message = {
    sound: 'default',
    title: 'Medicamento Agregado!',
    body: 'El medicament fue agregado correctamente',
    data: { someData: 'goes here' },
};


export const addMedicamento = async (rot, args, { db, user }) => {

    if (!user) {
        throw new UserInputError('Usuario no encontrado');
    }

    try {
        const newMedicamento = new db.medicaments({
            name: args.name,
            id: uuid(),
        });

        await newMedicamento.save()
        user.medicaments.push(newMedicamento._id);
        await user.save();

        sendExpoNotification({
            ...Message,
            to: user.expo_tk
        })


        return {
            message: "medicamento agregado correctamente"
        };
    } catch (error) {
        throw new UserInputError(`Error al agregar el un medicamento`);
    }

}



export const deleteMedicamento = async (root, args, { db, user }) => {
    if (!user) {
        throw new UserInputError('Usuario no encontrado');
    }

    try {
        const { id } = args;

        // Eliminar el medicamento de la colección db.medicaments sin verificar si el usuario lo tiene
        await db.medicaments.deleteOne({ id }); // Reemplaza 'id' con el campo que identifica el medicamento

        // Buscar el índice del medicamento a eliminar en el array de medicamentos del usuario
        const medicamentoIndex = user.medicaments.findIndex(medicamento => medicamento.id === id);

        if (medicamentoIndex !== -1) {
            // Si el usuario tiene el medicamento, eliminarlo del array de medicamentos del usuario
            user.medicaments.splice(medicamentoIndex, 1);
            // Guardar los cambios en el usuario
            await user.save();
        }


        sendExpoNotification({
            ...Message,
            title: 'Medicamento Eliminado!',
            body: 'El medicament fue eliminado correctamente',
            to: user.expo_tk
        })

        return {
            message: "Medicamento eliminado correctamente"
        };
    } catch (error) {
        throw new UserInputError('Error al eliminar el medicamento');
    }
}







