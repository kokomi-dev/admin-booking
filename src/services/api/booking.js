import axiosClient from '@/configs/axiosClient';

const getBookingAttraction = ({ unitCode, roles }) => {
  return axiosClient.get(
    `/booking/attraction?roles=${roles}&unitCode=${unitCode}`,
  );
};
const updateStatusBookingAttraction = ({ id, data }) => {
  console.log(id, data);
  // return axiosClient.post(`/booking/attraction/${id}`, data);
};
const getBookingHotel = ({ unitCode, roles }) => {
  return axiosClient.get(`/booking/hotel?roles=${roles}&unitCode=${unitCode}`);
};
const updateStatusBookingHotel = ({ id, data }) => {
  return axiosClient.post(`/booking/hotel/${id}`, { data });
};
export {
  getBookingAttraction,
  getBookingHotel,
  updateStatusBookingAttraction,
  updateStatusBookingHotel,
};
