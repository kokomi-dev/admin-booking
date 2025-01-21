const api = 'http://localhost:8080/api/attraction';
const getAllAttractions = async (query) => {
  try {
    const queryString = new URLSearchParams(query).toString();
    const res = await fetch(api + '?' + queryString, {
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
const addAttracion = async (formData) => {
  try {
    const res = await fetch(api, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error('Lỗi khi gửi form:', error);
  }
};
const editAttracion = async ({ formData: {}, id: string }) => {
  try {
    const res = await fetch(api + '/' + id, {
      method: 'PUT',
      body: formData,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi gửi form:', error);
  } finally {
  }
};
const updateStatus = async (data) => {
  try {
    const res = await fetch(api + '/status', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi gửi form:', error);
  } finally {
  }
};
const getDetailAttracion = async ({ slug }) => {
  try {
    const res = await fetch(api + '/' + slug, {
      method: 'GET',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin chi tiết:', error);
  }
};
const delAttractions = async (idDelete) => {
  try {
    const res = await fetch(api + '/delete', {
      method: 'DELETE',
      body: JSON.stringify(idDelete),
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi lấy thông tin chi tiết:', error);
  }
};
export {
  getAllAttractions,
  addAttracion,
  editAttracion,
  getDetailAttracion,
  updateStatus,
  delAttractions,
};
