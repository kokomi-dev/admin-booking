import { addRoomHotel, updateRoomHotel } from '@/services/api/hotel';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Checkbox, Form, Input, InputNumber, Modal } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useEffect, useState } from 'react';
import MessNotify from '../MessNotify/MessNotify';
import { QUERY_KEY_HOTEL } from '@/configs/QuerykeyStore';
import Loader from '@/common/Loader';
import { data } from 'autoprefixer';

const ModalEditListRoomView = ({ isOpen, setIsOpen }) => {
  const queryClient = useQueryClient();
  const { dataEdit, type, status } = isOpen;
  const isEdit = isOpen.type === 1 && isOpen.dataEdit;
  const [countDetail, setCountDetail] = useState(1);
  const [infoRoom, setInfoRoom] = useState({
    name: '',
    price: '',
    sale: '',
    details: '',
    numberPeople: '',
    numberOfRoom: '',
    isAddChildren: '',
  });
  useEffect(() => {
    if (isEdit) {
      setInfoRoom({
        name: dataEdit.name,
        price: dataEdit.price,
        sale: dataEdit.sale,
        details: dataEdit.details,
        numberPeople: dataEdit.numberPeople,
        numberOfRoom: dataEdit.numberOfRoom,

        isAddChildren: dataEdit.isAddChildren,
      });
      setCountDetail(dataEdit.details?.length || 0);
    }
  }, [isOpen]);
  const mutationAddRoomHotel = useMutation({
    mutationFn: addRoomHotel,
  });
  const mutationEditRoomHotel = useMutation({
    mutationFn: updateRoomHotel,
  });
  const handleSubmitForm = async () => {
    try {
      if (isEdit) {
        mutationEditRoomHotel.mutate(
          {
            id: isOpen.idHotel,
            data: {
              id: dataEdit._id,
              data: {
                'listRooms.$.name': infoRoom.name,
                'listRooms.$.price': infoRoom.price,
                'listRooms.$.sale': infoRoom.sale,
                'listRooms.$.details': infoRoom.details,
                'listRooms.$.numberPeople': infoRoom.numberPeople,
                'listRooms.$.numberOfRoom': infoRoom.numberOfRoom,
                'listRooms.$.isAddChildren': infoRoom.isAddChildren,
              },
            },
          },
          {
            onSuccess: async (res) => {
              if (res.status === 200) {
                queryClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
                MessNotify.success(res.data.message);
                setIsOpen({ status: false, dataEdit: null, type: '' });
              }
            },
            onError: async (err) => {
              MessNotify.error('Lỗi khi sửa phòng. Liên hệ quản trị viên');
            },
          },
        );
      } else {
        mutationAddRoomHotel.mutate(
          {
            id: dataEdit.id,
            data: infoRoom,
          },
          {
            onSuccess: async (res) => {
              if (res.status === 200) {
                MessNotify.success('Thêm thông tin phòng thành công');
                setIsOpen({ status: false, dataEdit: null, type: '' });
                setInfoRoom({
                  name: '',
                  price: '',
                  sale: '',
                  details: '',
                  numberPeople: '',
                  isAddChildren: '',
                });
                queryClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
              }
            },
            onError: async (err) => {
              console.log(err);
              MessNotify.error('Lỗi' + err);
            },
          },
        );
      }
    } catch (error) {}
  };
  if (mutationAddRoomHotel.isPending) {
    return <Loader />;
  }
  return (
    <Modal
      open={isOpen.status}
      onCancel={() => {
        setIsOpen({ status: false, dataEdit: null, type: '' });
        setInfoRoom({
          name: '',
          price: '',
          sale: '',
          details: '',
          numberPeople: '',
          isAddChildren: '',
        });
      }}
      className="min-w-[50%] min-h-[400px]"
      okText={isEdit ? 'Cập nhật' : 'Thêm mới'}
      onOk={handleSubmitForm}
      cancelText="Hủy"
    >
      <div className="flex flex-col gap-y-4">
        <h1 className="text-[1.1rem] font-semibold">
          {isEdit ? 'Chỉnh sửa thông tin phòng' : 'Nhập thông tin phòng'}
        </h1>
        <Form>
          <Form.Item>
            <div className="border-[1px] border-[#999] p-2 flex flex-col gap-y-2">
              <div>
                <label>Tên loại phòng </label>
                <Input
                  value={infoRoom.name}
                  onChange={(e) => {
                    const { value } = e.target;
                    setInfoRoom((pre) => ({
                      ...pre,
                      name: value,
                    }));
                  }}
                />
              </div>
              <TextArea
                placeholder={`Mô tả `}
                name={`description`}
                rows={4}
                className="mb-2"
                value={infoRoom.details}
                onChange={(e) => {
                  const { value } = e.target;
                  setInfoRoom((pre) => ({
                    ...pre,
                    details: value,
                  }));
                }}
                rules={[
                  {
                    required: true,
                    message: 'Nhập mô tả ',
                  },
                ]}
              />
              <div className="flex gap-x-2 items-center">
                <label>Số phòng hiện có:</label>
                <InputNumber
                  value={infoRoom.numberOfRoom}
                  min={0}
                  onChange={(e) => {
                    setInfoRoom((pre) => ({
                      ...pre,
                      numberOfRoom: e,
                    }));
                  }}
                />
              </div>
              <div className="flex items-center gap-x-2">
                <div>
                  <label>Giá tiền</label>
                  <InputNumber
                    value={isEdit ? dataEdit.price : infoRoom.price}
                    min={0}
                    onChange={(e) => {
                      setInfoRoom((pre) => ({
                        ...pre,
                        price: e,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label>Số lượng người / phòng</label>
                  <InputNumber
                    value={infoRoom.numberPeople}
                    min={1}
                    onChange={(e) => {
                      setInfoRoom((pre) => ({
                        ...pre,
                        numberPeople: e,
                      }));
                    }}
                  />
                </div>
                <div>
                  <label>Giảm giá</label>
                  <InputNumber
                    value={infoRoom.sale}
                    min={1}
                    onChange={(e) => {
                      setInfoRoom((pre) => {
                        return {
                          ...pre,
                          sale: e,
                        };
                      });
                    }}
                  />
                </div>
                <div>
                  <label>Được thêm trẻ em</label>
                  <Checkbox
                    value={infoRoom.isAddChildren}
                    onChange={(e) => {
                      const { checked } = e.target;
                      setInfoRoom((pre) => {
                        return {
                          ...pre,
                          isAddChildren: checked,
                        };
                      });
                    }}
                  />
                </div>
              </div>
            </div>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default ModalEditListRoomView;
