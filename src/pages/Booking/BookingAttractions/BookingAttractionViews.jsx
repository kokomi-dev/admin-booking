import Breadcrumb from '@/components/Breadcrumbs/Breadcrumb';
import Icon from '@/components/Icon/Icon';
import InputDebounce from '@/components/InputDebounce/InputDebounce';
import { getTotalBookingAttraction } from '@/services/api/booking';
import { formatDate } from '@/utils/formatDate';
import formatVietnamCurrency from '@/utils/formatPrice';
import {
  Badge,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Empty,
  Modal,
  Select,
  Spin,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  MdBarChart,
  MdCalendarMonth,
  MdCalendarToday,
  MdCheck,
  MdClear,
  MdConfirmationNumber,
  MdInfo,
  MdLocationOn,
  MdOutlineFilterAltOff,
  MdOutlineReceipt,
  MdPayment,
  MdPerson,
  MdToday,
} from 'react-icons/md';

const BookingAttractionViews = ({
  listBooking,
  filter,
  setFilter,
  handleUpdateStatusAttraction,
}) => {
  const [statsFilter, setStatsFilter] = useState({
    type: 'all',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
  });

  const { Option } = Select;
  const { TabPane } = Tabs;
  const [statsData, setStatsData] = useState({
    series: [
      {
        name: 'Địa điểm du lịch',
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
    loading: false,
    chartData: [],
  });

  const fetchStatistics = async (params) => {
    setStatsData((prev) => ({ ...prev, loading: true }));
    try {
      const res = await getTotalBookingAttraction(params);
      if (res && res.status === 200) {
        let chartData = [];

        if (params.all) {
          // Handle monthly data
          chartData = res.data.data.map((item) => ({
            month: `Tháng ${item.month}`,
            value: item.totalRevenue,
            category: 'Doanh thu',
          }));

          // Update series for line chart
          const totalRevenueArray = res.data.data.map(
            (item) => item.totalRevenue,
          );
          setStatsData((prev) => ({
            ...prev,
            series: prev.series.map((serie) =>
              serie.name === 'Địa điểm du lịch'
                ? {
                    ...serie,
                    data: [...totalRevenueArray, 0, 0, 0, 0, 0, 0, 0, 0].slice(
                      0,
                      12,
                    ),
                  }
                : serie,
            ),
            chartData,
          }));
        } else if (params.date) {
          // Handle daily data
          chartData = [
            {
              time: 'Hôm nay',
              value: res.data.data.totalRevenue,
              category: 'Doanh thu',
            },
          ];
          setStatsData((prev) => ({ ...prev, chartData }));
        } else if (params.week) {
          // Handle weekly data
          const dayNames = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
          chartData = res.data.data.map((item) => ({
            day: dayNames[item.day - 1],
            value: item.totalRevenue,
            category: 'Doanh thu',
          }));
          setStatsData((prev) => ({ ...prev, chartData }));
        } else if (params.month && params.month.status) {
          // Handle month data
          chartData = res.data.data.map((item) => ({
            day: `Ngày ${item.day}`,
            value: item.totalRevenue,
            category: 'Doanh thu',
          }));
          setStatsData((prev) => ({ ...prev, chartData }));
        }
      }
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setStatsData((prev) => ({ ...prev, loading: false }));
    }
  };

  useEffect(() => {
    const params = {
      all: statsFilter.type === 'all',
      date: statsFilter.type === 'date',
      week: statsFilter.type === 'week',
      month:
        statsFilter.type === 'month'
          ? {
              status: true,
              value: statsFilter.month,
            }
          : {
              status: false,
              value: '',
            },
      year: statsFilter.year,
    };

    fetchStatistics(params);
  }, [statsFilter]);

  const config = {
    data: statsData.chartData,
    isGroup: true,
    xField:
      statsFilter.type === 'all'
        ? 'Tháng'
        : statsFilter.type === 'week'
          ? 'Ngày'
          : 'Ngày',
    yField: 'value',
    seriesField: 'category',
    columnStyle: {
      radius: [8, 8, 0, 0],
    },
    label: {
      position: 'top',
      formatter: (text) => formatVietnamCurrency(text.value),
      style: {
        fill: '#fff',
      },
    },
    color: ['#4096ff'],
    tooltip: {
      formatter: (datum) => {
        return {
          name: datum.category,
          value: formatVietnamCurrency(datum.value),
        };
      },
    },
  };

  const options = {
    chart: {
      type: 'line',
      toolbar: {
        show: true,
        tools: {
          download: true,
          selection: false,
          zoom: false,
          zoomin: false,
          zoomout: false,
          pan: false,
          reset: false,
        },
      },
      zoom: {
        enabled: false,
      },
    },
    xaxis: {
      categories: Array.from(
        { length: statsData.chartData.length },
        (_, i) => i + 1,
      ),
      title: {
        text: 'Ngày trong tháng',
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => {
          return val.toLocaleString('vi-VN') + ' ₫'; // Hiển thị số tiền VNĐ
        },
      },
      title: {
        text: 'Doanh thu (VNĐ)',
      },
    },
    tooltip: {
      y: {
        formatter: (val) => {
          return val.toLocaleString('vi-VN') + ' ₫'; // Tooltip cũng show tiền
        },
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        columnWidth: '40%',
      },
    },
    dataLabels: {
      enabled: false, // Nếu muốn hiển thị số trực tiếp trên cột thì để true
    },
  };
  const renderStatsContent = () => {
    let data = [];
    if (statsData.loading) {
      return (
        <div className="flex items-center justify-center h-64">
          <Spin size="large" />
        </div>
      );
    }

    if (statsData.chartData.length === 0) {
      return <Empty description="Không có dữ liệu thống kê" className="my-8" />;
    }
    if (statsFilter.type === 'month' && statsData.chartData.length > 0) {
      data = [
        {
          name: 'Doanh thu',
          data: statsData.chartData.map((item) => item.value),
        },
      ];
    }
    return (
      <div className="w-full">
        {statsFilter.type === 'all' && (
          <div className="mt-4 grid grid-cols-3 gap-4">
            {statsData.chartData.map((item, index) => (
              <Card key={index} className="shadow-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-gray-500">{item.month}</p>
                    <h3 className="text-lg font-semibold">
                      {formatVietnamCurrency(item.value)}
                    </h3>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <MdBarChart className="text-blue-500 text-xl" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        {statsFilter.type === 'date' && statsData.chartData[0] && (
          <Card className="mt-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500">
                  Tổng doanh thu ngày {new Date().toLocaleDateString('vi-VN')}
                </p>
                <h3 className="text-2xl font-semibold">
                  {formatVietnamCurrency(statsData.chartData[0].value)}
                </h3>
              </div>
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center">
                <MdToday className="text-blue-500 text-2xl" />
              </div>
            </div>
          </Card>
        )}
        {statsFilter.type === 'month' && statsData.chartData.length > 0 && (
          <div id="chartOne" className="-ml-5">
            <ReactApexChart
              options={options}
              series={data}
              type="line"
              height={350}
            />
          </div>
        )}
      </div>
    );
  };
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const showDetailModal = (booking) => {
    setSelectedBooking(booking);
    setIsModalVisible(true);
  };

  // Handle closing the detail modal
  const handleModalClose = () => {
    setIsModalVisible(false);
  };
  const handleChangeStatisticsType = (key) => {
    setStatsFilter((prev) => ({ ...prev, type: key }));
  };
  const renderTicketsBooked = (numberOfTicketsBooked) => {
    if (!numberOfTicketsBooked) return 'Không có thông tin';

    return Object.entries(numberOfTicketsBooked).map(
      ([ticketType, quantity], index) => (
        <Tag key={index} color="blue" className="mb-1">
          {ticketType}: {quantity}
        </Tag>
      ),
    );
  };

  return (
    <div className="flex flex-col gap-y-4">
      <Breadcrumb pageName="Các địa điểm đã đặt" />
      <div className="w-full flex items-center justify-between">
        <Typography.Title level={5}>
          Có tất cả
          <span className="font-semibold"> {listBooking?.length || 0} </span>
          đơn đã được đặt
        </Typography.Title>
        <div className="flex gap-2">
          <InputDebounce
            placeholder="Tìm kiếm đơn đặt..."
            className="w-64"
            onChange={(value) =>
              setFilter((prev) => ({ ...prev, search: value }))
            }
          />
          <Button
            icon={<MdOutlineFilterAltOff />}
            onClick={() => setFilter({})}
          >
            Xóa bộ lọc
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-1">
          <Card className="h-full">
            <div className="flex flex-col gap-y-4">
              <div className="flex flex-col gap-y-1">
                <h3 className="text-red-500 font-medium text-base mb-2">
                  1. Lưu ý:
                </h3>
                <ul className="text-sm font-normal list-disc pl-4 grid gap-2">
                  <li>
                    Nếu có thắc mắc về việc sử dụng hãy liên hệ với quản trị
                    viên để được hướng dẫn sử dụng
                  </li>
                  <li>
                    Với mỗi phương thức thanh toán khác nhau sẽ có trạng thái
                    khác nhau
                  </li>
                </ul>
              </div>
              <div className="flex flex-col gap-y-1">
                <h3 className="text-red-500 font-medium text-base mb-2">
                  2. Quy định về thanh toán:
                </h3>
                <ul className="text-sm font-normal list-disc pl-4 grid gap-2">
                  <li>
                    <strong>COD:</strong> hãy xem chuyển khoản thành công thì
                    xác nhận lại với khách hàng qua email
                  </li>
                  <li>
                    <strong>ZALOPAY:</strong> phương thức này sẽ chỉ có thành
                    công khi mà người dùng đã thanh toán
                  </li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="h-full">
            <div className="flex flex-col gap-y-4">
              <h3 className="text-red-500 font-medium text-lg mb-2">
                3. Thống kê doanh thu:
              </h3>

              <Tabs
                defaultActiveKey="all"
                onChange={handleChangeStatisticsType}
                className="custom-tabs"
              >
                <TabPane
                  tab={
                    <span>
                      <MdBarChart className="inline mr-1" /> Tất cả
                    </span>
                  }
                  key="all"
                >
                  <div className="flex items-center gap-x-3 mb-4">
                    <Select
                      className="w-[180px]"
                      value={statsFilter.year}
                      onChange={(value) =>
                        setStatsFilter((prev) => ({ ...prev, year: value }))
                      }
                    >
                      {/* <Option value={2024}>Năm 2024</Option> */}
                      <Option value={2025}>Năm 2025</Option>
                    </Select>
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <MdToday className="inline mr-1" /> Hôm nay
                    </span>
                  }
                  key="date"
                >
                  <div className="flex items-center gap-x-3 mb-4">
                    <DatePicker
                      className="w-[180px]"
                      onChange={(date) => {
                        if (date) {
                          const dateObj = date.toDate();
                          setStatsFilter((prev) => ({
                            ...prev,
                            day: dateObj.getDate(),
                            month: dateObj.getMonth() + 1,
                            year: dateObj.getFullYear(),
                          }));
                        }
                      }}
                    />
                  </div>
                </TabPane>
                <TabPane
                  tab={
                    <span>
                      <MdCalendarMonth className="inline mr-1" /> Theo tháng
                    </span>
                  }
                  key="month"
                >
                  <div className="flex items-center gap-x-3 mb-4">
                    <Select
                      className="w-[180px]"
                      value={statsFilter.month}
                      onChange={(value) =>
                        setStatsFilter((prev) => ({ ...prev, month: value }))
                      }
                    >
                      {Array.from({ length: 12 }, (_, i) => (
                        <Option key={i + 1} value={i + 1}>
                          Tháng {i + 1}
                        </Option>
                      ))}
                    </Select>
                    <Select
                      className="w-[180px]"
                      value={statsFilter.year}
                      onChange={(value) =>
                        setStatsFilter((prev) => ({ ...prev, year: value }))
                      }
                    >
                      <Option value={2024}>Năm 2024</Option>
                      <Option value={2025}>Năm 2025</Option>
                    </Select>
                  </div>
                </TabPane>
              </Tabs>

              {renderStatsContent()}
            </div>
          </Card>
        </div>
      </div>
      <Card className="mt-4">
        <div className="flex items-center justify-between mb-4">
          <Typography.Title level={5} className="m-0">
            Danh sách đơn đặt
          </Typography.Title>
        </div>

        {/* Bảng danh sách đơn đặt sẽ được thêm vào đây */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  STT
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Khách hàng
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Địa điểm
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Ngày đặt
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thanh toán
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider text-nowrap">
                  Số tiền
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className=" z-[5] bg-white  border border-gray-300 border-l-1 p-2 relative 0 text-center">
                  <Tooltip title={`Xóa bộ lọc`}>
                    <button
                      onClick={() => {
                        setFilter({
                          unitCode: '',
                          title: '',
                          content: '',
                          author: '',
                          tags: '',
                          createdAt: '',
                          updatedAt: '',
                          isTrending: null,
                          isDraft: null,
                          isActive: null,
                          likes: 0,
                          comments: [],
                        });
                      }}
                      className="rounded-md transition-all hover:bg-red-50 p-2 text-vs-danger"
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
                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <InputDebounce
                    value={filter.nameAttraction}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        emailUser: e.target.value,
                      }));
                    }}
                    className="no-spinner"
                    type="text"
                  />
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <InputDebounce
                    value={filter.cityAttraction}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        cityAttraction: e.target.value,
                      }));
                    }}
                    className="no-spinner"
                    type="text"
                  />
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <InputDebounce
                    className="no-spinner font-normal"
                    type="date"
                    width={130}
                    value={filter.bookedDate}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        bookedDate: e.target.value,
                      }));
                    }}
                  />
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <Select
                    value={filter.paymentMethod}
                    onChange={(value) => {
                      setFilter((pre) => ({
                        ...pre,
                        paymentMethod: value,
                      }));
                    }}
                    className="w-[120px]"
                  >
                    <Option value="">Tất cả</Option>
                    <Option value="cod">Cod</Option>
                    <Option value="zalopay">ZaloPay</Option>
                    <Option value="banking">Banking</Option>
                  </Select>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <InputDebounce
                    value={filter.totalBooked}
                    onChange={(e) => {
                      setFilter((pre) => ({
                        ...pre,
                        totalBooked: e.target.value,
                      }));
                    }}
                    className="no-spinner"
                    type="text"
                  />
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>

                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <Select
                    value={filter.isSuccess}
                    onChange={(value) => {
                      setFilter((pre) => ({
                        ...pre,
                        isSuccess: value,
                      }));
                    }}
                    className="w-full"
                  >
                    <Option value="">Tất cả</Option>
                    <Option value={true}>Thành công</Option>
                    <Option value={false}>Chưa thành công</Option>
                  </Select>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>

                <td className=" z-[5] bg-white border border-l-0 border-t-0 border-gray-300 p-2 relative  text-center">
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -left-[1px]"></span>
                  <span className="block absolute top-0 bottom-0 w-[1px] bg-gray-300 -right-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -top-[1px]"></span>
                  <span className="block absolute left-0 right-0 h-[1px] bg-gray-300 -bottom-[1px]"></span>
                </td>
              </tr>
              {listBooking && listBooking.length > 0 ? (
                listBooking.map((booking, index) => (
                  <tr
                    key={booking._id || index}
                    className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black">
                      {booking.infoUser.email || 'Khách hàng'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.infoAttraction?.address || 'Không có thông tin'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-black font-semibold">
                      {formatDate(booking.bookedDate)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {booking.paymentMethod || 'Không có thông tin'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue_main font-semibold">
                      {formatVietnamCurrency(booking.totalBooked || 0)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={clsx(
                          'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
                          booking.isSuccess === true
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800',
                        )}
                      >
                        {booking.isSuccess === true && 'Đã thanh toán'}
                        {booking.isSuccess === false && 'Chờ thanh toán'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <Tooltip title="Xem chi tiết">
                          <Button
                            type="primary"
                            size="small"
                            onClick={() => showDetailModal(booking)}
                          >
                            Chi tiết
                          </Button>
                        </Tooltip>
                        <Tooltip title="Xác nhận thanh toán">
                          <Button
                            type="default"
                            size="small"
                            icon={<MdCheck />}
                            className="text-green-500"
                            disabled={booking.isSuccess === true}
                            onClick={() => {
                              handleUpdateStatusAttraction({
                                id: booking._id,
                                data: {
                                  isSuccess: true,
                                },
                              });
                            }}
                          />
                        </Tooltip>
                        <Tooltip title="Hủy đơn">
                          <Button
                            onClick={() => {
                              handleUpdateStatusAttraction({
                                id: booking._id,
                                data: {
                                  isSuccess: false,
                                },
                              });
                            }}
                            type="default"
                            size="small"
                            icon={<MdClear />}
                            className="text-red-500"
                            disabled={booking.status === true}
                          />
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-4 text-center text-sm text-gray-500"
                  >
                    Không có dữ liệu
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
      <Modal
        title={
          <div className="flex items-center">
            <MdInfo className="text-blue-500 mr-2 text-xl" />
            <span>Chi tiết đơn đặt</span>
          </div>
        }
        open={isModalVisible}
        onCancel={handleModalClose}
        footer={[
          <Button key="back" onClick={handleModalClose}>
            Đóng
          </Button>,
          <Button
            key="confirm"
            type="primary"
            disabled={selectedBooking && selectedBooking.isSuccess}
          >
            Xác nhận thanh toán
          </Button>,
        ]}
        width={800}
      >
        {selectedBooking && (
          <div className="booking-detail-modal">
            <div className="p-2 bg-blue-50 rounded-md mb-4 border-l-4 border-blue-500">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <MdOutlineReceipt className="text-blue-500 mr-2 text-xl" />
                  <Typography.Text strong>
                    Mã đơn: {selectedBooking._id?.substr(-12) || 'N/A'}
                  </Typography.Text>
                </div>
                <Badge
                  status={selectedBooking.isSuccess ? 'success' : 'warning'}
                  text={
                    selectedBooking.isSuccess
                      ? 'Đã thanh toán'
                      : 'Chờ thanh toán'
                  }
                />
              </div>
            </div>

            <Descriptions
              title={
                <div className="flex items-center mb-2">
                  <MdPerson className="text-gray-500 mr-2" />
                  <span>Thông tin khách hàng</span>
                </div>
              }
              bordered
              column={2}
              className="mb-4"
            >
              <Descriptions.Item label="Tên khách hàng">
                {selectedBooking.infoUser?.name || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                {selectedBooking.infoUser?.email || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Số điện thoại">
                {selectedBooking.infoUser?.phone || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {selectedBooking.infoUser?.address || 'Không có thông tin'}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title={
                <div className="flex items-center mb-2">
                  <MdLocationOn className="text-gray-500 mr-2" />
                  <span>Thông tin địa điểm</span>
                </div>
              }
              bordered
              column={2}
              className="mb-4"
            >
              <Descriptions.Item label="Tên địa điểm">
                {selectedBooking.infoAttraction?.name || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Slug">
                {selectedBooking.slugBooked || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Mã đơn vị">
                {selectedBooking.unitCode || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Địa chỉ">
                {selectedBooking.infoAttraction?.address ||
                  'Không có thông tin'}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title={
                <div className="flex items-center mb-2">
                  <MdPayment className="text-gray-500 mr-2" />
                  <span>Thông tin thanh toán</span>
                </div>
              }
              bordered
              column={2}
              className="mb-4"
            >
              <Descriptions.Item label="Phương thức thanh toán">
                <Tag
                  color={
                    selectedBooking.paymentMethod === 'zalopay'
                      ? 'blue'
                      : 'purple'
                  }
                >
                  {selectedBooking.paymentMethod?.toUpperCase() ||
                    'Không có thông tin'}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Mã thanh toán">
                {selectedBooking.paymentUrl || 'Không có thông tin'}
              </Descriptions.Item>
              <Descriptions.Item label="Tổng tiền">
                <Typography.Text type="danger" strong>
                  {formatVietnamCurrency(selectedBooking.totalBooked || 0)}
                </Typography.Text>
              </Descriptions.Item>
              <Descriptions.Item label="Trạng thái">
                <Badge
                  status={selectedBooking.isSuccess ? 'success' : 'warning'}
                  text={
                    selectedBooking.isSuccess
                      ? 'Đã thanh toán'
                      : 'Chờ thanh toán'
                  }
                />
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title={
                <div className="flex items-center mb-2">
                  <MdCalendarToday className="text-gray-500 mr-2" />
                  <span>Thông tin lịch trình</span>
                </div>
              }
              bordered
              column={2}
              className="mb-4"
            >
              <Descriptions.Item label="Ngày bắt đầu">
                {formatDate(selectedBooking.dateStart)}
              </Descriptions.Item>
              <Descriptions.Item label="Ngày đặt">
                {formatDate(selectedBooking.bookedDate)}
              </Descriptions.Item>
            </Descriptions>

            <Descriptions
              title={
                <div className="flex items-center mb-2">
                  <MdConfirmationNumber className="text-gray-500 mr-2" />
                  <span>Thông tin vé</span>
                </div>
              }
              bordered
              className="mb-4"
            >
              <Descriptions.Item label="Số lượng vé đã đặt" span={3}>
                <div className="flex flex-wrap gap-2">
                  {renderTicketsBooked(selectedBooking.numberOfTicketsBooked)}
                </div>
              </Descriptions.Item>
            </Descriptions>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BookingAttractionViews;
