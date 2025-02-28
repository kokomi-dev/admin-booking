import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';

const Icon = ({ children, onClick, className, tooltip, ...props }) => {
  return (
    <Tooltip title={tooltip}>
      <span
        className={clsx(
          'relative p-[0.1rem] text-[1.15rem] rounded border-black_sub flex items-center justify-center hover:cursor-pointer',
          className,
        )}
        {...props}
        onClick={onClick}
      >
        {children}
      </span>
    </Tooltip>
  );
};

export default Icon;
