import clsx from 'clsx';
import React from 'react';

const TextareaWrapper = ({ value, setValue, className }) => {
  return (
    <textarea
      className={clsx('text-black text-[16px] leading-5', className)}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

export default TextareaWrapper;
