/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Errors } from "../errors/error";
import { Service, Users } from "../db/models";
import { upload_file } from "../services/aws/storage";
import generateUniqueId from "generate-unique-id";
import { service_state } from "./util/util";
import { sendNotification } from "../services/firebase/fcm";
import { user_roles } from "./util/Roles";

const add_service = async (req: Request, res: Response) => {
  const data = req.body;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user_id } = req.user;

  const service_id = generateUniqueId({
    length: 100,
    useLetters: true,
  });

  if (!user_id || !data) {
    return res.status(400).send(Errors.internalError);
  }

  try {
    const user_info: any = await Users.findOne({
      where: { id_usuario: user_id },
    });

    if (data?.type === 2) {
      const service_data = {
        ...data,
        user_id,
        status: service_state.espera,
        user_name: user_info?.lastName,
        user_photo: user_info?.photo,
      };

      const service = await Service.create({ ...service_data });
      const save = await service.save();

      if (save) {
        return res.status(200).json({ success: true });
      }
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const file_path = req.files?.photo?.tempFilePath;

    const photo = `${service_id}.jpg`;

    const service_data = {
      ...data,
      user_id,
      status: service_state.espera,
      photo,
      user_name: user_info?.lastName,
      user_photo: user_info?.photo,
    };

    await upload_file(file_path, photo);
    const service = await Service.create({ ...service_data });
    const save = await service.save();

    if (save) {
      return res.status(200).json({ success: true });
    }
  } catch (error) {
    console.error("Error while inserting service:", error);
    return res.status(500).send(Errors.internalError);
  }
};

const get_active_service = async (req: Request, res: Response) => {
  //@ts-ignore
  const { user_id } = req.user;
  try {
    const user = await Users.findOne({
      where: {
        id_usuario: user_id,
      },
    });

    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }
    //@ts-ignore
    const server_type = user.type === user_roles.delivery ? 1 : 2;

    const services = await Service.findAll({
      where: {
        status: 0,
        canceled: false,
        incurred: false,
        type: server_type,
        completed: false,
      },
    });
    if (!services) {
      return res.status(404).send("Servicio no encontrado");
    }
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

const get_service_user = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user_id } = req.user;

  try {
    const services = await Service.findAll({
      where: { user_id, canceled: false, completed: false },
    });

    if (!services || services.length === 0) {
      return res.status(201).json([]);
    }

    // Crear un array de promesas para las operaciones asincrónicas
    const promises = services.map(async (service: any) => {
      if (service?.incurred) {
        const user: any = await Users.findOne({
          where: {
            id_usuario: service?.get_service_id,
          },
        });

        if (user) {
          service.get_phone = user?.phoneNumber;
          service.get_age = user?.date;
        }
      }
      return service;
    });
    const updatedServices = await Promise.all(promises);

    return res.status(200).json(updatedServices);
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

const cancel_service = async (req: Request, res: Response) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send(Errors.unauthorized);
  }

  try {
    // Buscar el servicio por su ID
    const service = await Service.findOne({ where: { id } });

    // Verificar si el servicio fue encontrado
    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.canceled = true;

    // Guardar los cambios en la base de datos
    await service.save();

    // Enviar una respuesta exitosa
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al cancelar el servicio:", error);
    return res.status(500).send(Errors.internalError);
  }
};

const confirme_Service = async (req: Request, res: Response) => {
  const { id, start, observation } = req.body;
  if (!id) {
    return res.status(400).send(Errors.unauthorized);
  }

  try {
    // Buscar el servicio por su ID
    const service = await Service.findOne({ where: { id } });

    // Verificar si el servicio fue encontrado
    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }

    //@ts-ignore
    service.completed = true;
    //@ts-ignore
    service.start = start;
    //@ts-ignore
    service.observation = observation ?? "";

    // Guardar los cambios en la base de datos
    await service.save();

    // Enviar una respuesta exitosa
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al cancelar el servicio:", error);
    return res.status(500).send(Errors.internalError);
  }
};

const confirme_Service_delivery_adn_medica = async (
  req: Request,
  res: Response
) => {
  const { id } = req.body;
  if (!id) {
    return res.status(400).send(Errors.unauthorized);
  }

  try {
    // Buscar el servicio por su ID
    const service = await Service.findOne({ where: { id } });

    // Verificar si el servicio fue encontrado
    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }
    //@ts-ignore
    service.incurred = false;
    await service.save();

    // Enviar una respuesta exitosa
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error al cancelar el servicio:", error);
    return res.status(500).send(Errors.internalError);
  }
};

// get service
const get_service = async (req: Request, res: Response) => {
  try {
    const { id } = req.body;
    const location = req.body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id } = req.user;

    if (!id) {
      return res.status(400).send(Errors.unauthorized);
    }
    // Busca el servicio por su ID
    const service: any = await Service.findOne({ where: { id } });

    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }

    const user: any = await Users.findOne({
      where: { id_usuario: service?.user_id },
    });

    const get: any = await Users.findOne({
      where: { id_usuario: user_id },
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.get_service_id = user_id;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.location = JSON.stringify(location);

    service.get_name = get.name;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.incurred = true;

    await service.save();

    console.log(service);

    await sendNotification({
      title: "servicio activo",
      body: `${service?.user_name} tu servicio fue tomado`,
      to: user?.firebase_tk,
    });

    return res.status(200).json({ service });
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    return res.status(500).send(Errors.internalError);
  }
};

const get_service_info = async (req: Request, res: Response) => {
  const { id } = req.query;
  if (!id) {
    return res.status(400).send(Errors.unauthorized);
  }
  try {
    const service = await Service.findOne({ where: { id } });
    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }
    res.status(200).json(service);
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

const service_real_time = async (req: Request, res: Response) => {
  const { location, id } = req.body;
  try {
    const service = await Service.findOne({ where: { id } });

    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }

    //eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.location = JSON.stringify(location);

    await service?.save();
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

const get_active_service_delivery_and_medical = async (
  req: Request,
  res: Response
) => {
  //@ts-ignore
  const { user_id } = req.user;

  try {
    const service: any = await Service.findOne({
      where: {
        get_service_id: user_id,
        completed: false,
        incurred: true,
        canceled: false,
      },
      order: [["createdAt", "DESC"]], // Ordenar por fecha de creación en orden descendente
    });

    if (service) {
      res.status(200).json(service);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

export {
  add_service,
  get_service,
  service_real_time,
  get_active_service,
  get_service_user,
  cancel_service,
  get_service_info,
  confirme_Service_delivery_adn_medica,
  get_active_service_delivery_and_medical,
  confirme_Service,
};
