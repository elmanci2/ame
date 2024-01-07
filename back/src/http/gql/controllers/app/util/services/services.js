import { UserInputError } from "apollo-server-core";
import { uuid } from "uuidv4";
import { sendExpoNotification } from "../../../../../../services/notifications/expo.js";

const Message = {
  sound: "default",
  title: "Pedido Recibido",

  data: { someData: "goes here" },
};

export async function addService(root, args, { db, user }) {
  if (!user) {
    throw new UserInputError("Usuario no encontrado");
  }

  console.log(args.service);
  try {
    const services = new db.service({
      ...args.service,
      id: uuid(),
      address: user.address,
      name: user.name,
      userId: user._id,
      //  photo: user.photo
    });

    services.save();

    user.services.push(services._id);
    user.save();
    await sendExpoNotification({
      ...Message,
      to: user.expo_tk,
      body: `¡${user.name} Tu pedido ha sido recibido y está en proceso!`,
    });

    return {
      message: "pedido agregado  correctamente",
    };
  } catch (error) {
    throw new UserInputError("sericin invalido");
  }
}

export async function getServices(root, args, { db, user }) {
  try {
    const type = args?.type;

    if (type) {
      const services = await db.service.find({ type }); 
      return services;
    }

    const services = await db.service.find(); 
    return services;
  } catch (error) {
    throw new UserInputError("Error interno");
  }
}

export async function takeTechService(root, args, { db, user }) {
  if (!user) {
    throw new UserInputError("Usuario no encontrado");
  }

  try {
    const serviceId = args.id;

    if (!serviceId) {
      throw new UserInputError("Parámetros no válidos");
    }

    const service = await db.service.findOne({ id: serviceId });

    const { expo_tk } = await db.user.findOne({ _id: service.userId });

    if (!service) {
      throw new UserInputError("Servicio no encontrado");
    }

    user.services.push(service._id);
    user.onService = true;
    await user.save();

    service.active = false;
    await service.save();

    sendExpoNotification({
      to: expo_tk,
      title: "Pedido Aceptado",
      body: "Por favor, permanece en casa, estamos en camino.",
    });

    return {
      message: "Servicio tomado",
    };
  } catch (error) {
    return UserInputError("Error interno del servidor");
  }
}

export async function cancelTechService(root, args, { db, user }) {
  if (!user) {
    throw new UserInputError("Usuario no encontrado");
  }

  try {
    const serviceId = args.id;

    if (!serviceId) {
      throw new UserInputError("Parámetros no válidos");
    }

    const service = await db.service.findOne({ _id: serviceId });

    if (!service) {
      throw new UserInputError("Servicio no encontrado");
    }

    // Verificar si el usuario ha tomado el servicio
    if (!user.services.includes(service._id)) {
      throw new UserInputError("El usuario no ha tomado este servicio");
    }

    // Eliminar el servicio de la lista del usuario
    user.services = user.services.filter(
      (serviceId) => serviceId !== service._id
    );
    await user.save();

    // Activar nuevamente el servicio
    service.active = true;
    await service.save();

    return {
      message: "Servicio cancelado con éxito",
    };
  } catch (error) {
    throw new UserInputError("Error interno del servidor");
  }
}


export async function finishTechService(root, args, { db, user }) {
  try {
    if (!user) {
      throw new UserInputError("Usuario no encontrado");
    }

    const serviceId = args.id;

    if (!serviceId) {
      throw new UserInputError("Parámetros no válidos");
    }

    const service = await db.service.findOne({ id: serviceId });

    if (!service) {
      throw new UserInputError("Servicio no encontrado");
    }

    // Verificar si el usuario que solicita la finalización del servicio es el propietario
    if (service.userId.toString() !== user._id.toString()) {
      throw new UserInputError("No tienes permisos para finalizar este servicio");
    }

    // Marcar el servicio como finalizado
    service.finished = true;
    await service.save();

    // Actualizar el estado del usuario
    user.onService = false;
    await user.save();

    // Envía notificación al técnico
    const technician = await db.user.findOne({ _id: service.technicianId });
    if (technician) {
      sendExpoNotification({
        to: technician.expo_tk,
        title: "Servicio Finalizado",
        body: "El servicio ha sido marcado como finalizado por el usuario.",
      });
    }

    return {
      message: "Servicio finalizado exitosamente",
    };
  } catch (error) {
    console.error("Error al finalizar el servicio:", error);
    throw new UserInputError("Error interno del servidor");
  }
}

