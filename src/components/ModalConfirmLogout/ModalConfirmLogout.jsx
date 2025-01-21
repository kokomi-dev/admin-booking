import clsx from 'clsx';
import React from 'react';

const ModalConfirmLogout = ({ isModalOpen, setIsModalOpen }) => {
  return (
    <div
      hidden={isModalOpen}
      className={clsx(
        ' inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50',
        isModalOpen === false ? 'fixed' : 'none',
      )}
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Đăng xuất</h2>
        <p className="text-sm text-gray-700 mb-6">
          Bạn chắc chắn muốn đăng xuất không?
        </p>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            onClick={() => setIsModalOpen(false)}
          >
            Hủy
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              setIsModalOpen(false);
              // Thêm logic xử lý đăng xuất tại đây
              console.log('Đã đăng xuất');
            }}
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmLogout;
