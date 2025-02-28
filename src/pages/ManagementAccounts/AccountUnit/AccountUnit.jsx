import Loader from '@/common/Loader';
import MessNotify from '@/components/MessNotify/MessNotify';
import { QUERY_KEY_ACCOUNT } from '@/configs/QuerykeyStore';
import { reqDelUser, reqUpdateStatus } from '@/services/api/user';
import { getAllUser } from '@/services/api/user';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import AccountUnitViews from './AccountUnitViews';
import { useCallback, useMemo, useState } from 'react';

const AccountUnit = () => {
  const user = useSelector((state) => state.auth.user);
  const mutationUpdateStatus = useMutation({ mutationFn: reqUpdateStatus });
  const mutationDelUser = useMutation({ mutationFn: reqDelUser });

  const [filter, setFilter] = useState({
    name: '',
    numberPhone: '',
    address: '',
    idCode: '',
    taxCode: '',
    isActive: '',
    isUnitActive: '',
    nameAdmin: '',
  });
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
  const _dataAccountUnit = useMemo(() => {
    if (!listAccountPartner) return [];

    if (listAccountPartner.length > 0) {
      return listAccountPartner.filter((item) => {
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
            return item.infoUnit.unitName
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }

          if (filter.address) {
            return item.infoUnit.unitAddress
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.taxCode) {
            return item.infoUnit.unitTaxCode
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
  }, [filter, listAccountPartner]);
  const handleDelAccount = useCallback((id) => {
    mutationDelUser.mutate(id, {
      onSuccess: async (res) => {
        if (res.status === 200) {
          MessNotify.success(`Xóa thành công tài khoản `);
          queryClient.invalidateQueries(QUERY_KEY_ACCOUNT.GET_ALL_UNIT);
        }
      },
      onError: async (err) => {
        MessNotify.error('Xảy ra lỗi');
      },
    });
  }, []);
  if (isLoading || mutationUpdateStatus.isPending) {
    return <Loader />;
  }
  return (
    <AccountUnitViews
      handleUpdateStatus={handleUpdateStatus}
      listAccountPartner={_dataAccountUnit}
      filter={filter}
      setFilter={setFilter}
      handleDelAccount={handleDelAccount}
    />
  );
};

export default AccountUnit;
