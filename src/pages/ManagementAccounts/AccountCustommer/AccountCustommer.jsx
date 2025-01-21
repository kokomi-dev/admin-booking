import React from 'react';
import AccountCustommerViews from './AccountCustommerViews';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY_ACCOUNT } from '@/configs/QuerykeyStore';
import { getAllUser } from '@/services/api/user';
import { useSelector } from 'react-redux';
import Loader from '@/common/Loader';

const AccountCustommer = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: listAccountCustommer, isLoading } = useQuery({
    queryKey: QUERY_KEY_ACCOUNT.GET_ALL_CUSTOMMER,
    queryFn: async () => {
      const res = await getAllUser({
        groupId: user.groupId.join(','),
        key: 'custommer',
      });
      if (res && res.data) {
        return res.data;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  if (isLoading) {
    return <Loader />;
  }
  return <AccountCustommerViews listAccountCustommer={listAccountCustommer} />;
};

export default AccountCustommer;
