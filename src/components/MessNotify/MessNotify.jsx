import React from 'react';
import { message } from 'antd';

const MessNotify = {
  success: (text) => {
    message.success(text);
  },
  error: (text) => {
    message.error(text);
  },
  info: (text) => {
    message.info(text);
  },
  warning: (text) => {
    message.warning(text);
  },
};

export default MessNotify;
