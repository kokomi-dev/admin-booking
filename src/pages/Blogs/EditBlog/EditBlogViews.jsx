import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import EditorWrapper from '@/components/Editor/Editor';
import MessNotify from '@/components/MessNotify/MessNotify';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';

export default function EditBlogViews({
  detailBlog,
  content,
  setContent,
  handleCancel,
  handleEditBlog,
  navigate,
}) {
  const [isModified, setIsModified] = useState(false);

  useEffect(() => {
    if (content !== detailBlog.content) {
      setIsModified(true);
    } else {
      setIsModified(false);
    }
  }, [content, detailBlog.content]);
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb
        backPage="Danh sách bài viết"
        backPageLink="/blogs"
        pageName={`Chỉnh sửa bài viêt: ${detailBlog.title}`}
      />

      <Formik
        initialValues={{
          title: detailBlog?.title,
          tags: detailBlog?.tags,
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Nhập tiêu đề bài viết'),
        })}
        onSubmit={(data) => {
          if (!content) {
            return MessNotify.error('Nhập nội dung bài viết');
          }
          handleEditBlog({
            ...data,
          });
        }}
      >
        {({ errors, touched, values, initialValues }) => {
          useEffect(() => {
            const isFormModified =
              JSON.stringify(values) !== JSON.stringify(initialValues);
            setIsModified(isFormModified || content !== detailBlog.content);
          }, [values, initialValues, content, detailBlog.content]);
          return (
            <Form className="flex flex-col gap-y-3 ">
              <label>Nhập tiêu đề bài viết:</label>
              <Field
                className="h-[32px] rounded p-1 px-3 max-w-[40%]"
                placeholder="Nhập tiêu đề"
                name="title"
              />
              <ErrorMessage
                className="text-red-500"
                name="title"
                component="p"
              />
              <label>Chon thể loại nội dung:</label>

              <Field
                name="tags"
                as="select"
                className="h-[32px] rounded p-1 px-3 max-w-[40%]"
                placeholder="Chọn thể loại"
              >
                <option value="">Tất cả</option>
                <option value="attraction">Địa điểm du lịch</option>
                <option value="hotel">Nơi lưu trú</option>
              </Field>
              <EditorWrapper
                defaultValue={detailBlog.content}
                value={content}
                setValue={setContent}
              />
              <p className="text-black_main">
                <span className="text-red-600 font-medium text-[1rem]">
                  Lưu ý:
                </span>{' '}
                {''}
                Bài viết của bạn sẽ cần được đội ngũ của chúng tôi phê duyệt
                trong vòng 12 giờ. Nếu quá 12h không nhận được phản hồi về bài
                viết này từ lúc đăng vui lòng liên hệ với:{' '}
                <a
                  href="mailto:nguyenthean12062002@gmail.com"
                  className="text-blue_main_sub hover:underline "
                >
                  nguyenthean12062002@gmail.com
                </a>{' '}
                hoặc hotline:
                <a href="tel:+0961563714" className="text-blue_main_sub">
                  {' '}
                  0912384747
                </a>
              </p>
              <div className="flex items-start justify-between">
                <Button
                  htmlType="submit"
                  className="bg-red-400 text-white"
                  onClick={() => {
                    navigate('/blogs');
                  }}
                >
                  Quay lại
                </Button>
                <div className="flex items-center justify-start gap-x-2">
                  <Button
                    disabled={!isModified}
                    htmlType="submit"
                    className="bg-bg_primary_blue_sub text-white"
                  >
                    Chỉnh sửa bài viết
                  </Button>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
