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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  get_service_id: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.STRING,
  },
  incurred: {
    type: DataTypes.BOOLEAN,
  },
  canceled: {
    type: DataTypes.BOOLEAN,
  },
  user_location: {
    type: DataTypes.STRING,
  },
  photo: {
    type: DataTypes.BLOB,
  },
  address: {
    type: DataTypes.STRING,
  },
  completed: {
    type: DataTypes.BOOLEAN,
  },
  pressing: {
    type: DataTypes.BOOLEAN,
  },
  type: {
    type: DataTypes.INTEGER,
  },
  location: {
    type: DataTypes.TEXT,
  },
};
