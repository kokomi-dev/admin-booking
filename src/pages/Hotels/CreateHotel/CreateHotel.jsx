import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Select,
} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import { toast } from 'react-toastify';
import { addHotel } from '../../../services/hotel';
import {
  getNameCommune,
  getNameDistrict,
  getNameProvince,
} from '../../../utils/location';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
const { TextArea } = Input;

const CreateHotel = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);

  const dispatch = useDispatch();
  const { Option } = Select;

  const [file, setFile] = useState([]);

  const [countIncludes, setCountIncludes] = useState(0);
  const [included, setIncluded] = useState([]);

  const [countHighlight, setCountHighlight] = useState(0);
  const [highlights, setHighlights] = useState([]);
  const [cancelFree, setCancelFree] = useState(false);

  const [countRoom, setCountRoom] = useState(1);
  const [infoRoom, setInfoRoom] = useState([]);

  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistricts] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [detail, setDetail] = useState('');
  const [full, setFull] = useState();
  const [searchProvinces, setSearchProvinces] = useState({
    id: '',
    name: '',
  });
  useEffect(() => {
    const getProvince = async () => {
      const data = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
      const res = await data.json();
      if (res.error !== 0) {
        return alert('Lỗi khi lấy tỉnh thành');
      } else {
        setListProvinces(res.data);
      }
    };
    getProvince();
  }, [dispatch]);
  useEffect(() => {
    const newInfoRoom = Array.from({ length: countRoom }, (_) => ({
      name: '',
      detail: '',
      price: 0,
      numberPeople: 1,
      sale: 0,
      isAddChildren: false,
    }));
    setInfoRoom(newInfoRoom);
  }, [countRoom]);
  const [hiddenModal, setHiddenModal] = useState(true);
  const ModalListProvinces = () => {
    return (
      <ul
        hidden={hiddenModal}
        className="max-h-[30vh] overflow-y-auto absolute top-[40px] z-10 right-0 w-[300px] bg-white text-black shadow-2xl"
      >
        {listProvinces
          .filter((province) =>
            province.name
              .toLowerCase()
              .includes(
                searchProvinces.name?.toLowerCase()
                  ? searchProvinces.name?.toLowerCase()
                  : ' ',
              ),
          )
          .map((province, index) => {
            return (
              <li
                key={index}
                value={province.name}
                className="p-1 hover:cursor-pointer hover:bg-slate-200 pl-3"
                onMouseDown={() => {
                  setSearchProvinces({
                    id: province.id,
                    name: province.name,
                  });
                  getDistricts(province.id);
                }}
              >
                {province.name}
              </li>
            );
          })}
      </ul>
    );
  };
  const getDistricts = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return alert('Lỗi khi lấy quận/huyện thành');
    } else {
      setListDistricts(res.data);
    }
  };
  const getCommune = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return alert('Lỗi khi xã/ phường thành');
    } else {
      setListCommune(res.data);
    }
  };
  const getLocation = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return alert('Lỗi khi lấy thông tin cụ thể');
    } else {
      return setFull(res.data);
    }
  };
  // handle request to server
  const handleSubmit = async (value) => {
    const provinceName = await getNameProvince(full.tinh);
    const districtName = await getNameDistrict(full.tinh, full.quan);
    const communeName = await getNameCommune(full.quan, full.phuong);
    const formData = new FormData();

    formData.append('name', value.name);
    formData.append('details', value.description);
    formData.append('cancelFree', cancelFree);
    formData.append('type', value.type);

    formData.append('location_detail', `${detail}`);
    formData.append('location_province_id', full.tinh);
    formData.append('location_district_id', full.quan);
    formData.append('location_commune_id', full.phuong);
    formData.append('location_province_name', provinceName);
    formData.append('location_district_name', districtName);
    formData.append('location_commune_name', communeName);
    formData.append('city', searchProvinces.name);
    infoRoom.forEach((room, index) => {
      formData.append(`infoRoom[${index}][name]`, room.name);
      formData.append(`infoRoom[${index}][detail]`, room.detail);
      formData.append(`infoRoom[${index}][price]`, room.price);
      formData.append(`infoRoom[${index}][numberPeople]`, room.numberPeople);
      formData.append(`infoRoom[${index}][sale]`, room.sale);
      formData.append(`infoRoom[${index}][isAddChildren]`, room.isAddChildren);
    });

    included.forEach((item) => formData.append('includes[]', item));
    highlights.forEach((item) => formData.append('highlights[]', item));

    formData.append('comments', []);
    formData.append('rating', value.rating);

    [...file].forEach((imageFile) => {
      formData.append('images', imageFile);
    });
    const res = await addHotel(formData, dispatch);
    console.log(res);
    if (res.code === 201) {
      return toast.success('tạo mới thành công');
    } else {
      return toast.warning('tạo mới lỗi');
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Tạo mới lưu trú" />
      <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 19,
        }}
        labelAlign="left"
        layout="horizontal"
        style={{ width: '100%', alignItems: 'start' }}
        className="text-start"
        autoComplete="false"
        onFinish={handleSubmit}
        onFinishFailed={(err) => {
          console.log(err);
        }}
      >
        <Form.Item
          label="Tên"
          name="name"
          rules={[
            {
              required: true,
              message: 'Nhập tên!',
            },
          ]}
        >
          <Input name="name" />
        </Form.Item>
        <Form.Item
          label="Mô tả"
          name="description"
          rules={[
            {
              required: true,
              message: 'Nhập mô tả!',
            },
          ]}
        >
          <TextArea rows={6} name="description" />
        </Form.Item>
        <Form.Item label="Loại lưu trú" name="type">
          <Select name="type">
            <Option value={1}>Homstay</Option>
            <Option value={2}>Nhà nghỉ</Option>
            <Option value={3}>Khách sạn</Option>
            <Option value={4}>Biệt thự</Option>
            <Option value={5}>Căn hộ</Option>
            <Option value={6}>Khu cắm trại</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Hủy miễn phí"
          valuePropName="checked"
          rules={[
            {
              required: true,
              message: 'Chọn!',
            },
          ]}
        >
          <Checkbox
            className="select-none"
            onChange={(e) => {
              setCancelFree(e.target.checked);
            }}
            checked={cancelFree}
          ></Checkbox>
        </Form.Item>

        <Form.Item label="Địa chỉ" name="location">
          <Row gutter={16}>
            <Col className="relative">
              <Input
                name="province"
                placeholder="Tỉnh"
                value={searchProvinces.name}
                onChange={(e) => {
                  setSearchProvinces({
                    ...searchProvinces,
                    name: e.target.value,
                  });
                }}
                onFocus={() => {
                  setHiddenModal(false);
                }}
                onBlur={() => {
                  setHiddenModal(true);
                }}
                rules={[
                  {
                    required: true,
                    message: 'Nhập tỉnh thành!',
                  },
                ]}
              />
              <ModalListProvinces />
            </Col>
            <Col span={6}>
              <Select
                className="w-full"
                onChange={(e) => {
                  getCommune(e);
                }}
                rules={[
                  {
                    required: true,
                    message: 'Chọn huyện!',
                  },
                ]}
              >
                {listDistrict.map((district, index) => {
                  return (
                    <Option key={index} value={district.id}>
                      {district.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col span={6}>
              <Select
                className="w-full"
                onSelect={(e) => {
                  getLocation(e);
                }}
                rules={[
                  {
                    required: true,
                    message: 'Chọn xã!',
                  },
                ]}
              >
                {listCommune.map((commune, index) => {
                  return (
                    <Option key={index} value={commune.id}>
                      {commune.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item label="Nhập địa chỉ chi tiết">
          <Input
            placeholder="Chi tiết"
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item label="Điểm nôi bật (số lượng)">
          <InputNumber
            onChange={(value) => {
              setCountHighlight(value);
            }}
            min={0}
          />
        </Form.Item>
        {countHighlight !== 0 && (
          <Form.Item label="Các diểm nổi bật ">
            {new Array(countHighlight).fill(0).map((_, index) => {
              return (
                <TextArea
                  key={index}
                  placeholder={`Điểm nổi bật  ${index + 1}`}
                  name={`highlight ${index + 1}`}
                  rows={2}
                  className="mb-2"
                  onChange={(e) => {
                    const { value } = e.target;
                    setHighlights((prevSchedule) => {
                      const newSchedule = [...prevSchedule];
                      newSchedule[index] = value;
                      return newSchedule;
                    });
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Nhập điểm nổi bật ' + index + 1 + ' này',
                    },
                  ]}
                />
              );
            })}
          </Form.Item>
        )}

        <Form.Item label="Tiện nghi (số lượng ) ">
          <InputNumber
            onChange={(value) => {
              setCountIncludes(value);
            }}
            min={0}
          />
        </Form.Item>
        {countIncludes !== 0 && (
          <Form.Item label="Các tiện  nghi ">
            {new Array(countIncludes).fill(0).map((_, index) => {
              return (
                <TextArea
                  key={index}
                  placeholder={`Tiện nghi  ${index + 1}`}
                  name={`included ${index + 1}`}
                  rows={2}
                  className="mb-2"
                  onChange={(e) => {
                    const { value } = e.target;
                    setIncluded((prevSchedule) => {
                      const newSchedule = [...prevSchedule];
                      newSchedule[index] = value;
                      return newSchedule;
                    });
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Nhập dịch vụ đi kèm ' + index + 1 + ' này',
                    },
                  ]}
                />
              );
            })}
          </Form.Item>
        )}

        <Form.Item label="Số loại  phòng">
          <InputNumber
            onChange={(value) => {
              setCountRoom(value);
              infoRoom.length = value;
            }}
            min={1}
          />
        </Form.Item>
        <Form.Item label="Thông tin các loại phòng">
          {new Array(countRoom).fill(0).map((_, index) => {
            return (
              <div className="border-[1px] border-[#999] p-2" key={index}>
                <div>
                  <label>Tên loại phòng {index + 1}</label>
                  <Input
                    onChange={(e) => {
                      const { value } = e.target;
                      setInfoRoom((pre) => {
                        const newVar = [...pre];
                        newVar[index].name = value;
                        return newVar;
                      });
                    }}
                  />
                </div>
                <TextArea
                  key={index}
                  placeholder={`Mô tả  ${index + 1}`}
                  name={`description ${index + 1}`}
                  rows={2}
                  className="mb-2"
                  onChange={(e) => {
                    const { value } = e.target;
                    setInfoRoom((pre) => {
                      const newVar = [...pre];
                      newVar[index].detail = value;
                      return newVar;
                    });
                  }}
                  rules={[
                    {
                      required: true,
                      message: 'Nhập mô tả ' + index + 1 + ' này',
                    },
                  ]}
                />
                <div className="flex items-center gap-x-2">
                  <div>
                    <label>Giá tiền</label>
                    <InputNumber
                      min={0}
                      onChange={(e) => {
                        setInfoRoom((pre) => {
                          const newVar = [...pre];
                          newVar[index].price = e;
                          return newVar;
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Số lượng người / phòng</label>
                    <InputNumber
                      min={1}
                      onChange={(e) => {
                        setInfoRoom((pre) => {
                          const newVar = [...pre];
                          newVar[index].numberPeople = e;
                          return newVar;
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Giảm giá</label>
                    <InputNumber
                      min={1}
                      onChange={(e) => {
                        setInfoRoom((pre) => {
                          const newVar = [...pre];
                          newVar[index].sale = e;
                          return newVar;
                        });
                      }}
                    />
                  </div>
                  <div>
                    <label>Được thêm trẻ em</label>
                    <Checkbox
                      onChange={(e) => {
                        const { checked } = e.target;
                        setInfoRoom((pre) => {
                          const newVar = [...pre];
                          newVar[index].isAddChildren = checked;
                          return newVar;
                        });
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </Form.Item>
        <Form.Item
          label="Ảnh "
          rules={[
            {
              required: true,
              message: 'Chọn đầy đủ ảnh theo yêu cầu!',
            },
          ]}
        >
          <input
            multiple
            type="file"
            placeholder="Chọn file"
            onChange={(e) => {
              setFile(e.target.files);
            }}
          />
        </Form.Item>

        <Form.Item label="Đánh giá ban đầu" name="rating">
          <Rate />
        </Form.Item>
        <Button
          type="primary"
          className="w-full h-auto py-2 bg-bg_primary_blue_sub text-white"
          htmlType="submit"
        >
          Tạo mới
        </Button>
      </Form>
    </div>
  );
};
export default CreateHotel;
