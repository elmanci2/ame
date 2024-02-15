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
