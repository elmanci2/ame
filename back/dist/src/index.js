"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const config_1 = require("./config/config");
const server_1 = require("./server");
const server_Message = "app listen on port " + config_1.config.port.port;
// server initialize
server_1.server.listen(config_1.config.port.port, () => console.log(server_Message));
