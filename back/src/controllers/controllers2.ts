import { Request, Response } from "express";
import { Errors } from "../errors/error";
import { Service } from "../db/models";
import { user_roles } from "./util/Roles";

export const add_service = async (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const user = req?.user;
  const data = req.body;

  console.log(data);

  if (!user || !user.user_id || !data) {
    return res.status(400).send(Errors.internalError);
  }

  try {
    const service = await Service.create({ ...data });
    const save = await service.save();
    if (save) {
      return res.status(200).json({ success: true });
    }
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
