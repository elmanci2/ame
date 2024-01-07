import jwt from "jsonwebtoken";
import models from "../../db/models/models.db.js";
import { secret_word } from "../../constants/keys.js";
import { UserInputError } from "apollo-server-core";

const tk = jwt;

async function context({ req }) {
    const auth = req.headers.authorization || null;
    const defaultContext = { db: models, secret: secret_word, jwt: tk };

    if (auth && auth.includes("null")) {
        return defaultContext;
    }

    if (auth && auth.toLowerCase().startsWith("bearer ") && auth !== "") {
        const token = auth.substring(7);
        try {
            const { id } = jwt.verify(token, secret_word);
            const user = await models.user
                .findOne({ id })
                .populate(['guardians', 'reminders', 'medicaments', 'services']);
          /*   if (!user) {
                throw new UserInputError('Usuario no encontrado');
            } */

            return { user, ...defaultContext };
        } catch (error) {
            console.error("Error al verificar el token:", error);
            return defaultContext;
        }
    }

    return defaultContext;
}

export default context;
