import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import { Button, Select } from 'antd';
import { MdAdd, MdLockOutline, MdOutlineDeleteOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import ListBlogViews from './ListBlogViews';

const BlogView = ({
  listBlogs,
  handleUpdateStatus,
  handleDelete,
  checkedItem,
  setCheckedItem,
  filterListBlog,
  setFilterListBlog,
  user,
}) => {
  const navigate = useNavigate();
  const { Option } = Select;
  return (
    <div className="w-full h-ful">
      <Breadcrumb pageName="Danh sách bài viết đã đăng" />
      <div className="flex flex-col gap-y-4 mt-8">
        <div className="flex items-center justify-between">
          <div className="min-w-fit text-black flex gap-3 justify-start items-center flex-wrap">
            <span>Tìm kiếm: </span>
            <div className="min-w-[100px] flex justify-start items-center gap-2 ">
              <Select className="w-full">
                <Option value="2025">2025</Option>
                <Option value="2024">2024</Option>
                <Option value="2023">2023</Option>
              </Select>
            </div>

            <div className="min-w-[120px] flex justify-start items-center gap-2">
              <Select className="w-full">
                <Option value="Tất cả">Tất cả</Option>
                <Option value="Địa điểm du lịch">Địa điểm du lịch</Option>
                <Option value="Nơi lưu trú">Nơi lưu trú</Option>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-start gap-x-2">
            <Button
              onClick={() => {
                navigate('/blogs/create');
              }}
              className="bg-blue_main_sub text-white"
            >
              <MdAdd />
              Thêm mới
            </Button>
            <Button
              disabled={checkedItem.length === 0}
              className="bg-yellow text-white border-none"
            >
              <MdLockOutline />
              Hiển thị nhiều
            </Button>

            <Button
              disabled={checkedItem.length === 0}
              className="bg-red-500 text-white border-none"
              onClick={() => {
                handleDelete(checkedItem);
              }}
            >
              <MdOutlineDeleteOutline />
              Xóa nhiều
            </Button>
          </div>
        </div>
        <ListBlogViews
          user={user}
          handleDelete={handleDelete}
          listBlogs={listBlogs}
          handleUpdateStatus={handleUpdateStatus}
          checkedItem={checkedItem}
          setCheckedItem={setCheckedItem}
          filterListBlog={filterListBlog}
          setFilterListBlog={setFilterListBlog}
        />
      </div>
    </div>
  );
};

export default BlogView;
