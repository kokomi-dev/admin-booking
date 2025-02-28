function formatDateToISOString(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  if (!day || !month || !year) {
    throw new Error('Invalid date format. Expected format: DD/MM/YYYY');
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  return date.toISOString();
}
export default formatDateToISOString;
