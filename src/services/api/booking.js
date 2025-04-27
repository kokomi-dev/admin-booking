import axiosClient from '@/configs/axiosClient';

const getBookingAttraction = ({ unitCode, roles }) => {
  return axiosClient.get(
    `/booking/attraction?roles=${roles}&unitCode=${unitCode}`,
  );
};
const getBookingHotel = ({ unitCode, roles }) => {
  return axiosClient.get(`/booking/hotel?roles=${roles}&unitCode=${unitCode}`);
};
const updateStatusBookingAttraction = ({ id, data }) => {
  return axiosClient.post(`/booking/attraction/${id}`, { data });
};
const updateStatusBookingHotel = ({ id, data }) => {
  return axiosClient.post(`/booking/hotel/${id}`, { data });
};
const getTotalBookingAttraction = (typeGet) => {
  return axiosClient.post(`/booking/get-total-attractions`, typeGet);
};
const getTotalBookingHotel = (typeGet) => {
  return axiosClient.post(`/booking/get-total-hotels`, typeGet);
};
export {
  getBookingAttraction,
  getBookingHotel,
  updateStatusBookingAttraction,
  updateStatusBookingHotel,
  getTotalBookingAttraction,
  getTotalBookingHotel,
};
