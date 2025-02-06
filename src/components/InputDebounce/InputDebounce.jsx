import React from 'react';
import { DebounceInput } from 'react-debounce-input';
import clsx from 'clsx';

const InputDebounce = ({
  value,
  onChange,
  placeholder,
  debounceTime = 500,
  className,
  width,
  type,
  name,
  min,
  ...props
}) => {
  return (
    <DebounceInput
      name={name}
      type={type ?? 'text'}
      minLength={1}
      debounceTimeout={debounceTime}
      value={value}
      onChange={onChange}
      min={min}
      placeholder={placeholder}
      {...props}
      style={{ width: width ? `${width}px` : '100%' }}
      className={clsx(
        'p-2 border-2 border-gray-300" text-sm h-[30px] rounded-md',
        className,
      )}
      onWheel={(e) => e.target.blur()}
    />
  );
};

export default InputDebounce;
