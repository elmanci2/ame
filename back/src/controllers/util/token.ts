import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { Errors } from "../../errors/error";

export const generate_token = async (id: string): Promise<any> => {
  try {
    if (!id) throw new Error(Errors.serverError);
    const payload = {
      user_id: id,
    };
    const token: string = jwt.sign(payload, config.jwt.secretKey);
    return {
      tk: `bearer ${token}`,
    };
  } catch (error: any) {
    // Handle errors
    console.error("Error generating token:", error.message);
    throw error;
  }
};

export const verify_Token = async (tk: string) => {
  try {
    if (!tk) throw new Error(Errors.serverError);
    const user_id = jwt.verify(tk, config.jwt.secretKey);
    return user_id;
  } catch (error) {
    throw new Error(Errors.serverError);
  }
};
