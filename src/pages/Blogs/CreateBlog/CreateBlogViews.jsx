import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import EditorWrapper from '@/components/Editor/Editor';
import MessNotify from '@/components/MessNotify/MessNotify';
import { Button } from 'antd';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import 'react-quill/dist/quill.snow.css';
import * as Yup from 'yup';

export default function CreateBlogViews({
  content,
  setContent,
  handlePostBlog,
  handleCancel,
  isDraft,
  setIsDarft,
}) {
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb
        backPage="Danh sách bài viết"
        backPageLink="/blogs"
        pageName="Tạo mới bài viết"
      />

      <Formik
        initialValues={{
          title: '',
          tag: '',
        }}
        validationSchema={Yup.object().shape({
          title: Yup.string().required('Nhập tiêu đề bài viết'),
        })}
        onSubmit={(data) => {
          if (!content) {
            return MessNotify.error('Nhập nội dung bài viết');
          }
          handlePostBlog({
            ...data,
            isDraft: isDraft,
          });
        }}
      >
        {({ errors, touched }) => (
          <Form className="flex flex-col gap-y-4 ">
            <div className="flex flex-col gap-y-1">
              <label className="font-normal text-[0.95rem]">
                Nhập tiêu đề bài viết:
              </label>
              <Field
                className="h-[36px] rounded p-1 px-3 max-w-[40%] text-[0.95rem] font-normal"
                placeholder="Nhập tiêu đề"
                name="title"
              />
              <ErrorMessage
                className="text-red-500"
                name="title"
                component="p"
              />
            </div>
            <div className="flex flex-col gap-y-1">
              <label className="text-[0.9rem] font-normal">
                Chọn thể loại nội dung:
              </label>

              <Field
                name="tag"
                as="select"
                className="h-[36px] rounded p-1 px-3 max-w-[40%] font-normal text-[0.9rem]"
                placeholder="Chọn thể loại"
              >
                <option value="">Tất cả</option>
                <option value="attraction">Địa điểm du lịch</option>
                <option value="hotel">Nơi lưu trú</option>
              </Field>
            </div>
            <EditorWrapper value={content} setValue={setContent} />

            <p className="text-black">
              <span className="text-red-600 font-medium text-[1rem]">
                Lưu ý:
              </span>{' '}
              {''}
              Bài viết của bạn sẽ cần được đội ngũ của chúng tôi phê duyệt trong
              vòng 12 giờ. Nếu quá 12h không nhận được phản hồi về bài viết này
              từ lúc đăng vui lòng liên hệ với:{' '}
              <a
                href="mailto:nguyenthean12062002@gmail.com"
                className="text-blue_sub hover:underline "
              >
                nguyenthean12062002@gmail.com
              </a>{' '}
              hoặc hotline:
              <a href="tel:+0961563714" className="text-blue_sub">
                {' '}
                0912384747
              </a>
            </p>
            <div className="flex items-start justify-between">
              <Button
                htmlType="submit"
                className="bg-red-400 text-white"
                onClick={handleCancel}
              >
                Hủy
              </Button>
              <div className="flex items-center justify-start gap-x-2">
                <Button
                  className="bg-yellow text-white"
                  htmlType="submit"
                  onClick={() => setIsDarft(true)}
                >
                  Lưu bản nháp
                </Button>
                <Button
                  htmlType="submit"
                  className="bg-blue_main_sub text-white"
                  onClick={() => setIsDarft(false)}
                >
                  Đăng bài viết
                </Button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
