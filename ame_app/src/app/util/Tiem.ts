export const changeDate = (date: string, time: string): Date => {
  const fecha = new Date(date); // Convertir la primera cadena en un objeto Date
  const hora = new Date(time); // Convertir la segunda cadena en un objeto Date

  // Extraer la fecha de 'fecha' y la hora de 'hora'
  const nuevaFecha = new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), hora.getHours(), hora.getMinutes(), hora.getSeconds());

  console.log(nuevaFecha);
  return nuevaFecha;
};
