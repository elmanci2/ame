export function generateOTP() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

export const service_state = {
  espera: 0,
  tomado: 1,
};
