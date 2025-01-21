import { Button, Modal } from 'antd';
import React from 'react';

export const ModalViewBlog = ({ open, setOpen }) => {
  return (
    <Modal
      open={open.status}
      cancelText=""
      onCancel={() => {
        setOpen({
          status: false,
          content: '',
          tittle: '',
        });
      }}
      className="min-w-[60vw] flex flex-col gap-y-3 z-[29]"
    >
      <Button>Chỉnh sửa bài viết</Button>

      <h1 className="text-[1.4rem] font-medium mb-6 capitalize text-center">
        {open.title}
      </h1>
      <div
        dangerouslySetInnerHTML={{ __html: open.content }}
        className="w-full min-h-[40vh]"
      ></div>
    </Modal>
  );
};
