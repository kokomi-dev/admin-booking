import React, { useCallback, useMemo, useState } from 'react';
import AccountCustommerViews from './AccountCustommerViews';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_ACCOUNT } from '@/configs/QuerykeyStore';
import { getAllUser, reqDelUser } from '@/services/api/user';
import { useSelector } from 'react-redux';
import Loader from '@/common/Loader';
import { reqUpdateStatus } from '@/services/api/user';
import MessNotify from '@/components/MessNotify/MessNotify';

const AccountCustommer = () => {
  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState({
    name: '',
    numberPhone: '',
    email: '',
    isActive: '',
  });
  const { data: listAccountCustommer, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ACCOUNT.GET_ALL_CUSTOMMER],
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
  const mutationUpdateStatus = useMutation({
    mutationFn: reqUpdateStatus,
  });
  const mutationDelUser = useMutation({ mutationFn: reqDelUser });
  const queryClient = useQueryClient();
  const handleUpdateStatus = (data) => {
    mutationUpdateStatus.mutate(data, {
      onSuccess: async (data) => {
        if (data.code === 200) {
          MessNotify.success('Cập nhật thành công');
          queryClient.invalidateQueries(QUERY_KEY_ACCOUNT.GET_ALL_CUSTOMMER);
        }
      },
    });
  };
  const _dataAccountCustommer = useMemo(() => {
    if (!listAccountCustommer) return [];

    if (listAccountCustommer.length > 0) {
      return listAccountCustommer.filter((item) => {
        return Object.keys(filter).every((key) => {
          const filterValue = filter[key];
          const itemValue = item[key];
          if (
            filterValue === null ||
            filterValue === undefined ||
            filterValue === ''
          )
            return true;
          if (typeof filterValue === 'boolean') {
            return filterValue === Boolean(itemValue);
          }

          if (filter.name) {
            return item.lastname
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }

    return [];
  }, [filter, listAccountCustommer]);
  const handleDelAccount = useCallback((id) => {
    mutationDelUser.mutate(id, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          MessNotify.success(`Xóa thành công tài khoản `);
          queryClient.invalidateQueries(QUERY_KEY_ACCOUNT.GET_ALL_CUSTOMMER);
        }
      },
      onError: async (err) => {
        MessNotify.error('Xảy ra lỗi');
      },
    });
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <AccountCustommerViews
      filter={filter}
      setFilter={setFilter}
      handleUpdateStatus={handleUpdateStatus}
      listAccountCustommer={_dataAccountCustommer}
      handleDelAccount={handleDelAccount}
    />
  );
};

export default AccountCustommer;
