export function calcularEdad(fechaNacimiento: string): number | null {
  const fechaNacimientoTimestamp = new Date(fechaNacimiento).getTime();
  const fechaActualTimestamp = new Date().getTime();

  if (isNaN(fechaNacimientoTimestamp)) {
    // La fecha de nacimiento proporcionada no es válida
    return null;
  }

  const edadEnMilisegundos = fechaActualTimestamp - fechaNacimientoTimestamp;
  const edadEnAños = Math.floor(
    edadEnMilisegundos / (365.25 * 24 * 60 * 60 * 1000),
  );

  return edadEnAños;
}

export function calculateAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth);
  const today = new Date();

  let age = today.getFullYear() - dob.getFullYear();

  // Check if the birthday for this year has not occurred yet
  const currentMonth = today.getMonth();
  const birthMonth = dob.getMonth();
  const currentDay = today.getDate();
  const birthDay = dob.getDate();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
}
