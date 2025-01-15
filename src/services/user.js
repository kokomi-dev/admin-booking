const api_url = 'http://localhost:8080/api';

const getAllUser = async (query) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const res = await fetch(api_url + '/auth?' + queryString, {
      method: 'GET',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
export { getAllUser };
