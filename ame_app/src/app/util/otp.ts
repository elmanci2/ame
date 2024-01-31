export const getOtpNumber = (otp:any) => {
  const {digit1, digit2, digit3, digit4} = otp;
  const otpString = `${digit1}${digit2}${digit3}${digit4}`;
  const otpNumber = parseInt(otpString, 10);
  return otpNumber;
};
