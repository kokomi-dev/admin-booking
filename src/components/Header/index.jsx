import { useMutation } from '@tanstack/react-query';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from '../../common/Loader';
import { login } from '../../contexts/Redux/AuthSlice';
import { reqCurrentUser } from '../../services/api/auth';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import { MdArrowForwardIos, MdArrowBackIos } from 'react-icons/md';
const Header = ({ isExpanded, setIsPinned, isPinned }) => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();
  const userId = Cookies.get('userIdAdmin');
  const mutaionDataUser = useMutation({ mutationFn: reqCurrentUser });

  useEffect(() => {
    if (userId) {
      mutaionDataUser.mutate(userId, {
        onSuccess: async (res) => {
          const userData = res.data.user;
          return dispatch(
            login({
              ...userData,
            }),
          );
        },
        onError: async (error) => {
          console.log(error);
        },
      });
    }
  }, [userId]);
  if (mutaionDataUser.isPending) {
    return <Loader />;
  }
  return (
    <header
      className={clsx(
        'sticky top-0 z-999 flex w-full bg-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none',
        pathname.includes('auth') && 'hidden',
      )}
    >
      <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
        <button
          onClick={() => setIsPinned(!isPinned)}
          className="text-black hover:opacity-[90]  w-[20px] h-[20px]"
        >
          {isPinned ? (
            <MdArrowBackIos size={18} />
          ) : (
            <MdArrowForwardIos size={18} />
          )}
        </button>
        <div className="w-full flex items-center justify-end gap-3 2xsm:gap-7">
          <ul className="flex items-center gap-2 2xsm:gap-4">
            <DropdownMessage />
          </ul>
          <DropdownUser />
        </div>
      </div>
    </header>
  );
};

export default Header;
