import models from "../../db/models/models.db.js";
import { sendExpoNotification } from "../notifications/expo.js";

const tokens = ["ExponentPushToken[sDCgk-KIWyMZ0E4s3_RAyN]"];

// times
//const notificationIntervalMilliseconds = 60000;
const notificationIntervalMilliseconds = 3600000;
const intervalUpdateIntervalMilliseconds = 30000;

export const RemindersFunction = async (patient, tk, medicamento) => {
  let currentState = "";

  for (const token of [tk]) {
    const message = {
      to: token,
      sound: "default",
      title: `¡Hora de tu medicamento, ${patient}!`,
      body: `Recuerda tomar ${medicamento}.`,
      data: { someData: "goes here" },
    };

    const result = await sendExpoNotification(message);

    currentState = result;
  }

  return currentState;
};

let elapsedTime = 0;
let intervals = [];

function measureElapsedTime() {
  setInterval(() => {
    elapsedTime += 60;

    for (const interval of intervals) {
      //  console.log(interval);
      if (elapsedTime % (interval.intervals * 60) === 0) {
        sendNotification(interval.name, interval.expo_tk, interval.medication);
      }
    }
  }, notificationIntervalMilliseconds); // 60,000 ms interval (1 minute)
}

async function sendNotification(patient, tk, medicamento) {
  await RemindersFunction(patient, tk, medicamento);
}

measureElapsedTime();

async function updateIntervals() {
  const users = await models.user.find({}).populate("reminders");

  const reminders = [];

  intervals.length = 0;

  for (const user of users) {
    for (const reminder of user?.reminders) {
      const { expo_tk, intervals, medication, message } = reminder;

      reminders.push({
        name: user.name,
        expo_tk,
        intervals,
        medication,
        message,
      });
    }
  }
  const result = reminders?.flat();

  intervals = result;
}

setInterval(updateIntervals, intervalUpdateIntervalMilliseconds); // Update every 30 seconds
