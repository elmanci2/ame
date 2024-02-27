export const changeDate = (date: string, time: string): Date => {
  const fecha = new Date(date); // Convertir la primera cadena en un objeto Date
  const hora = new Date(time); // Convertir la segunda cadena en un objeto Date

  // Extraer la fecha de 'fecha' y la hora de 'hora'
  const nuevaFecha = new Date(
    fecha.getFullYear(),
    fecha.getMonth(),
    fecha.getDate(),
    hora.getHours(),
    hora.getMinutes(),
    hora.getSeconds(),
  );

  console.log(nuevaFecha);
  return nuevaFecha;
};

export function convertirHora12h(fechaISO: string) {
  // Crear un objeto Date a partir de la fecha en formato ISO 8601
  const fecha = new Date(fechaISO);

  // Obtener las horas y minutos
  let horas = fecha.getHours();
  let minutos = fecha.getMinutes();

  // Determinar si es AM o PM
  const periodo = horas >= 12 ? 'PM' : 'AM';

  // Convertir las horas al formato de 12 horas
  horas = horas % 12 || 12;

  // Agregar un cero inicial a los minutos si es necesario
  minutos = minutos < 10 ? '0' + minutos : minutos;

  // Crear la cadena de hora en formato de 12 horas
  const hora12h = `${horas}:${minutos} ${periodo}`;

  return hora12h;
}

export function obtenerFecha(fechaISO: string) {
  // Crear un objeto Date a partir de la cadena de fecha en formato ISO 8601
  const fecha = new Date(fechaISO);

  // Obtener el año, mes y día de la fecha
  const año = fecha.getFullYear();
  // El mes está basado en 0 (enero es 0), así que agregamos 1 para obtener el mes correcto
  const mes = fecha.getMonth() + 1;
  const dia = fecha.getDate();

  // Crear la cadena de fecha en el formato deseado (YYYY-MM-DD)
  const fechaFormateada = `${año}-${mes < 10 ? '0' + mes : mes}-${
    dia < 10 ? '0' + dia : dia
  }`;

  return fechaFormateada;
}
