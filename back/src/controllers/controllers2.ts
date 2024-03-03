/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from "express";
import { Errors } from "../errors/error";
import { Service, Users } from "../db/models";
import { user_roles } from "./util/Roles";
import { upload_file } from "../services/aws/storage";
import generateUniqueId from "generate-unique-id";
import { service_state } from "./util/util";

export const add_service = async (req: Request, res: Response) => {
  const data = req.body;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user_id } = req.user;

  console.log(data);

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

    console.log(user_info);

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

export const get_active_service = async (req: Request, res: Response) => {
  try {
    const services = await Service.findAll({ where: { status: 0 } });
    if (!services) {
      return res.status(404).send("Servicio no encontrado");
    }
    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

export const get_service_user = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const { user_id } = req.user;

  try {
    const services = await Service.findAll({
      where: { user_id, canceled: false },
    });
    if (!services) {
      return res.status(404).send("Servicio no encontrado");
    }

    return res.status(200).json(services);
  } catch (error) {
    return res.status(500).send(Errors.internalError);
  }
};

export const cancel_service = async (req: Request, res: Response) => {
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

// get service
export const get_service = async (req: Request, res: Response) => {
  try {
    const id = req.query.id;
    const location = req.body;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const { user_id, type } = req.user;

    if (!id || user_id || type) {
      return res.status(400).send(Errors.unauthorized);
    }
    // Busca el servicio por su ID
    const service = await Service.findOne({ where: { id } });

    if (!service) {
      return res.status(404).send("Servicio no encontrado");
    }

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.type = type === user_roles.delivery ? 1 : 2;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.get_service_id = user_id;

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    service.location = JSON.stringify(location);

    await service.save();

    return res.status(200).json({ service });
  } catch (error) {
    console.error("Error al obtener el servicio:", error);
    return res.status(500).send(Errors.internalError);
  }
};

export const get_service_info = async (req: Request, res: Response) => {
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

export const service_real_time = async (req: Request, res: Response) => {
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
