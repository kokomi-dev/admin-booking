import axiosClient from '../../configs/axiosClient';

const api_url = 'http://localhost:8080/api';

const reqRegister = async (data) => {
  const res = await fetch(api_url + '/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  const result = await res.json();
  return result;
};
const reqlogin = async (data) => {
  return axiosClient.post('/auth/login', data);
};
const reqCurrentUser = async (userId) => {
  return axiosClient.post('/auth/get-current-user', { userId });
};

export { reqlogin, reqCurrentUser, reqRegister };
