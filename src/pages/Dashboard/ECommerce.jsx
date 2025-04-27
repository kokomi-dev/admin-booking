import React, { useMemo } from 'react';
import ECommerceViews from './ECommerceView';
import { useQueries } from '@tanstack/react-query';
import {
  QUERY_KEY_ATTRACTION,
  QUERY_KEY_BOOKING,
  QUERY_KEY_HOTEL,
  QUERY_KEY_USER,
} from '../../configs/QuerykeyStore';
import { getAllAttractions } from '../../services/api/attraction';
import { getAllHotels } from '../../services/api/hotel';
import { getAllUser } from '../../services/api/user';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';
import checkPermissionUser from '../../utils/checkPermissionUser';
import { checkReqUserSucess } from '../../utils';
import { getBookingAttraction } from '@/services/api/booking';

const ECommerce = () => {
  const user = useSelector((state) => state.auth.user);
  const [attractionsQuery, hotelsQuery, unitQuery, userQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
        queryFn: async () => {
          const res = await getAllAttractions({
            roles: user.roles,
            unitCode: user.idCode,
          });
          if (res && res.status === 200) {
            return res.data.data;
          }
        },
        retry: 3,
        retryDelay: 1000,
        enabled: checkReqUserSucess(user),
      },
      {
        queryKey: [QUERY_KEY_HOTEL.GET_ALL],
        queryFn: async () => {
          const data = await getAllHotels({
            roles: user.roles,
            idCode: user.idCode,
          });
          if (data && data.data.length > 0) {
            return data.data;
          }
        },
        retry: 3,
        retryDelay: 1000,
        enabled: checkReqUserSucess(user),
      },
      {
        queryKey: [QUERY_KEY_USER.GET_ALL],
        queryFn: async () => {
          const data = await getAllUser({
            groupId: user.groupId.join(','),
            roles: user.roles,
            isActive: true,
            key: 'partner',
          });
          if (data && data.data.length > 0) {
            return data.data;
          }
        },
        retry: 3,
        retryDelay: 1000,
        enabled: user.roles === 'admin',
      },
      {
        queryKey: [QUERY_KEY_USER.GET_ALL_CUSTOMMER],
        queryFn: async () => {
          const data = await getAllUser({
            groupId: user.groupId.join(','),
            roles: user.roles,
            isActive: true,
            key: 'custommer',
          });
          if (data && data.data.length > 0) {
            return data.data;
          }
        },
        retry: 3,
        retryDelay: 1000,
        enabled: user.roles === 'admin',
      },
    ],
  });
  const [bookedAttractionQuery, bookedHotelQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY_BOOKING.GET_ALL_ATTRACTION],
        queryFn: async () => {
          const res = await getBookingAttraction({
            roles: user.roles,
            unitCode: user.idCode,
          });
          if (res && res.data.data.length > 0) {
            return res.data.data;
          } else {
            return [];
          }
        },
        enabled: !!user && !!user.roles,
        retry: 3,
        retryDelay: 1000,
      },
    ],
  });
  const _dataLengthAttraction = useMemo(() => {
    return attractionsQuery?.data?.length || 0;
  }, [attractionsQuery?.data]);
  const _dataLengthHotel = useMemo(() => {
    return hotelsQuery?.data?.length || 0;
  }, [hotelsQuery?.data]);

  const _dataLengthUser = useMemo(() => {
    return userQuery?.data?.length || 0;
  }, [userQuery?.data]);

  return (
    <ECommerceViews
      lengthAttraction={_dataLengthAttraction}
      lengthHotel={_dataLengthHotel}
      lengthUnit={unitQuery?.data?.length || 0}
      lengthUser={_dataLengthUser}
      user={user}
    />
  );
};

export default ECommerce;
