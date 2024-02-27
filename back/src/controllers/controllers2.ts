import { Request, Response } from "express";
import { Errors } from "../errors/error";
import { Service } from "../db/models";
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const file_path = req.files?.photo?.tempFilePath;

  const photo = `${service_id}.jpg`;

  const service_data = {
    ...data,
    user_id,
    status: service_state.espera,
    photo,
  };

  try {
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  /*   const { user_id } = req.user;
   */
  /*   console.log(user_id); */
  try {
    const services = await Service.findAll();
    console.log(services);

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
    const services = await Service.findAll({ where: { user_id } });
    console.log(services);

    return res.status(200).json(services);
  } catch (error) {
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
