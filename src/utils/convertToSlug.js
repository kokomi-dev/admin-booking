const convertToSlug = (text) => {
  text = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  text = text.toLowerCase();
  text = text.replace(/[^a-z0-9\s-]/g, '');
  text = text.trim().replace(/\s+/g, '-');
  return text;
};
export default convertToSlug;
