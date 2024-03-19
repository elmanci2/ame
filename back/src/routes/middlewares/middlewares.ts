import { NextFunction, Response, Request } from "express";
import { Errors } from "../../errors/error";
import { verify_Token } from "../../controllers/util/token";

export async function authentication(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const token: any = req.headers["tk"];
  const tk = JSON.parse(token);
  if (!tk.tk) {
    return res.status(401).send(Errors.unauthorized);
  }
  const decoded = await verify_Token(tk?.tk?.substring(7));

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  req["user"] = decoded;

  next();
}

export const next = (req: Request, res: Response, next: NextFunction) => {
  next();
};
