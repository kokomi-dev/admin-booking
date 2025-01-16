import { DatePicker } from "antd";
import dayjs from "dayjs";
import React, { useState } from "react";
import { vi } from "date-fns/locale";

const DatePickerVI = ({ size, onDateChange }) => {
  const dateFormatList = ["DD/MM/YYYY", "DD/MM/YY", "DD-MM-YYYY", "DD-MM-YY"];
  const disabledDate = (current) => {
    return current && current < dayjs().startOf("day");
  };

  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date, dateString) => {
    setSelectedDate(date); // Cập nhật state với giá trị ngày
    if (onDateChange) {
      onDateChange(date, dateString); // Truyền giá trị ra ngoài qua callback
    }
  };
  return (
    <>
      <style>
        {`
      .ant-picker-cell-out-of-view {
        display: none !important; 
      }
    `}
      </style>
      <DatePicker
        format={dateFormatList[0]}
        className="!text-[0.7rem]"
        size={size}
        locale={vi}
        lang="vi"
        disabledDate={disabledDate}
        onChange={handleDateChange}
      />
    </>
  );
};

export default DatePickerVI;
