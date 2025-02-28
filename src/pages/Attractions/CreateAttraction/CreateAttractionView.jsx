import React from 'react';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Rate,
  Row,
  Select,
  Typography,
} from 'antd';
import Breadcrumb from '../../../components/Breadcrumbs/Breadcrumb';
const { TextArea } = Input;
const { Option } = Select;
const ModalListProvinces = ({
  hiddenModal,
  listProvinces,
  searchProvinces,
  setSearchProvinces,
  getDistricts,
}) => {
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
const CreateAttractionView = (props) => {
  const {
    detail,
    duration,
    isTrending,
    cancelFree,
    searchProvinces,
    setFile,
    hiddenModal,
    setHiddenModal,
    setPrice1,
    setPrice2,
    setDurration,
    setSchedule,
    setCountIncludes,
    countIncludes,
    setIncluded,
    setIsTrending,
    setCancelFree,
    listProvinces,
    listDistrict,
    listCommune,
    setDetail,
    setSearchProvinces,
    getDistricts,
    getCommune,
    getLocation,
    handleSubmit,
  } = props;
  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb
        backPageLink="/attractions"
        backPage="Thống kê"
        pageName="Thêm mới địa điểm du lịch"
      />
      <Form
        labelAlign="left"
        labelCol={{
          span: 5,
          style: {
            fontWeight: 600,
          },
        }}
        wrapperCol={{
          span: 19,
        }}
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
        <Form.Item
          label="Nổi bật"
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
              setIsTrending(e.target.checked);
            }}
            checked={isTrending}
          >
            Địa điểm tham quan hot
          </Checkbox>
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
        <Form.Item name="difficulty" label="Độ khó">
          <Select>
            <Select.Option value={1}>Dễ</Select.Option>
            <Select.Option value={2}>Trung bình</Select.Option>
            <Select.Option value={3}>Khó</Select.Option>
          </Select>
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
                    message: 'Nhập ít nhất giá trị tỉnh thành!',
                  },
                ]}
              />
              <ModalListProvinces
                hiddenModal={hiddenModal}
                listProvinces={listProvinces}
                searchProvinces={searchProvinces}
                setSearchProvinces={setSearchProvinces}
                getDistricts={getDistricts}
              />
            </Col>
            <Col span={6}>
              <Select
                className="w-full"
                onChange={(e) => {
                  getCommune(e);
                }}
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
            name="detail"
            placeholder="Chi tiết"
            value={detail}
            onChange={(e) => {
              setDetail(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item
          label="Ngày khởi hành"
          name="startDate"
          rules={[
            {
              required: true,
              message: 'Chọn ngày khởi hành!',
            },
          ]}
        >
          <DatePicker />
        </Form.Item>
        <div className="w-full grid grid-cols-2 gap-2">
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
          label="Giá tiền người lớn và trẻ em"
          name="price"
          rules={[
            {
              required: true,
              message: 'Nhập giá tiền đầy đủ!',
            },
          ]}
        >
          <Row>
            <Col>
              <InputNumber
                onChange={(e) => {
                  setPrice1(e);
                }}
              />
            </Col>
            <Col>
              <InputNumber
                onChange={(e) => {
                  setPrice2(e);
                }}
              />
            </Col>
          </Row>
        </Form.Item>

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
        <Form.Item label="Số ngày diễn ra ">
          <InputNumber
            maxLength={2}
            minLength={1}
            onChange={(e) => {
              setDurration(e);
            }}
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
          {new Array(duration).fill(0).map((_, index) => {
            return (
              <TextArea
                key={index}
                placeholder={`Nhập lịch trình ngày ${index + 1}`}
                name={`date ${index + 1}`}
                rows={2}
                className="mb-2"
                onChange={(e) => {
                  const { value } = e.target;
                  setSchedule((prevSchedule) => {
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
        <Form.Item label="Tổng số dịch vụ đi kèm">
          <InputNumber
            onChange={(value) => {
              setCountIncludes(value);
            }}
          />
        </Form.Item>
        <Form.Item label="Dịch vụ đi kèm">
          {new Array(countIncludes).fill(0).map((_, index) => {
            return (
              <TextArea
                key={index}
                placeholder={`Nhập dịch vụ đi kèm ${index + 1}`}
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
        <Form.Item label="Hướng dẫn viên" name="guides">
          <Input />
        </Form.Item>
        <Form.Item
          label="Ảnh (5 ảnh)"
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
          className="w-full h-auto py-2 bg-blue_main_sub"
          htmlType="submit"
        >
          Tạo mới
        </Button>
      </Form>
    </div>
  );
};

export default CreateAttractionView;
