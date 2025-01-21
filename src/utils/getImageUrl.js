const getImageUrls = (content) => {
  const regex = /<img[^>]+src="(https:\/\/res\.cloudinary\.com[^"]+)"/g;
  const matches = [];
  let match;

  while ((match = regex.exec(content)) !== null) {
    matches.push(match[1]);
  }

  return matches;
};

export default getImageUrls;
