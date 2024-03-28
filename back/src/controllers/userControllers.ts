/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import { Service, Users } from "../db/models";
import { Errors } from "../errors/error";
import { upload_file } from "../services/aws/storage";
import { v4 as uuidv4 } from "uuid";

const updateUser = async (req: Request, res: Response) => {
  const phone_id = uuidv4();
  //@ts-ignore
  const { user_id } = req.user;
  const newData = req.body;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const file_path = req.files?.photo?.tempFilePath;

  try {
    const user = await Users.findOne({
      where: {
        id_usuario: user_id,
      },
    });
    const photo: any = file_path ? `${phone_id}.jpg` : null;

    if (file_path) {
      await upload_file(file_path, photo);
    }

    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }
    await user.update({ ...newData, photo });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).send("Internal Server Error");
  }
};

const allServicesUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const { user_id } = req.user;

  try {
    const services = await Service.findAll({
      where: {
        user_id,
      },
    });

    res.status(200).json(services);
  } catch (error) {
    return res.status(500).send("Internal Server Error");
  }
};

/* const recoverAccount = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  sendEmail;
}; */

export { updateUser, allServicesUser };
