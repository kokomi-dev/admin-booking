import Loader from '@/common/Loader';
import MessNotify from '@/components/MessNotify/MessNotify';
import { QUERY_KEY_BLOG } from '@/configs/QuerykeyStore';
import { editBlog, getDetailBlog } from '@/services/api/blog';
import getImageUrls from '@/utils/getImageUrl';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import EditBlogViews from './EditBlogViews';
import { delImageOnCloundinary } from '@/services/api/image';

const EditBlog = () => {
  const [params] = useSearchParams();
  const slug = params.get('slug');

  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const queryClient = useQueryClient();

  const [content, setContent] = useState('');
  //   fetch data
  const { data: detailBlog, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BLOG.DETAIL],
    queryFn: async () => {
      const res = await getDetailBlog(slug);
      if (res.status === 200) {
        return res.data.detailBlog;
      }
    },
    retry: 3,
    retryDelay: 1000,
    enabled: !!slug,
  });
  useEffect(() => {
    if (detailBlog && detailBlog?.content) {
      setContent(detailBlog.content);
    }
  }, [detailBlog]);
  const mutaionEditBlog = useMutation({
    mutationFn: editBlog,
  });
  const mutationDelImg = useMutation({
    mutationFn: delImageOnCloundinary,
  });
  const handleEditBlog = (data) => {
    let req = {};
    //  không có sự thay đổi content
    if (content === detailBlog.content) {
      req = {
        ...data,
        content,
      };
    }
    //  có sự thay đổi content
    else {
      const imageUrls = getImageUrls(detailBlog.content);
      const idDelete = [];
      for (const url of imageUrls) {
        const publicId = url.split('/').pop().split('.')[0];
        idDelete.push(publicId);
      }
      mutationDelImg.mutate(idDelete, {
        onSuccess: async (res) => {
          if (res.status === 200) {
            console.log('thành công');
          }
        },
        onError: async (error) => {
          MessNotify.error('Lỗi khi xóa ảnh', error);
        },
      });
      req = {
        ...data,
        content,
      };
    }
    mutaionEditBlog.mutate(
      { value: req, id: detailBlog._id },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            setContent('');
            queryClient.invalidateQueries(QUERY_KEY_BLOG.DETAIL);
            MessNotify.success('Chỉnh sửa thành công bài viết');
          }
        },
        onError: async () => {
          MessNotify.error('Tạo mới không thành công');
        },
      },
    );
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <EditBlogViews
      content={content}
      setContent={setContent}
      detailBlog={detailBlog}
      handleEditBlog={handleEditBlog}
      navigate={navigate}
    />
  );
};

export default EditBlog;
