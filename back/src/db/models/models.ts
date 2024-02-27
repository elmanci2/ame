import { DataTypes } from "sequelize";

export const User_Model = {
  id_usuario: { type: DataTypes.TEXT, primaryKey: true },
  address: DataTypes.TEXT,
  barrio: DataTypes.TEXT,
  city: DataTypes.INTEGER,
  country: DataTypes.INTEGER,
  date: DataTypes.TEXT,
  document: DataTypes.TEXT,
  documentType: DataTypes.TEXT,
  email: DataTypes.TEXT,
  lastName: DataTypes.TEXT,
  name: DataTypes.TEXT,
  password: DataTypes.TEXT,
  phoneNumber: DataTypes.TEXT,
  state: DataTypes.INTEGER,
  verified: { type: DataTypes.INTEGER, defaultValue: 0 },
  active: { type: DataTypes.INTEGER, defaultValue: 1 },
  photo: DataTypes.TEXT,
};

export const service_Model = {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Copago: {
    type: DataTypes.INTEGER,
  },
  eps: { type: DataTypes.STRING },
  user_id: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  get_service_id: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.INTEGER,
  },
  incurred: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  canceled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  user_location: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  pressing: {
    type: DataTypes.BOOLEAN,
  },
  type: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
  },
  location: {
    type: DataTypes.STRING,
  },
};
