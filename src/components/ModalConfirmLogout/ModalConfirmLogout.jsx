import React from 'react';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../contexts/Redux/AuthSlice';
const ModalConfirmLogout = ({ isModalOpen, setIsModalOpen }) => {
  const nagigate = useNavigate();
  return (
    <Modal
      title="Đăng xuất"
      open={isModalOpen}
      centered
      okText={<span className="text-black hover:text-white">Đăng xuất</span>}
      onOk={() => {
        setIsModalOpen(false);
        localStorage.removeItem('accessToken');
        Cookies.remove('userId');
        Cookies.remove('refreshToken');
        logout();
        nagigate('/auth/signin');
      }}
      onCancel={() => {
        setIsModalOpen(false);
      }}
      className="text-black"
    >
      <h3
        className="text-[1rem]"
        onClick={() => {
          console.log(1);
        }}
      >
        Bạn chắc chắn muốn đăng xuất không?
      </h3>
    </Modal>
  );
};
export default ModalConfirmLogout;
