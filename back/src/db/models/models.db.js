import mongoose, { Schema, model, mongo } from "mongoose";
// may module

const User = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  docType: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, required: true },
  date: { type: String, required: true },
  country: { type: String, required: true },
  department: { type: String, required: true },
  city: { type: String, required: true },
  expo_tk: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, required: true },
  age: { type: Number, required: true },
  active: Boolean,
  onService: { type: Boolean, default: false },
  photo: { ref: "photo", type: Schema.Types.ObjectId },

  /// relationships

  guardians: [
    {
      ref: "guardians",
      type: Schema.Types.ObjectId,
    },
  ],

  reminders: [
    {
      ref: "reminder",
      type: Schema.Types.ObjectId,
    },
  ],

  medicaments: [
    {
      ref: "medicaments",
      type: Schema.Types.ObjectId,
    },
  ],

  services: [
    {
      ref: "services",
      type: Schema.Types.ObjectId,
    },
  ],
});

// guardians
const guardians = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  docType: { type: String, required: true },
  document: { type: String, required: true, unique: true },
  date: { type: String, required: true },
  age: { type: Number, required: true },
});

/// reminder
const reminder = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  message: { type: String, required: true },
  medication: { type: String, required: true },
  intervals: { type: Number, required: true },
  expo_tk: { type: String, required: true },
});

// photo
const photo = new Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
});

// documents
const documents = new Schema({
  id: { type: String, required: true, unique: true },
  url: { type: String, required: true, unique: true },
});

// medicaments

const medicaments = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  recordatorio: { type: Boolean, required: true, default: false },
});

// service

const service = new Schema({
  id: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  name: { type: String, required: true },
  location: { type: String, required: true },
  active: { type: Boolean, required: true },
  address: { type: String, required: true },
  eps: { type: String  , require:true},
  finish: { type: Boolean, required: true },
  photo: { type: String },
  type: { type: Number, require: true },
  userId: { type: Schema.Types.ObjectId, require: true },
});

// models
const guardians_model = model("guardians", guardians);
const user_model = model("user", User);
const reminders_model = model("reminder", reminder);
const photo_model = model("photo", photo);
const documents_models = model("documents", documents);
const medicaments_model = model("medicaments", medicaments);
const service_model = model("services", service);

const models = {
  user: user_model,
  guardians: guardians_model,
  reminder: reminders_model,
  photo: photo_model,
  documents: documents_models,
  medicaments: medicaments_model,
  service: service_model,
};

export default models;
