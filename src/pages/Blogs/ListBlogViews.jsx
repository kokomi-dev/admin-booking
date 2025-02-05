import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import { ModalViewBlog } from '@/components/ModalViewBlog/ModalViewBlog';
import { Button, Checkbox, Select, Tooltip } from 'antd';
import clsx from 'clsx';
import { useState } from 'react';
import {
  MdDeleteOutline,
  MdEdit,
  MdLockOpen,
  MdLockOutline,
  MdOutlineFilterAltOff,
  MdRemoveRedEye,
} from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const ListBlogViews = ({
  user,
  listBlogs,
  handleUpdateStatus,
  handleDelete,
  filterListBlog,
  setFilterListBlog,
  checkedItem,
  setCheckedItem,
}) => {
  const { Option } = Select;
  const navigate = useNavigate();
  const [openViewBlog, setOpenViewBlog] = useState({
    status: false,
    content: '',
    title: '',
  });

  return (
    <div className="w-full overflow-auto rounded-md text-black_main ">
      <table className="table text-xs font-medium min-w-max w-full h-auto overflow-auto  border-spacing-0">
        <thead className="text-black">
          <tr className=" text-xs">
            <th className="z-[5]  border text-white_main border-gray-300  border-l-0 border-t-0 bg-bg_primary_main p-2  w-[50px] relative">
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[5]  border text-white_main border-gray-300  border-l-0 border-t-0 bg-bg_primary_main p-2  w-[50px] relative">
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold  border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Tiêu đề
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Tác giả
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>

            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  max-w-[120px] relative">
              Nội dung
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Mã DN
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>

            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Chế độ
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Trạng thái
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Thể loại
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2   relative">
              Ngày tạo
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Tiêu chí
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>

            <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
              Tùy chọn
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            {user.roles === 'admin' && (
              <th className="z-[10] font-semibold   border text-white_main border-gray-300 border-l-0 border-t-0 bg-bg_primary_main p-2  w-[100px] relative">
                Nâng cao
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </th>
            )}
          </tr>
        </thead>
        <tbody className="w-full h-auto">
          <tr>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <Checkbox
                sx={{ color: 'rgba(4, 132, 172, 1)' }}
                onChange={(e) => {
                  const { checked } = e.target;
                  if (checked) {
                    setCheckedItem(listBlogs.map((item) => item._id));
                  } else {
                    setCheckedItem([]);
                  }
                }}
                className="w-5 h-5 cursor-pointer"
              />

              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
              <Tooltip title={`Xóa bộ lọc`}>
                <button
                  onClick={() => {
                    setFilterListBlog({
                      unitCode: '',
                      title: '',
                      content: '',
                      author: '',
                      tags: '',
                      createdAt: '',
                      updatedAt: '',
                      isTrending: null,
                      isDraft: null,
                      isActive: null,
                      likes: 0,
                      comments: [],
                    });
                  }}
                  className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-danger"
                >
                  <Icon>
                    <MdOutlineFilterAltOff />
                  </Icon>
                </button>
              </Tooltip>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>

            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <InputDebounce
                value={filterListBlog.title}
                onChange={(e) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    title: e.target.value,
                  }));
                }}
                className="no-spinner"
                type="text"
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>

            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <InputDebounce
                className="no-spinner"
                type="text"
                value={filterListBlog.author}
                onChange={(e) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    author: e.target.value,
                  }));
                }}
              />

              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              {/* <InputDebounce className="no-spinner" type="text" /> */}
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <InputDebounce
                className="no-spinner"
                type="text"
                value={filterListBlog.unitCode}
                onChange={(e) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    unitCode: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <Select
                value={filterListBlog.isActive}
                onChange={(value) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    isActive: value,
                  }));
                }}
                className="w-full"
              >
                <Option value="">Tất cả</Option>
                <Option value={true}>Hiển thị</Option>
                <Option value={false}>Đang ẩn</Option>
              </Select>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <Select
                value={filterListBlog.isApprove}
                onChange={(value) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    isApprove: value,
                  }));
                }}
                className="w-full min-w-[110px]"
              >
                <Option value="">Tất cả</Option>
                <Option value={true}>Đã duyệt</Option>
                <Option value={false}>Chưa duyệt</Option>
              </Select>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <Select
                value={filterListBlog.tags}
                onChange={(value) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    tags: value,
                  }));
                }}
                className="w-full"
              >
                <Option value="">Tất cả</Option>
                <Option value="attraction">Địa điểm</Option>
                <Option value="hotel">Lưu trú</Option>
              </Select>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>

            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <InputDebounce
                className="no-spinner"
                type="date"
                width={120}
                value={filterListBlog.createdAt}
                onChange={(e) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    createdAt: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
              <Select
                value={filterListBlog.isTrending}
                onChange={(value) => {
                  setFilterListBlog((pre) => ({
                    ...pre,
                    isTrending: value,
                  }));
                }}
                className="w-full"
              >
                <Option value="">Tất cả</Option>
                <Option value="attraction">Nổi bật</Option>
                <Option value="hotel">Thường</Option>
              </Select>{' '}
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className=" z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            {user.roles === 'admin' && (
              <td className=" z-[5] bg-white border border-l-0 border-t-0  border-gray-300 p-2 relative  text-center">
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
              </td>
            )}
          </tr>
          {listBlogs?.length > 0 ? (
            listBlogs.map((e, i) => {
              return (
                <tr
                  key={i}
                  className={clsx(
                    'text-black_main text-[0.8rem] font-normal transition-all duration-150 text-xs',
                  )}
                >
                  <td className="z-[10]  border  text-center  border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                    <Checkbox
                      sx={{ color: 'rgba(4, 132, 172, 1)' }}
                      checked={checkedItem.includes(e._id)}
                      onChange={(event) => {
                        if (event.target.checked) {
                          setCheckedItem((pre) => [...pre, e._id]);
                        } else {
                          setCheckedItem((pre) =>
                            pre.filter((item) => item !== e._id),
                          );
                        }
                      }}
                      className="w-5 h-5 cursor-pointer "
                    />

                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  border  text-center  border-gray-300  border-l-1 border-t-0 p-2  w-[40px] relative">
                    {i + 1}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>

                  <td className="z-[10] capitalize text-center border border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    {e.title}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  text-center border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    {e.author}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  border  text-center   border-gray-300 border-l-0 border-t-0 p-2  relative">
                    <p
                      dangerouslySetInnerHTML={{ __html: e.content }}
                      className="truncate"
                    ></p>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10] font-semibold text-center  border  border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    {e.unitCode}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  text-center font-medium  border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    <span
                      className={clsx(
                        e.isActive !== true ? 'text-red-600' : 'text-green-600',
                      )}
                    >
                      {e.isActive === true ? 'Hiển thị' : 'Đang ẩn'}
                    </span>

                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  text-center font-medium  border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    <span
                      className={clsx(
                        e?.isApprove !== true
                          ? 'text-red-600'
                          : 'text-green-600',
                      )}
                    >
                      {e?.isApprove === true ? 'Đã duyệt' : 'Chưa duyệt'}
                    </span>

                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  border text-center  border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    {e.tags === '' && 'Tất cả'}
                    {e.tags === 'attraction' && 'Địa điểm du lịch'}
                    {e.tags === 'hotel' && 'Nơi lưu trú'}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  border text-center  border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                    {e.createdAt}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  <td className="z-[10]  border text-center font-medium  border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    {e.isTrending === true ? (
                      <span className="text-blue_main_sub">Nổi bật</span>
                    ) : (
                      <span className="text-yellow_main">Thường</span>
                    )}
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>

                  <td className="z-[10]  border   border-gray-300 border-l-0 border-t-0 p-2  w-[100px] relative">
                    <div className="w-auto flex flex-col items-center justify-center gap-y-1">
                      <div className="flex gap-x-1">
                        <Icon
                          onClick={() => {
                            setOpenViewBlog({
                              status: true,
                              content: e.content,
                              title: e.title,
                            });
                          }}
                          tooltip="Xem"
                        >
                          <MdRemoveRedEye className="text-blue_main_sub" />
                        </Icon>

                        <Icon
                          onClick={() => {
                            navigate('/blogs/edit?slug=' + e.slug);
                          }}
                          tooltip="Sửa"
                        >
                          <MdEdit className="text-yellow_main" />
                        </Icon>
                        <Icon
                          onClick={() => {
                            handleDelete([e._id]);
                          }}
                          tooltip="Xóa"
                        >
                          <MdDeleteOutline className="text-red-600" />
                        </Icon>
                        {e.isActive === true ? (
                          <Icon
                            className="w-fit text-purple-500 "
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isActive: false },
                                id: e._id,
                              });
                            }}
                            tooltip="Ẩn"
                          >
                            <MdLockOutline />
                          </Icon>
                        ) : (
                          <Icon
                            className="w-fit text-green_main"
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isActive: true },
                                id: e._id,
                              });
                            }}
                            tooltip="Hiển thị"
                          >
                            <MdLockOpen />
                          </Icon>
                        )}
                      </div>
                    </div>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                  {user.roles === 'admin' && (
                    <td className="z-[10]  border text-center  border-gray-300 border-l-0 border-t-0 p-2  w-[40px] relative">
                      <div className="flex flex-col items-start gap-y-1">
                        {e?.isApprove === false ? (
                          <Button
                            className="text-green_main text-xs"
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isApprove: true },
                                id: e._id,
                              });
                            }}
                          >
                            Duyệt
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isApprove: false },
                                id: e._id,
                              });
                            }}
                            className="text-red-500 text-xs"
                          >
                            Hủy duyệt
                          </Button>
                        )}
                        {e.isTrending === false ? (
                          <Button
                            className="text-blue_main_sub text-xs
                            "
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isTrending: true },
                                id: e._id,
                              });
                            }}
                          >
                            Đặt nổi bật
                          </Button>
                        ) : (
                          <Button
                            onClick={() => {
                              handleUpdateStatus({
                                value: { isTrending: false },
                                id: e._id,
                              });
                            }}
                            className="text-red-500 text-xs"
                          >
                            Hủy nổi bật
                          </Button>
                        )}
                      </div>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                      <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                      <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                    </td>
                  )}
                </tr>
              );
            })
          ) : (
            <tr className="bg-white border border-l-1 border-gray-300   p-2 font-semibold relative 0">
              <td colSpan={12} className="p-2 border border-gray-300">
                Danh sách trống
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalViewBlog open={openViewBlog} setOpen={setOpenViewBlog} />
    </div>
  );
};

export default ListBlogViews;
