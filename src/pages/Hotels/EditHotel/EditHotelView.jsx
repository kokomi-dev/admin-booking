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
import FormItem from 'antd/es/form/FormItem';
import TextArea from 'antd/es/input/TextArea';
import { getCommune, getLocation } from '../../../services/api/location';
import Loader from '../../../common/Loader';
import PopoverListProvinces from '../../../components/PopoverProvinces/PopoverProvince';
import React from 'react';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';

const EditHotelView = ({
  form,
  nameHotel,
  handleSubmit,
  isLoading,
  searchProvinces,
  setSearchProvinces,
  listProvinces,
  listCommune,
  setListCommune,
  listDistrict,
  setListDistricts,
  detail,
  setDetail,
  state,
  setState,
  hiddenModal,
  setHiddenModal,
  setInfoRoom,
  infoRoom,
  setFullLocation,
  file,
  setFile,
  setHighlights,
  highlights,
  includes,
  setIncludes,
}) => {
  const { Option } = Select;
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb
        backPage="Danh sách"
        backPageLink="/hotels"
        pageName={`Chỉnh sửa lưu trú: ${nameHotel}`}
      />
      <h3>Chỉnh sửa thông tin các phòng sẽ ở mục riêng từng phòng</h3>
      <h4>
        <span className="text-red-600">Lưu ý:</span>Cập nhật số phòng hiện có
        một cách nhanh chóng để khách hàng không bỏ lỡ địa điểm lưu trú của bạn
      </h4>
      <Form
        form={form}
        labelCol={{
          span: 5,
          style: { fontWeight: 700 },
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
          name="details"
          rules={[
            {
              required: true,
              message: 'Nhập mô tả!',
            },
          ]}
        >
          <TextArea rows={6} name="details" />
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
            value={state.cancelFree}
            className="select-none"
            onChange={(e) => {
              setState((pre) => ({
                ...pre,
                cancelFree: e.target.checked,
              }));
            }}
            checked={state.cancelFree}
          ></Checkbox>
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
              <PopoverListProvinces
                hiddenModal={hiddenModal}
                listProvinces={listProvinces}
                searchProvinces={searchProvinces}
                setSearchProvinces={setSearchProvinces}
                setListDistricts={setListDistricts}
              />
            </Col>

            <Col span={6}>
              <Form.Item
                name={['location', 'district']}
                rules={[{ required: true, message: 'Chọn quận/huyện!' }]}
              >
                <Select
                  className="w-full"
                  onChange={async (value) => {
                    const data = await getCommune(value);
                    setListCommune(data);
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
                  onSelect={async (value) => {
                    const dataLocation = await getLocation(value);
                    setFullLocation(dataLocation);
                  }}
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
            value={state.countHighlight}
            onChange={(value) => {
              setState((_state) => ({
                ..._state,
                countHighlight: value,
              }));
            }}
            min={0}
          />
        </Form.Item>
        {state.countHighlight !== 0 && (
          <Form.Item label="Các diểm nổi bật ">
            {new Array(state.countHighlight).fill(0).map((_, index) => {
              return (
                <TextArea
                  value={highlights[index]}
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
            value={state.countInclude}
            onChange={(value) => {
              setState((_state) => ({
                ..._state,
                countInclude: value,
              }));
            }}
            min={0}
          />
        </Form.Item>
        {state.countInclude !== 0 && (
          <Form.Item label="Các tiện  nghi ">
            {new Array(state.countInclude).fill(0).map((_, index) => {
              return (
                <TextArea
                  value={includes[index]}
                  key={index}
                  placeholder={`Tiện nghi  ${index + 1}`}
                  name={`included ${index + 1}`}
                  rows={2}
                  className="mb-2"
                  onChange={(e) => {
                    const { value } = e.target;
                    setIncludes((prevSchedule) => {
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

        <Form.Item
          label="Thêm ảnh mới "
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

        <Button
          type="primary"
          className="w-full h-auto py-2 bg-bg_primary_blue_sub text-white"
          htmlType="submit"
        >
          Hoàn tất chỉnh sửa
        </Button>
      </Form>
    </div>
  );
};

export default EditHotelView;
