import { config as dotenv } from "dotenv";
dotenv();
import { config } from "./config/config";
import app from "./server";

const server_Message = "app listen on port " + config.port.port;

// server initialize
app.listen(config.port.port, () => console.log(server_Message));
