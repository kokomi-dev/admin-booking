import axiosClient from '@/configs/axiosClient';

const postBlog = (value) => {
  return axiosClient.post('/blog/create', { data: value });
};
const editBlog = (data) => {
  return axiosClient.put(`/blog/edit/` + data.id, { data: data.value });
};
const getAllBlog = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return axiosClient.get('/blog?' + queryString);
};
const getDetailBlog = (slug) => {
  return axiosClient.get('/blog/' + slug);
};
const deleteBlogs = (id) => {
  return axiosClient.delete('/blog/delete', { data: id });
};
export { postBlog, editBlog, getAllBlog, getDetailBlog, deleteBlogs };
