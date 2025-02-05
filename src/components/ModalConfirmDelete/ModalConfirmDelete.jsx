import { Modal } from 'antd';
import React from 'react';

const ModalConfirmDelete = ({
  open,
  setOpen,
  text,
  okText,
  cancelText,
  onOK,
}) => {
  return (
    <Modal
      open={open}
      onCancel={() => {
        setOpen(false);
      }}
      okText={okText ?? 'Đồng ý'}
      cancelText={cancelText ?? 'Hủy'}
      centered
      onOk={onOK}
    >
      <div>
        <h2 className="text-[1.1rem] font-medium">Bạn có muốn {text}</h2>
      </div>
    </Modal>
  );
};

export default ModalConfirmDelete;
