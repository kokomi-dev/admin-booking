import { QUERY_KEY_ATTRACTION, QUERY_KEY_HOTEL } from '@/configs/QuerykeyStore';
import {
  getTotalBookingAttraction,
  getTotalBookingHotel,
} from '@/services/api/booking';
import formatVietnamCurrency from '@/utils/formatPrice';
import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

export const options = {
  legend: {
    show: false,
    position: 'top',
    horizontalAlign: 'left',
  },
  colors: ['#3C50E0', '#80CAEE'],
  chart: {
    fontFamily: 'Be VietNam Pro, sans-serif',
    height: 335,
    type: 'area',
    dropShadow: {
      enabled: true,
      color: '#623CEA14',
      top: 10,
      blur: 4,
      left: 0,
      opacity: 0.1,
    },
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
      export: {
        csv: {
          filename: 'Du-lieu-cua-toi',
          columnDelimiter: ',',
          headerCategory: 'Danh mục',
          headerValue: 'Giá trị',
        },
        svg: {
          filename: 'Bieu-do',
        },
        png: {
          filename: 'Bieu-do',
        },
      },
    },
    zoom: {
      enabled: false,
    },
  },
  locales: [
    {
      name: 'vi',
      options: {
        toolbar: {
          exportToSVG: 'Tải về SVG',
          exportToPNG: 'Tải về PNG',
          exportToCSV: 'Tải về CSV',
          selection: 'Chọn',
          selectionZoom: 'Zoom chọn',
          zoomIn: 'Phóng to',
          zoomOut: 'Thu nhỏ',
          pan: 'Di chuyển',
          reset: 'Đặt lại',
        },
      },
    },
  ],
  responsive: [
    {
      breakpoint: 1024,
      options: {
        chart: {
          height: 300,
        },
      },
    },
    {
      breakpoint: 1366,
      options: {
        chart: {
          height: 350,
        },
      },
    },
  ],
  stroke: {
    width: [2, 2],
    curve: 'straight',
  },
  y: {
    formatter: (value) => formatVietnamCurrency(value),
  },
  grid: {
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: true,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  markers: {
    size: 4,
    colors: '#fff',
    strokeColors: ['#3056D3', '#80CAEE'],
    strokeWidth: 3,
    strokeOpacity: 0.9,
    strokeDashArray: 0,
    fillOpacity: 1,
    discrete: [],
    hover: {
      size: undefined,
      sizeOffset: 5,
    },
  },
  xaxis: {
    type: 'category',
    categories: [
      'T1',
      'T2',
      'T3',
      'T4',
      'T5',
      'T6',
      'T7',
      'T8',
      'T9',
      'T10',
      'T11',
      'T12',
    ],
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    title: {
      style: {
        fontSize: '0px',
      },
    },
    min: 0,
    max: 50000000,
    labels: {
      formatter: (value) => formatVietnamCurrency(value),
    },
  },
};

const ChartOne = () => {
  const [state, setState] = useState({
    series: [
      {
        name: 'Địa điểm du lịch',
        data: [],
      },

      {
        name: 'Lưu trú',
        data: [],
      },
    ],
  });
  // get total attraction
  const { data: totalAttraction, isLoading: isLoadingAtt } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.TOTAL],
    queryFn: async () => {
      const res = await getTotalBookingAttraction({
        all: true,
        date: false,
        week: false,
        month: {
          status: false,
          value: '',
        },
      });
      if (res && res.status === 200) {
        const totalRevenueArray = res.data.data.map(
          (item) => item.totalRevenue,
        );
        return setState((prev) => ({
          ...prev,
          series: prev.series.map((serie) =>
            serie.name === 'Địa điểm du lịch'
              ? {
                  ...serie,
                  data: [...totalRevenueArray, 0, 0, 0, 0, 0, 0, 0, 0],
                }
              : serie,
          ),
        }));
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  // get total hotel
  const { data: totalHotel, isLoading: isLoadingHotel } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.TOTAL],
    queryFn: async () => {
      const res = await getTotalBookingHotel({
        all: true,
        date: false,
        week: false,
        month: {
          status: false,
          value: '',
        },
      });
      if (res && res.status === 200) {
        const totalRevenueArray = res.data.data.map(
          (item) => item.totalRevenue,
        );
        return setState((prev) => ({
          ...prev,
          series: prev.series.map((serie) =>
            serie.name === 'Lưu trú'
              ? {
                  ...serie,
                  data: [...totalRevenueArray, 0, 0, 0, 0, 0, 0, 0, 0],
                }
              : serie,
          ),
        }));
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  const [timeTotal, setTimeTotal] = useState();
  const handleReset = () => {
    setState((prevState) => ({
      ...prevState,
    }));
  };
  // handleReset;

  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-8">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex w-full flex-wrap gap-3 sm:gap-5">
          <div className="w-full text-nowrap">
            <p className="font-semibold text-primary text-lg mb-2">
              Doanh thu qua các tháng
            </p>
            <p className="text-sm font-medium">01/01.2025 - 31/12/2025</p>
          </div>
        </div>
        <div className="flex w-full max-w-45 justify-end">
          {/* <div className="inline-flex items-center rounded-md bg-whiter p-1.5 dark:bg-meta-4">
            <button className="rounded bg-white py-1 px-3 text-xs font-medium text-black shadow-card hover:bg-white hover:shadow-card dark:bg-boxdark dark:text-white dark:hover:bg-boxdark">
              Ngày
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Tuần
            </button>
            <button className="rounded py-1 px-3 text-xs font-medium text-black hover:bg-white hover:shadow-card dark:text-white dark:hover:bg-boxdark">
              Tháng
            </button>
          </div> */}
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5">
          <ReactApexChart
            options={options}
            series={state.series}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
