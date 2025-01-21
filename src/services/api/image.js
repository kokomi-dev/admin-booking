import axiosClient from '@/configs/axiosClient';

const delImageOnCloundinary = (id) => {
  return axiosClient.post('/image/delete', { listImgDel: id });
};
export { delImageOnCloundinary };
