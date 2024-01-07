import { UserInputError } from 'apollo-server-core';
import bcrypt from 'bcrypt'
import { uuid } from 'uuidv4';


export async function register(root, args, context) {
    const { db, jwt, secret } = context;

    const existingUser = await db.user.findOne({
        $or: [
            { email: args.user.email },
            { document: args.user.document }
        ]
    });

    if (existingUser) {
        if (existingUser.email === args.user.email) {
            throw new UserInputError("El correo electrónico ya está en uso");
        }

        if (existingUser.document === args.user.document) {
            throw new UserInputError("Este número de documento ya está en uso");
        }
    }

    try {
        const password = await bcrypt.hash(args.user.password, 10);

        const newUser = new db.user({
            ...args.user,
            password,
            id: uuid()
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser.id }, secret);

        return {
            message: 'Usuario creado correctamente',
            token: token
        };
    } catch (error) {
        throw new UserInputError(error);
    }
}



export async function addGuardians(root, args, context) {
    const { user, db } = context;

    if (!user) {
        throw new UserInputError('Usuario no encontrado');
    }


    console.log(user);


    const { name, docType, document, date, age } = args?.guardia;
    if (!name || !docType || !document || !age || !date) {
        throw new UserInputError('Los datos del acudiente son incompletos');
    }

    if (age < 18) {
        throw new UserInputError('el acudiente no es mayor de edad')
    }


    try {

        const newGuardian = new db.guardians({
            ...args.guardia,
            id: uuid()
        });

        await newGuardian.save();


        user.guardians.push(newGuardian._id);
        await user.save();


        return {
            message: "acudiente agregado correctamente"
        };
    } catch (error) {
        throw new Error(`Error al agregar el acudiente: ${error.message}`);
    }
}

export async function login(root, arg, context) {
    const { jwt, db, secret } = context;

    try {
        const user = await db.user.findOne({ email: arg.credentials.email });

        if (!user) {
            throw new UserInputError('Usuario no encontrado');
        }

        const checkPassword = await bcrypt.compare(arg.credentials.password, user.password);

        if (!checkPassword) {
            throw new UserInputError('credenciales incorrecto');
        }

        // Generar un token JWT
        const token = jwt.sign({ id: user.id }, secret);

        return {
            message: 'Inicio de sesión exitoso',
            token,
            role: user.role
        };
    } catch (error) {
        throw new Error(error.message)
    }
}