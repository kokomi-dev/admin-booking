import React from 'react';
import AccountUnitViews from './AccountUnitViews';
import { useSelector } from 'react-redux';
import { QUERY_KEY_ACCOUNT } from '@/configs/QuerykeyStore';
import Loader from '@/common/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllUser } from '@/services/api/user';
import { reqUpdateStatus } from '@/services/api/auth';
import MessNotify from '@/components/MessNotify/MessNotify';

const AccountUnit = () => {
  const user = useSelector((state) => state.auth.user);
  const mutationUpdateStatus = useMutation({ mutationFn: reqUpdateStatus });
  const { data: listAccountPartner, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ACCOUNT.GET_ALL_UNIT],
    queryFn: async () => {
      const res = await getAllUser({
        groupId: user.groupId.join(','),
        key: 'partner',
      });
      if (res && res.data) {
        return res.data;
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  const queryClient = useQueryClient();
  const handleUpdateStatus = (data) => {
    mutationUpdateStatus.mutate(data, {
      onSuccess: async (data) => {
        if (data.code === 200) {
          MessNotify.success('Cập nhật thành công');
          queryClient.invalidateQueries(QUERY_KEY_ACCOUNT.GET_ALL_UNIT);
        }
      },
    });
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <AccountUnitViews
      handleUpdateStatus={handleUpdateStatus}
      listAccountPartner={listAccountPartner}
    />
  );
};

export default AccountUnit;
