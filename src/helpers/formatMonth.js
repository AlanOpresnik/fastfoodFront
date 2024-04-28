export const formatToDayMonthYear = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1; // Sumamos 1 porque los meses van de 0 a 11
    const year = date.getFullYear();
  
    // Formateamos el día, el mes y el año con ceros a la izquierda si es necesario
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}-${formattedMonth}-${year}`;
  };