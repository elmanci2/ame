import { Request } from "express";

export interface UserData {
  id: number;
  name: string;
  lastname: string;
  email: string;
  password: string;
  phoneNumber: string;
  country: string;
  city: string;
  estado: string;
  age: number;
  fechaNacimiento: string;
  photo: Buffer;
}

export interface VitalSigns {
  heart_rate: string;
  blood_pressure: string;
  blood_sugar_level: string;
  weight: string;
  patient_id: string;
}

export interface Reminder {
  notification_id: string;
  patient_id: string;
  id: number;
  mensaje: string;
  medicamento: string;
  dosis: string;
  unidad: string;
  type: string;
  color: string;
  date: string;
  time: string;
  repeat: string;
  formate: string;
  originalTime: {
    time: string;
  };
}

export type userType = {
  user_id: string;
};

export interface RequestType extends Request {
  user: userType;
}
