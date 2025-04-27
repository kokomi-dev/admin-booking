import axiosClient from '@/configs/axiosClient';

const api_url = `${import.meta.env.VITE_PORT_SERVER}/api`;

const getAllUser = async (query) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const res = await fetch(api_url + '/auth?' + queryString, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
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
const reqDelUser = (id) => {
  return axiosClient.delete(`/user/dell-user/${id}`);
};

export { getAllUser, reqUpdateStatus, reqDelUser };
