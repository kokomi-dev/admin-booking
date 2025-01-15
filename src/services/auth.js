import { axiosClient } from 'Configs';

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
const reqUpdateStatus = async (data) => {
  try {
    const res = await fetch(api_url + '/auth/update-status', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error(`Lỗi HTTP! status: ${res.status}`);
    }
    const response = await res.json();
    return response;
  } catch {}
};

export { reqlogin, reqCurrentUser, reqRegister, reqUpdateStatus };
