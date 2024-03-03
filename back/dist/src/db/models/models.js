"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.service_Model = exports.User_Model = void 0;
const sequelize_1 = require("sequelize");
exports.User_Model = {
    id_usuario: { type: sequelize_1.DataTypes.TEXT, primaryKey: true },
    address: sequelize_1.DataTypes.TEXT,
    barrio: sequelize_1.DataTypes.TEXT,
    city: sequelize_1.DataTypes.INTEGER,
    country: sequelize_1.DataTypes.INTEGER,
    date: sequelize_1.DataTypes.TEXT,
    document: sequelize_1.DataTypes.TEXT,
    documentType: sequelize_1.DataTypes.TEXT,
    email: sequelize_1.DataTypes.TEXT,
    lastName: sequelize_1.DataTypes.TEXT,
    name: sequelize_1.DataTypes.TEXT,
    password: sequelize_1.DataTypes.TEXT,
    phoneNumber: sequelize_1.DataTypes.TEXT,
    state: sequelize_1.DataTypes.INTEGER,
    verified: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 0 },
    active: { type: sequelize_1.DataTypes.INTEGER, defaultValue: 1 },
    photo: sequelize_1.DataTypes.TEXT,
    firebase_tk: sequelize_1.DataTypes.STRING,
    type: sequelize_1.DataTypes.TEXT,
};
exports.service_Model = {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    Copago: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    eps: { type: sequelize_1.DataTypes.STRING },
    user_id: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    get_service_id: {
        type: sequelize_1.DataTypes.TEXT,
    },
    status: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    incurred: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    canceled: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    user_location: {
        type: sequelize_1.DataTypes.STRING,
    },
    photo: {
        type: sequelize_1.DataTypes.STRING,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
    completed: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: false,
    },
    pressing: {
        type: sequelize_1.DataTypes.BOOLEAN,
    },
    type: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
    },
    location: {
        type: sequelize_1.DataTypes.STRING,
    },
    user_name: sequelize_1.DataTypes.STRING,
    user_photo: sequelize_1.DataTypes.STRING,
    get_name: sequelize_1.DataTypes.STRING,
    get_photo: sequelize_1.DataTypes.STRING,
};
