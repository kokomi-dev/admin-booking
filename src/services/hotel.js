const api = 'http://localhost:8080/api/hotel';
const getAllHotels = async () => {
  try {
    const res = await fetch(api);
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
const addHotel = async (formData) => {
  try {
    const res = await fetch(api, {
      method: 'POST',
      body: formData,
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi gửi form:', error);
  } finally {
  }
};
const getDetailHotel = async (slug) => {
  try {
    const res = await fetch(api + '/' + slug, {
      method: 'GET',
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.error('Lỗi khi lấy dữ liệu chi tiết:', error);
  }
};
const editHotel = async ({ slug, formData }) => {
  try {
    const res = await fetch(api + '/edit/' + slug, {
      method: 'PUT',
      body: formData,
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
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
export { getAllHotels, addHotel, getDetailHotel, editHotel, updateStatus };
