import React, { useMemo } from 'react';
import ECommerceViews from './ECommerceView';
import { useQueries } from '@tanstack/react-query';
import {
  QUERY_KEY_ATTRACTION,
  QUERY_KEY_HOTEL,
  QUERY_KEY_USER,
} from '../../configs/QuerykeyStore';
import { getAllAttractions } from '../../services/attraction';
import { getAllHotels } from '../../services/hotel';
import { getAllUser } from '../../services/user';
import { useSelector } from 'react-redux';
import Loader from '../../common/Loader';
import checkPermissionUser from '../../utils/checkPermissionUser';
import { checkReqUserSucess } from '../../utils';

const ECommerce = () => {
  const user = useSelector((state) => state.auth.user);
  const [attractionsQuery, hotelsQuery, unitQuery, userQuery] = useQueries({
    queries: [
      {
        queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
        queryFn: async () => {
          const data = await getAllAttractions({
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
