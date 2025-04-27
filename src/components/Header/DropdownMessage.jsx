import { useState } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { MdOutlineMessage } from 'react-icons/md';

const DropdownMessage = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifying, setNotifying] = useState(true);

  return (
    <Link
      onClick={() => {
        setNotifying(false);
        setDropdownOpen(!dropdownOpen);
      }}
      className="relative flex h-8.5 w-8.5 items-center justify-center rounded-full border-[0.5px] border-stroke bg-gray hover:text-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
      to="/chat"
    >
      <MdOutlineMessage className="size-5" />
    </Link>
  );
};

export default DropdownMessage;
