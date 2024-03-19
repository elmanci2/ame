/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response, Request } from "express";
import { Users } from "../db/models";
import { Errors } from "../errors/error";

const updateUser = async (req: Request, res: Response) => {
  //@ts-ignore
  const { user_id } = req.user;
  const newData = req.body;

  try {
    const user = await Users.findOne({
      where: {
        id_usuario: user_id,
      },
    });
    if (!user) {
      return res.status(401).send(Errors.unauthorized);
    }
    await user.update(newData);
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error updating user information:", error);
    return res.status(500).send("Internal Server Error");
  }
};

/* const recoverAccount = async (
  req: RequestType,
  res: Response
): Promise<any> => {
  sendEmail;
}; */

export { updateUser };
