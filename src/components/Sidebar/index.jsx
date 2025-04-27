import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SidebarLinkGroup from './SidebarLinkGroup';
import Logo from '../../assets/images/logo/logo.png';
import {
  MdMyLocation,
  MdLocationCity,
  MdOutlineSupervisorAccount,
  MdOutlineSwitchAccount,
  MdDensityMedium,
  MdInsertComment,
} from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';

import { useSelector } from 'react-redux';
import checkPermissionUser from '@/utils/checkPermissionUser';
import clsx from 'clsx';

const Sidebar = ({ isExpanded }) => {
  const location = useLocation();
  const { pathname } = location;
  const user = useSelector((state) => state.auth.user);
  return (
    <aside
      className={`flex flex-col items-start justify-start text-center h-screen w-auto border-r  , ${pathname.includes('auth') && 'hidden'}`}
    >
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="w-full flex items-center justify-center gap-2 px-1 py-5.5 lg:py-6.5 bg-white">
        <NavLink to="/" className="flex items-center justify-start gap-x-1">
          <div
            className={clsx(
              'rounded-full ',
              isExpanded
                ? 'w-[55px] h-[55px]  flex-shrink-0'
                : 'w-[28px] h-[28px]',
            )}
          >
            <img src={Logo} alt="Logo" className="w-full h-full object-cover" />
          </div>
          {isExpanded && (
            <div className="flex flex-col items-start ml-2">
              <h1 className="font-bold text-[1.1rem] text-black_main">
                KoKoTravel
              </h1>
            </div>
          )}
        </NavLink>
      </div>
      {/* <!-- SIDEBAR HEADER --> */}
      <div className="no-scrollbar w-full flex flex-col items-start justify-start text-center overflow-y-auto duration-300 ease-linear ">
        {/* <!-- Sidebar Menu --> */}
        <nav className="w-full mt-2">
          {/* <!-- Menu Group --> */}
          <div>
            {isExpanded && (
              <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 select-none">
                MENU
              </h3>
            )}

            <ul className="w-full  mb-6 flex flex-col gap-1.5 text-[#4B5563]">
              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start px-4'
                    : 'flex items-center justify-center',
                  pathname === '/' && 'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <MdDensityMedium size={20} className="fill-current" />
                  {isExpanded && <span>Trang chủ</span>}
                </NavLink>
              </li>

              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start  px-4'
                    : 'flex items-center justify-center text-[#4B5563]',
                  pathname.includes('attractions-list') &&
                    'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/attractions-list"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <MdMyLocation size={20} className="fill-current" />
                  {isExpanded && (
                    <span className="font-medium">Địa điểm du lịch</span>
                  )}
                </NavLink>
              </li>

              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start px-4'
                    : 'flex items-center justify-center',
                  pathname.includes('hotels-list') &&
                    'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/hotels-list"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <MdLocationCity size={20} className="fill-current" />
                  {isExpanded && <span>Nơi lưu trú</span>}
                </NavLink>
              </li>

              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start px-4'
                    : 'flex items-center justify-center',
                  pathname.includes('booking-attractions') &&
                    'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/booking-attractions"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <RiMoneyDollarCircleLine size={20} className="fill-current" />
                  {isExpanded && <span>Booking dịa điểm</span>}
                </NavLink>
              </li>
              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start px-4'
                    : 'flex items-center justify-center',
                  pathname.includes('booking-hotels') &&
                    'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/booking-hotels"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <RiMoneyDollarCircleLine size={20} className="fill-current" />
                  {isExpanded && <span>Booking lưu trú</span>}
                </NavLink>
              </li>

              {/* <!-- Menu Item Tables --> */}
              <li
                className={clsx(
                  'w-full ',
                  isExpanded
                    ? 'flex items-start justify-start  px-4'
                    : 'flex items-center justify-center',
                  pathname.includes('blogs') && 'bg-blue_main !text-white',
                )}
              >
                <NavLink
                  to="/blogs"
                  className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                >
                  <MdInsertComment size={20} className="fill-current" />
                  {isExpanded && <span>Bài viết</span>}
                </NavLink>
              </li>
            </ul>
          </div>

          {/* <!-- Others Group --> */}
          {user && user.roles === 'admin' && (
            <div>
              {isExpanded && (
                <h3 className="mb-4 ml-4 text-sm font-medium text-bodydark2 select-none">
                  Khác
                </h3>
              )}
              <ul className="mb-6 flex flex-col gap-1.5 text-[#4B5563]">
                <li
                  className={clsx(
                    'w-full ',
                    isExpanded
                      ? 'flex items-start justify-start  px-4'
                      : 'flex items-center justify-center',
                    pathname.includes('manage-account-unit') &&
                      'bg-blue_main !text-white',
                  )}
                >
                  <NavLink
                    to="/manage-account-unit"
                    className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                  >
                    <MdOutlineSupervisorAccount
                      size={20}
                      className="fill-current"
                    />
                    {isExpanded && <span>Tài khoản doanh nghiệp</span>}
                  </NavLink>
                </li>
                <li
                  className={clsx(
                    'w-full ',
                    isExpanded
                      ? 'flex items-start justify-start  px-4'
                      : 'flex items-center justify-center',
                    pathname.includes('manage-account-custommer') &&
                      'bg-blue_main !text-white',
                  )}
                >
                  <NavLink
                    to="/manage-account-custommer"
                    className={`group relative flex items-center gap-2.5 select-none py-2 font-normal  duration-300 ease-in-out`}
                  >
                    <MdOutlineSwitchAccount
                      size={20}
                      className="fill-current"
                    />
                    {isExpanded && <span>Tài khoản người dùng</span>}
                  </NavLink>
                </li>
              </ul>
            </div>
          )}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
