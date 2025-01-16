import React, { useMemo } from 'react';
import { Button, Space, Table } from 'antd';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { QUERY_KEY_HOTEL } from '../../configs/QuerykeyStore';
import Loader from '../../common/Loader';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getAllHotels, updateStatus } from '../../services/hotel';
import { Link } from 'react-router-dom';
import HotelsViews from './HotelsViews';
import MessNotify from '../../components/MessNotify/MessNotify';
const HotelsPage = () => {
  const queyClient = useQueryClient();

  const navigate = useNavigate();
  const mutationUpdateStatus = useMutation({ mutationFn: updateStatus });
  const { data: listHotel, isLoading } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL],
    queryFn: async () => {
      const data = await getAllHotels();
      if (data && data.data.length > 0) {
        return data.data;
      } else {
        return [];
      }
    },
    retryDelay: 1000,
    retry: 3,
  });
  const _dataHotels = useMemo(() => {
    return listHotel || [];
  }, [listHotel]);

  if (isLoading) {
    return <Loader />;
  }
  const handleUpdateStatus = ({ data, id }) => {
    mutationUpdateStatus.mutate(
      { data: data, id: id },
      {
        onSuccess: async (data) => {
          if (data.code === 200) {
            MessNotify.success('Cập nhật thành công');
            queyClient.invalidateQueries(QUERY_KEY_HOTEL.GET_ALL);
          }
        },
        onError: async () => {
          MessNotify.error('Lỗi khi cập nhật');
        },
      },
    );
  };
  return (
    <HotelsViews
      listHotel={_dataHotels}
      handleUpdateStatus={handleUpdateStatus}
    />
  );
};
export default HotelsPage;
