import { Sequelize } from "sequelize";
import { User_Model, service_Model } from "./models";

const storage = "./src/db/db_users.db";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage,
  logging: true,
});

export const Users = sequelize.define("users", User_Model);
export const Service = sequelize.define("service", service_Model);

const start_dev = async () => {
  try {
    // Autenticar la conexión a la base de datos
   // await sequelize.sync({ force: true });
    await sequelize.authenticate();

    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

export default start_dev;
