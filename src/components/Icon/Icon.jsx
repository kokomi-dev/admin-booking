import { Tooltip } from 'antd';
import clsx from 'clsx';
import React from 'react';

const Icon = ({ children, onClick, className, tooltip }, props) => {
  return (
    <div
      className={clsx(
        'relative p-[0.1rem] text-[1.15rem] rounded border-black_sub flex items-center justify-center hover:cursor-pointer',
        className,
      )}
      {...props}
      onClick={onClick}
    >
      <Tooltip title={tooltip}>{children}</Tooltip>
    </div>
  );
};

export default Icon;
