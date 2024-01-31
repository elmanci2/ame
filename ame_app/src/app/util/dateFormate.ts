export function formatDate(dateString: string) {
  // Crear un objeto Date a partir de la cadena de fecha proporcionada
  const inputDate = new Date(dateString);

  // Verificar si la fecha es válida
  if (isNaN(inputDate.getTime())) {
    return {error: 'Fecha no válida'};
  }

  // Obtener componentes de la fecha
  const year = inputDate.getFullYear();
  const month = String(inputDate.getMonth() + 1).padStart(2, '0');
  const day = String(inputDate.getDate()).padStart(2, '0');
  const hours = String(inputDate.getHours()).padStart(2, '0');
  const minutes = String(inputDate.getMinutes()).padStart(2, '0');

  // Crear el objeto con el formato deseado
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
