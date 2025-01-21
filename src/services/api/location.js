const getProvince = async () => {
  const data = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
  const res = await data.json();
  if (res.error !== 0) {
    return alert('Lỗi khi lấy tỉnh thành');
  } else {
    return res;
  }
};
const getLocation = async (id) => {
  const data = await fetch(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
  const res = await data.json();
  if (res.error !== 0) {
    return alert('Lỗi khi lấy thông tin cụ thể');
  } else {
    return res;
  }
};
const getDistricts = async (id) => {
  const data = await fetch(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
  const res = await data.json();
  if (res.error !== 0) {
    return alert('Lỗi khi lấy quận/huyện thành');
  } else {
    return res.data;
  }
};
const getCommune = async (id) => {
  const data = await fetch(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
  const res = await data.json();
  if (res.error !== 0) {
    return alert('Lỗi khi xã/ phường thành');
  } else {
    return res.data;
  }
};
export { getProvince, getLocation, getDistricts, getCommune };
