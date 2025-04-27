export const formatDate = (date) => {
  if (!date) return '';

  const parsedDate = new Date(date);
  return parsedDate?.toLocaleDateString('vi-VN');
};
