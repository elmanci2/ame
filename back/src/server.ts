import "dotenv/config";
import express from "express";
import cors from "cors";
import rt from "./routes/routes";
import morgan from "morgan";
import http from "http";
import { Server } from "socket.io";
const app = express();

const server = http.createServer(app);

const io = new Server(server);

io.on("connection", () => {
  console.log("soke connection");
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(rt);

export  { app, server };
