import Loader from '@/common/Loader';
import MessNotify from '@/components/MessNotify/MessNotify';
import { postBlog } from '@/services/api/blog';
import { delImageOnCloundinary } from '@/services/api/image';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateBlogViews from './CreateBlogViews';
import { QUERY_KEY_BLOG } from '@/configs/QuerykeyStore';
const CreateBlog = () => {
  const [content, setContent] = useState('');
  const [isDraft, setIsDarft] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const getImageUrls = (content) => {
    const regex = /<img[^>]+src="(https:\/\/res\.cloudinary\.com[^"]+)"/g;
    const matches = [];
    let match;

    while ((match = regex.exec(content)) !== null) {
      matches.push(match[1]);
    }

    return matches;
  };

  const mutationDelImg = useMutation({ mutationFn: delImageOnCloundinary });
  const mutaionPostBlog = useMutation({ mutationFn: postBlog });
  // handle cancel => remove ảnh đã tải lên cloundinary
  const handleCancel = async () => {
    const imageUrls = getImageUrls(value);
    const idDelete = [];
    for (const url of imageUrls) {
      const publicId = url.split('/').pop().split('.')[0];
      idDelete.push(publicId);
    }
    mutationDelImg.mutate(idDelete, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          navigate('/blogs');
          setValue('');
          MessNotify.success('Hủy thành công');
        }
      },
      onError: async (error) => {
        MessNotify.error('Lỗi khi xóa ảnh', error);
      },
    });
  };
  const handlePostBlog = (data) => {
    const req = {
      ...data,
      content,
      author: user.lastname + ' ' + user.firstname,
      unitCode: user.idCode,
      unitName: user.infoUnit.unitName,
      email: user.email,
    };

    mutaionPostBlog.mutate(req, {
      onSuccess: async (res) => {
        if (res.status === 201) {
          MessNotify.success('Tạo thành công bài viết');
          setContent('');
          queryClient.invalidateQueries(QUERY_KEY_BLOG.GET_ALL);
          navigate('/blogs');
        }
      },
      onError: async () => {
        MessNotify.error('Tạo mới không thành công');
      },
    });
  };
  if (
    mutationDelImg.isPending ||
    mutationDelImg.isLoading ||
    mutaionPostBlog.isPending
  ) {
    return <Loader />;
  }
  return (
    <CreateBlogViews
      isDraft={isDraft}
      setIsDarft={setIsDarft}
      content={content}
      setContent={setContent}
      handlePostBlog={handlePostBlog}
      handleCancel={handleCancel}
    />
  );
};

export default CreateBlog;
