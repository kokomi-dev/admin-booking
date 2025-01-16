const checkInvalidateDDMMYYYY = (inputDate) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [day, month, year] = inputDate.split('/').map(Number);

  if (
    !day ||
    !month ||
    !year ||
    year < 1000 ||
    month < 1 ||
    month > 12 ||
    day < 1 ||
    day > 31
  ) {
    return false;
  }

  const givenDate = new Date(year, month - 1, day);

  return givenDate > today;
};

export default checkInvalidateDDMMYYYY;
