// init db module
import "./db/db.js";
import "./services/util/reminders.js";

/// apollo server
import { ApolloServer } from "apollo-server-express";
import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import http from "http";

import cors from "cors";
import fileUpload from "express-fileupload";
import express from "express";
import bodyParser from "body-parser";
import { config } from "dotenv";

//may modules
import routes from "./http/res/Routes.js";
import "./services/util/reminders.js";
import { resolvers } from "./http/gql/operators/resolvers/resolvers.js";
import { typeDefs } from "./http/gql/operators/typeDefs/typeDefs.js";
import context from "./http/gql/context.js";

config(); // dotenv init

const app = express();

const port = process.env.PORT || 3000;

//

app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    req.token = token;
  }
  next();
});

app.use("/static", express.static("src/public/img"));

app.use(cors());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "src/public",
  })
);
app.use(bodyParser.json());

app.use(routes);

const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

server.applyMiddleware({ app });

await new Promise((resolve) => httpServer.listen({ port }, resolve));
console.log(
  `🚀 Server ready at http://localhost:${port} ${server.graphqlPath}`
);
