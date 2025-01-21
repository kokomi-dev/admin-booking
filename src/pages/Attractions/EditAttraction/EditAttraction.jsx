import React, { useEffect, useState } from 'react';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Typography,
} from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_ATTRACTION } from '../../../configs/QuerykeyStore';
import {
  editAttracion,
  getDetailAttracion,
} from '../../../services/api/attraction';
import Loader from '../../../common/Loader';
import ShowImage from '../../../components/ShowImage/ShowImage';
import { getProvince } from '../../../services/api/location';
import {
  getNameCommune,
  getNameDistrict,
  getNameProvince,
} from '../../../utils/location';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

const EditAttraction = () => {
  const [params] = useSearchParams();
  const slug = params.get('slug');
  const queryClient = useQueryClient();
  const { Option } = Select;

  const [listDistrict, setListDistricts] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [searchProvinces, setSearchProvinces] = useState('');

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
  const [form] = Form.useForm();
  const [hiddenModal, setHiddenModal] = useState(true);
  const [full, setFull] = useState({});
  const [state, setState] = useState({
    detail: '',
    description: '',
    isTrending: null,
    cancelFree: null,
    duration: 1,
    price1: 0,
    price2: 0,
    countIncludes: 0,
    included: [],
    schedule: [],
    images: [],
    file: [],
    location: {},
  });

  const {
    data: detailAttraction,
    isLoading: isLoadingDetail,
    isSuccess: isSuccessDetailAttraction,
  } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.DETAIL, slug],
    queryFn: async () => {
      const res = await getDetailAttracion({ slug });
      if (res?.code === 200 && res?.data) {
        return res.data;
      } else {
        console.error('Lỗi khi lấy chi tiết địa điểm tham quan:', res);
        return null;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });

  const { data: listProvince, isSuccess: isSuccessListProvince } = useQuery({
    queryKey: ['GET_LIST_PROVINCE'],
    queryFn: async () => {
      const res = await getProvince();
      if (res.error === 0) {
        return res.data;
      } else {
        console.error('Lỗi khi lấy tỉnh thành:');
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  const fetchLocationDetails = async (id) => {
    const response = await fetch(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
    const result = await response.json();
    if (result.error !== 0) {
      alert('Lỗi khi lấy thông tin cụ thể');
    } else {
      setFull(result.data);
    }
  };
  useEffect(() => {
    if (isSuccessDetailAttraction && detailAttraction) {
      const location = detailAttraction.location || {};
      const includedItems = detailAttraction.included || [];

      const newState = {
        isTrending: detailAttraction.isTrending,
        cancelFree: detailAttraction.cancelFree,
        price1: detailAttraction.price[0],
        price2: detailAttraction.price[1],
        countIncludes: includedItems.length,
        included: includedItems,
        schedule: detailAttraction.schedule,
        images: detailAttraction.images,
        location: detailAttraction.location,
        detail: detailAttraction.location.detail,
        duration: detailAttraction.duration,
      };
      fetchLocationDetails(location.commune.id);
      setState(newState);
      const setInitValues = async () => {
        setSearchProvinces(location.province.name);
        const initialFormValues = {
          detail: location.detail,
          name: detailAttraction.name,
          description: detailAttraction.description,
          isTrending: detailAttraction.isTrending,
          cancelFree: detailAttraction.cancelFree,
          difficulty: detailAttraction.difficulty,
          maxGroupSize: detailAttraction.maxGroupSize,
          duration: detailAttraction.duration,
          location: {
            province: location.province.name,
            district: location.district.name,
            commune: location.commune.name,
          },
          guides: detailAttraction.guides,
          numberOfTicketsAdult: detailAttraction?.numberOfTickets.adult,
          numberOfTicketsChildren: detailAttraction?.numberOfTickets.children,
        };

        form.setFieldsValue(initialFormValues);
      };
      setInitValues();
    }
  }, [isSuccessDetailAttraction, detailAttraction, form]);

  const mutaionUpdateAttraction = useMutation({ mutationFn: editAttracion });
  const handleSubmit = async (value) => {
    const provinceName = await getNameProvince(full.tinh);
    const districtName = await getNameDistrict(full.tinh, full.quan);
    const communeName = await getNameCommune(full.quan, full.phuong);
    const formData = new FormData();
    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('isTrending', state.isTrending);
    formData.append('cancelFree', state.cancelFree);
    formData.append('difficulty', value.difficulty);
    formData.append('maxGroupSize', value.maxGroupSize);
    formData.append('guides', value.guides);
    formData.append('price[]', state.price1);
    formData.append('price[]', state.price2);
    state.images.forEach((item) => formData.append('images[]', item));

    formData.append('location_detail', `${state.detail}`);
    formData.append('location_province_id', full.tinh);
    formData.append('location_district_id', full.quan);
    formData.append('location_commune_id', full.phuong);
    formData.append('location_province_name', provinceName);
    formData.append('location_district_name', districtName);
    formData.append('location_commune_name', communeName);
    formData.append('duration', state.duration);
    state.schedule.forEach((item) => formData.append('schedule[]', item));
    state.included.forEach((item) => formData.append('included[]', item));
    state.file !== null ||
      (state.file !== undefined &&
        [...state.file].forEach((imageFile) => {
          formData.append('images', imageFile);
        }));

    mutaionUpdateAttraction.mutate(
      { formData, id: detailAttraction._id },
      {
        onSuccess: (data) => {
          if (data.code === 200) {
            toast.success('Chỉnh sửa thành công địa điểm tham quan');
            queryClient.invalidateQueries(QUERY_KEY_ATTRACTION.DETAIL);
          }
        },
        onError: (error) => {
          toast.error('Chỉnh sửa thất bại địa điểm tham quan', error);
        },
      },
    );
  };

  if (isLoadingDetail) {
    return <Loader />;
  }

  const ModalListProvinces = () => {
    return (
      <ul
        hidden={hiddenModal}
        className="max-h-[30vh] overflow-y-auto absolute top-[40px] z-10 right-0 w-[300px] bg-white text-black shadow-2xl"
      >
        {isSuccessListProvince &&
          listProvince
            .filter((province) =>
              province.name
                .toLowerCase()
                .includes(
                  searchProvinces.toLowerCase()
                    ? searchProvinces.toLowerCase()
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
                    setSearchProvinces(province.name);
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
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb
        backPageLink="/attractions"
        backPage="Thống kê"
        pageName={`Chỉnh sửa Địa điểm: ${detailAttraction.name}`}
      />

      <Form
        form={form}
        labelCol={{
          span: 5,
          style: {
            fontWeight: 600,
          },
        }}
        wrapperCol={{
          span: 19,
        }}
        labelAlign="left"
        layout="horizontal"
        style={{ width: '100%', alignItems: 'start' }}
        className="text-start"
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
        <Form.Item
          label="Nổi bật"
          valuePropName="checked"
          name="isTrending"
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
              setState((pre) => ({
                ...pre,
                isTrending: e.target.value,
              }));
            }}
            checked={state.isTrending}
          >
            Địa điểm tham quan hot
          </Checkbox>
        </Form.Item>
        <Form.Item
          label="Hủy miễn phí"
          valuePropName="checked"
          name="cancelFree"
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
              setState((pre) => ({
                ...pre,
                cancelFree: e.target.value,
              }));
            }}
            checked={state.cancelFree}
          ></Checkbox>
        </Form.Item>
        <Form.Item name="difficulty" label="Độ khó">
          <Select>
            <Select.Option value="easy">Dễ</Select.Option>
            <Select.Option value="medium">Trung bình</Select.Option>
            <Select.Option value="difficult">Khó</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Địa chỉ" name="location">
          <Row gutter={12}>
            <Col>
              <Form.Item name={['location', 'province']} valuePropName="input">
                <Input
                  placeholder="Tỉnh"
                  onFocus={() => setHiddenModal(false)}
                  onBlur={() => setHiddenModal(true)}
                  value={searchProvinces}
                  onChange={(e) => setSearchProvinces(e.target.value)}
                />
              </Form.Item>
              <ModalListProvinces />
            </Col>

            <Col span={6}>
              <Form.Item
                name={['location', 'district']}
                rules={[{ required: true, message: 'Chọn quận/huyện!' }]}
              >
                <Select
                  className="w-full"
                  onChange={(value) => {
                    getCommune(value);
                  }}
                >
                  {listDistrict.map((district, index) => (
                    <Option key={index} value={district.id}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                name={['location', 'commune']}
                rules={[{ required: true, message: 'Chọn phường/xã!' }]}
              >
                <Select
                  className="w-full"
                  onSelect={(value) => fetchLocationDetails(value)}
                >
                  {listCommune.map((commune, index) => (
                    <Option key={index} value={commune.id}>
                      {commune.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item
          label="Địa chỉ chi tiết"
          name="detail"
          rules={[{ required: true, message: 'Nhập địa chỉ chi tiết!' }]}
        >
          <Input
            value={state.detail}
            placeholder="Chi tiết"
            onChange={(e) => {
              setState((prevState) => ({
                ...prevState,
                detail: e.target.value,
              }));
            }}
          />
        </Form.Item>
        <Form.Item label="Giá tiền người lớn và trẻ em" name="price">
          <Row>
            <Col>
              <InputNumber
                value={state.price1}
                onChange={(e) => {
                  setState((pre) => ({
                    ...pre,
                    price1: e,
                  }));
                }}
                rules={[
                  {
                    required: true,
                    message: 'Nhập giá tiền người lơn!',
                  },
                ]}
              />
            </Col>
            <Col>
              <InputNumber
                value={state.price2}
                onChange={(e) => {
                  setState((pre) => ({
                    ...pre,
                    price2: e,
                  }));
                }}
                rules={[
                  {
                    required: true,
                    message: 'Nhập giá tiền trẻ em!',
                  },
                ]}
              />
            </Col>
          </Row>
        </Form.Item>
        <div className="grid grid-cols-2 gap-2">
          <Form.Item
            label="Số vé người lớn"
            name="numberOfTicketsAdult"
            rules={[
              {
                required: true,
                message: 'Nhập số vé người lớn!',
              },
            ]}
          >
            <InputNumber name="numberOfTicketsAdult" />
          </Form.Item>
          <Form.Item
            label="Số vé trẻ em"
            name="numberOfTicketsChildren"
            rules={[
              {
                required: true,
                message: 'Nhập số vé trẻ em!',
              },
            ]}
          >
            <InputNumber name="numberOfTicketsChildren" />
          </Form.Item>
        </div>
        <Form.Item
          label="Số người tối đa"
          name="maxGroupSize"
          rules={[
            {
              required: true,
              message: 'Nhập số người tối đa!',
            },
          ]}
        >
          <InputNumber name="maxGroupSize" />
        </Form.Item>

        <Form.Item name="duration" label="Số ngày diễn ra ">
          <InputNumber
            maxLength={2}
            minLength={1}
            onChange={(e) => {
              setState((pre) => ({
                ...pre,
                duration: e,
              }));
            }}
            rules={[
              {
                required: true,
                message: 'Nhập số ngày diễn ra!',
              },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="Lịch trình"
          rules={[
            {
              required: true,
              message: 'Nhập lịch trình!',
            },
          ]}
        >
          {new Array(state.duration).fill(0).map((_, index) => {
            return (
              <TextArea
                key={index}
                placeholder={`Nhập lịch trình ngày ${index + 1}`}
                name={`date ${index + 1}`}
                rows={10}
                defaultValue={detailAttraction.schedule[index]}
                className="mb-2"
                onChange={(e) => {
                  const { value } = e.target;
                  setState.schedule((prevSchedule) => {
                    const newSchedule = [...prevSchedule];
                    newSchedule[index] = value;
                    return newSchedule;
                  });
                }}
                rules={[
                  {
                    required: true,
                    message: 'Nhập lịch trình ngày !' + index + 1,
                  },
                ]}
              />
            );
          })}
        </Form.Item>

        <Form.Item label="Tổng số dịch vụ đi kèm" name="countIncludes">
          <InputNumber
            value={state.countIncludes}
            onChange={(value) => {
              setState((pre) => ({
                ...pre,
                countIncludes: value,
              }));
            }}
          />
        </Form.Item>

        <Form.Item label="Dịch vụ đi kèm">
          {new Array(state.countIncludes).fill(0).map((_, index) => {
            return (
              <TextArea
                key={index}
                placeholder={`Nhập dịch vụ đi kèm ${index + 1}`}
                name={`included ${index + 1}`}
                rows={2}
                defaultValue={detailAttraction.included[index]}
                className="mb-2"
                onChange={(e) => {
                  const { value } = e.target;
                  setState.included((prevSchedule) => {
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

        <Form.Item label="Hướng dẫn viên" name="guides">
          <Input />
        </Form.Item>

        <Typography.Paragraph>Ảnh đã tải lên:</Typography.Paragraph>
        <ShowImage imgs={detailAttraction.images} />
        <Form.Item
          label="Thêm mới ảnh"
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
              setState((pre) => ({
                ...pre,
                file: e.target.files,
              }));
            }}
          />
        </Form.Item>

        <Button type="primary" className="w-full h-auto py-2" htmlType="submit">
          Cập nhật chỉnh sửa
        </Button>
      </Form>
    </div>
  );
};
export default EditAttraction;
