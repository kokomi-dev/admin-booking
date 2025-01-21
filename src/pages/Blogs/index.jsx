import Loader from '@/common/Loader';
import { QUERY_KEY_BLOG } from '@/configs/QuerykeyStore';
import { deleteBlogs, editBlog, getAllBlog } from '@/services/api/blog';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import BlogView from './BlogViews';
import MessNotify from '@/components/MessNotify/MessNotify';
import { useMemo, useState } from 'react';

const BlogPage = () => {
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();
  const [checkedItem, setCheckedItem] = useState([]);
  const [filterListBlog, setFilterListBlog] = useState({
    unitCode: '',
    unitName: '',
    title: '',
    content: '',
    author: '',
    tags: '',
    createdAt: '',
    updatedAt: '',
    isTrending: null,
    isDraft: null,
    isActive: null,
    isApprove: null,
    likes: 0,
    comments: [],
  });
  const { data: listBlogs, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BLOG.GET_ALL],
    queryFn: async () => {
      const data = await getAllBlog({
        roles: user.roles,
        unitCode: user.idCode,
        isDraft: false,
      });
      if (data.status === 200) {
        return data.data.listBlogs;
      }
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!user && user.roles !== undefined && user.unitCode !== '',
  });

  // handle event
  const mutationUpdateBlog = useMutation({
    mutationFn: editBlog,
  });
  const mutationDeleteBlog = useMutation({
    mutationFn: deleteBlogs,
  });
  const handleUpdateStatus = (data) => {
    mutationUpdateBlog.mutate(data, {
      onSuccess: async (res) => {
        if (res && res.status === 200) {
          MessNotify.success('Cập nhật thành công');
          queryClient.invalidateQueries(QUERY_KEY_BLOG.GET_ALL);
        }
      },
      onError: async (error) => {
        MessNotify.error(error);
      },
    });
  };
  const handleDelete = (idArr) => {
    mutationDeleteBlog.mutate(idArr, {
      onSuccess: async (res) => {
        if (res && res.status === 200) {
          MessNotify.success(res.data.message);
          queryClient.invalidateQueries(QUERY_KEY_BLOG.GET_ALL);
        }
      },
      onError: async (error) => {
        MessNotify.error(error);
      },
    });
  };

  const _dataListBlog = useMemo(() => {
    if (!listBlogs) return [];

    if (listBlogs.length > 0) {
      return listBlogs.filter((item) => {
        return Object.keys(filterListBlog).every((key) => {
          const filterValue = filterListBlog[key];
          const itemValue = item[key];
          if (
            filterValue === null ||
            filterValue === undefined ||
            filterValue === ''
          )
            return true;
          if (typeof filterValue === 'boolean') {
            return filterValue === Boolean(itemValue);
          }
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }

    return [];
  }, [listBlogs, filterListBlog]);

  if (
    isLoading ||
    mutationUpdateBlog.isPending ||
    mutationDeleteBlog.isPending
  ) {
    return <Loader />;
  }
  return (
    <BlogView
      handleDelete={handleDelete}
      listBlogs={_dataListBlog}
      handleUpdateStatus={handleUpdateStatus}
      checkedItem={checkedItem}
      setCheckedItem={setCheckedItem}
      filterListBlog={filterListBlog}
      setFilterListBlog={setFilterListBlog}
      user={user}
    />
  );
};

export default BlogPage;
