import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import MessNotify from '@/components/MessNotify/MessNotify';
import ModalConfirmDelete from '@/components/ModalConfirmDelete/ModalConfirmDelete';
import ModalEditListRoomView from '@/components/ModalEditListRoomView/ModalEditListRoomView';
import { QUERY_KEY_HOTEL } from '@/configs/QuerykeyStore';
import { deleteRoomHotel, updateRoomHotel } from '@/services/api/hotel';
import formatVietnamCurrency from '@/utils/formatPrice';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Select, Tooltip } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import clsx from 'clsx';
import { Fragment, useState } from 'react';
import {
  MdDelete,
  MdEdit,
  MdLockOpen,
  MdLockOutline,
  MdOutlineFilterAltOff,
} from 'react-icons/md';

const HotelListRoomView = ({
  idHotel,
  listRoom,
  filterListRoom,
  setFilterListRoom,
}) => {
  const { Option } = Select;
  const queryClient = useQueryClient();
  const [isOpenEdit, setIsOpenEdit] = useState({
    status: false,
    dataEdit: null,
    type: '',
  });
  const [openDel, setOpenDel] = useState({
    status: false,
    idHotel: '',
    id: '',
  });
  const mutationUpdateRoomHotel = useMutation({
    mutationFn: updateRoomHotel,
  });
  const mutationDeleteRoomHotel = useMutation({
    mutationFn: deleteRoomHotel,
  });
  // update status room
  const handleUpdateChangeRoom = async (data) => {
    try {
      mutationUpdateRoomHotel.mutate(
        {
          id: idHotel,
          data: data,
        },
        {
          onSuccess: async (res) => {
            if (res.status === 200) {
              queryClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
              MessNotify.success('Cập nhật thành công');
            }
          },
          onError: async (error) => {
            MessNotify.error('Cập nhật không thành công. Liên hệ quản trị');
          },
        },
      );
    } catch (error) {
      console.log(error);
    }
  };
  // handle delete room
  const handleDeleteRoom = () => {
    mutationDeleteRoomHotel.mutate(
      {
        idHotel: openDel.idHotel,
        idRoom: openDel.id,
      },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            MessNotify.success('Xóa thành công phòng');
            queryClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
            setOpenDel({
              status: false,
              idHotel: '',
              id: '',
            });
          }
        },
        onError: async (error) => {
          MessNotify.error('Lỗi khi xóa phòng. Vui lòng liên hệ quản trị viên');
        },
      },
    );
  };
  return (
    <Fragment>
      <table className="table-auto w-full border-collapse border border-gray-300 bg-white ">
        <thead className="text-vs-theme-layout">
          <tr>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[50px]   ">
              STT
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[200px]   ">
              Tên
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[250px]   ">
              Chi tiết
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>

            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[50px]  ">
              Số người
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[100px]  ">
              Số phòng hiện có
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2 w-[100px]  ">
              Được thêm trẻ em
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[100px]   ">
              Giá
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[100px]   ">
              Giảm giá
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[100px]   ">
              Trạng thái
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
            <th className="z-[10] text-xs border text-vs-theme-layout border-gray-300 border-l-0 border-t-0 bg-uneti-primary relative p-2  w-[200px]   ">
              Tùy chọn
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="text-xs z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative  text-center">
              <Tooltip title={`Xóa bộ lọc`}>
                <button
                  className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-danger"
                  onClick={() => {
                    setFilterListRoom({
                      name: '',
                      price: '',
                      sale: '',
                      numberPeople: '',
                      isAddChildren: null,
                    });
                  }}
                >
                  <Icon>
                    <MdOutlineFilterAltOff />
                  </Icon>
                </button>
              </Tooltip>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>

            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <InputDebounce
                debountTimeOut={500}
                className="no-spinner"
                type="text"
                value={filterListRoom.name}
                onChange={(e) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    name: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <InputDebounce
                debountTimeOut={500}
                className="no-spinner"
                type="number"
                value={filterListRoom.numberPeople}
                onChange={(e) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    numberPeople: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <InputDebounce
                debountTimeOut={500}
                className="no-spinner"
                type="number"
                value={filterListRoom.numberOfRoom}
                onChange={(e) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    numberOfRoom: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <Select
                className="no-spinner w-[110px]"
                value={filterListRoom.isAddChildren}
                onChange={(value) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    isAddChildren: value,
                  }));
                }}
              >
                <Option value="">Tất cả</Option>
                <Option value={true}>Có</Option>
                <Option value={false}>Không</Option>
              </Select>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <InputDebounce
                debountTimeOut={500}
                className="no-spinner w-auto"
                type="number"
                value={filterListRoom.price}
                onChange={(e) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    price: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <InputDebounce
                debountTimeOut={500}
                className="no-spinner"
                type="number"
                value={filterListRoom.sale}
                onChange={(e) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    sale: e.target.value,
                  }));
                }}
              />
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative   text-center">
              <Select
                className="no-spinner w-[110px]"
                value={filterListRoom.isActive}
                onChange={(value) => {
                  setFilterListRoom((pre) => ({
                    ...pre,
                    isActive: value,
                  }));
                }}
              >
                <Option value="">Tất cả</Option>
                <Option value={true}>Hoạt động</Option>
                <Option value={false}>Không HĐ</Option>
              </Select>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
            <td className="text-xs z-[5] bg-white border border-gray-300 p-2 relative  text-center">
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
              <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
              <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
            </td>
          </tr>
          {listRoom.length > 0 ? (
            listRoom.map((e, i) => {
              return (
                <tr
                  key={i}
                  className={clsx(
                    e?.numberOfRoom === 0 && 'bg-red-200',
                    e?.numberOfRoom === undefined && 'bg-red-200',
                  )}
                >
                  <td className="z-[10] text-center text-xs border text-black font-normal border-gray-300 border-l-0 border-t-0 p-2 ">
                    {i + 1}
                  </td>
                  <td className="z-[10] font-semibold text-xs border text-black  border-gray-300 border-l-0 border-t-0 p-2 ">
                    {e.name}
                  </td>
                  <td className="z-[10] text-xs border text-black font-normal border-gray-300 border-l-0 border-t-0 p-2 ">
                    <ul className="list-disc pl-3">
                      {Array.isArray(e.details) ? (
                        e.details.map((item, i) => {
                          return <li key={i}>{item}</li>;
                        })
                      ) : (
                        <TextArea
                          value={e.details}
                          readOnly
                          autoSize={{ minRows: 1, maxRows: 6 }}
                          className="h-full overflow-auto border-none"
                        />
                      )}
                    </ul>
                  </td>

                  <td className="z-[10] text-blue_sub text-xs text-center border  font-semibold border-gray-300 border-l-0 border-t-0 p-2  ">
                    {e.numberPeople}
                  </td>
                  <td className="z-[10] text-blue_sub text-xs text-center border  font-semibold border-gray-300 border-l-0 border-t-0 p-2  ">
                    {e?.numberOfRoom}
                  </td>
                  <td className="z-[10] text-center text-xs border text-black font-normal border-gray-300 border-l-0 border-t-0 p-2 ">
                    {e.isAddChildren === true ? (
                      <span>Có</span>
                    ) : (
                      <span>Không</span>
                    )}
                  </td>
                  <td className="z-[10] text-xs text-center border text-black font-semibold border-gray-300 border-l-0 border-t-0 p-2  ">
                    {formatVietnamCurrency(e.price)}
                  </td>
                  <td className="z-[10]  text-xs text-center border text-green font-medium border-gray-300 border-l-0 border-t-0 p-2   ">
                    {e.sale} %
                  </td>
                  <td className="z-[10]  text-xs text-center border  font-medium border-gray-300 border-l-0 border-t-0 p-2   ">
                    {e?.isActive === true ? (
                      <span className="text-green">Hoạt động</span>
                    ) : (
                      <span className="text-red-600 font-medium">Không HĐ</span>
                    )}
                  </td>

                  <td className="z-[10] text-xs  text-center border text-black font-normal border-gray-300  border-t-0 p-2 relative  ">
                    <div className="w-full flex items-center justify-center gap-x-1 border-none">
                      <Icon
                        className="text-blue_sub"
                        tooltip="Sửa"
                        onClick={() =>
                          setIsOpenEdit({
                            status: true,
                            dataEdit: e,
                            idHotel: idHotel,
                            type: 1,
                          })
                        }
                      >
                        <MdEdit />
                      </Icon>
                      {e?.isActive === true ? (
                        <Icon
                          onClick={() => {
                            handleUpdateChangeRoom({
                              id: e._id,
                              data: {
                                'listRooms.$.isActive': false,
                              },
                            });
                          }}
                          className="text-purple-700"
                          tooltip="Dừng HĐ"
                        >
                          <MdLockOutline />
                        </Icon>
                      ) : (
                        <Icon
                          onClick={() => {
                            handleUpdateChangeRoom({
                              id: e._id,
                              data: {
                                'listRooms.$.isActive': true,
                              },
                            });
                          }}
                          className="text-green"
                          tooltip="Hoạt động"
                        >
                          <MdLockOpen />
                        </Icon>
                      )}
                      <Icon
                        onClick={() => {
                          setOpenDel({
                            status: true,
                            idHotel: idHotel,
                            id: e._id,
                          });
                        }}
                        className="text-red-600"
                        tooltip="Xóa"
                      >
                        <MdDelete />
                      </Icon>
                    </div>
                    <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                    <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative lg:sticky lg:left-0">
              <td
                colSpan={10}
                className="bg-white border border-gray-300 border-r-0 border-b-0 p-2 font-semibold relative xl:sticky xl:left-0"
              >
                Danh sách trống
                <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalEditListRoomView isOpen={isOpenEdit} setIsOpen={setIsOpenEdit} />
      <ModalConfirmDelete
        open={openDel.status}
        setOpen={() => {
          setOpenDel({
            status: false,
            idHotel: '',
            id: '',
          });
        }}
        text="chắc chẵn xóa không"
        okText="Xóa"
        onOK={handleDeleteRoom}
      />
    </Fragment>
  );
};

export default HotelListRoomView;
