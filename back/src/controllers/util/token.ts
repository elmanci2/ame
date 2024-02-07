import jwt from "jsonwebtoken";
import { config } from "../../config/config";

export const generate_token = async (): Promise<any> => {
  try {
    const payload = {
      user_id: "123456",
      username: "example_user",
    };
    //   const options: jwt.SignOptions = {};
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
