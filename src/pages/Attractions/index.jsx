import React, { useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY_ATTRACTION } from '../../configs/QuerykeyStore';
import {
  delAttractions,
  getAllAttractions,
  updateStatus,
} from '../../services/api/attraction';
import Loader from '../../common/Loader';
import AttractionViews from './AttractionViews';
import MessNotify from '../../components/MessNotify/MessNotify';

const AttractionsPage = () => {
  const { data: listAttractions, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
    queryFn: async () => {
      const data = await getAllAttractions();
      if (data && data.data.length > 0) {
        return data.data;
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
  });
  const mutationUpdateStatus = useMutation({ mutationFn: updateStatus });
  const mutationDelete = useMutation({ mutationFn: delAttractions });

  const queyClient = useQueryClient();

  const _dataAttraction = useMemo(() => {
    return listAttractions || [];
  }, [listAttractions]);
  const handleUpdateStatus = ({ data, id }) => {
    mutationUpdateStatus.mutate(
      { data: data, id: id },
      {
        onSuccess: async (data) => {
          if (data.code === 200) {
            MessNotify.success('Cập nhật thành công');
            queyClient.invalidateQueries(QUERY_KEY_ATTRACTION.GET_ALL);
          }
        },
        onError: async () => {
          MessNotify.error('Lỗi khi cập nhật');
        },
      },
    );
  };
  const [openDatePicker, setOpenDatePicker] = useState({
    status: false,
    index: null,
    id: null,
  });
  const [dateSetAgain, setDateSetAgain] = useState('');
  // handle close date picker modal
  const handleCloseDatePicker = () => {
    setOpenDatePicker({
      status: false,
      index: null,
      id: null,
    });
  };
  // handle update date
  const handleSendSetDate = () => {
    if (dateSetAgain === '') {
      MessNotify.warning('Vui lòng chọn ngày');
    } else {
      mutationUpdateStatus.mutate(
        { data: { startDate: dateSetAgain }, id: openDatePicker.id },
        {
          onSuccess: async (data) => {
            if (data.code === 200) {
              MessNotify.success('Cập nhật thành công');
              await queyClient.invalidateQueries(QUERY_KEY_ATTRACTION.GET_ALL);
            }
          },
          onError: async () => {
            MessNotify.error('Lỗi khi cập nhật');
          },
        },
      );
      handleCloseDatePicker();
    }
  };
  // handle delete attractions
  const handleDeleteAttractions = (id) => {
    if (id) {
      mutationDelete.mutate([id], {
        onSuccess: (res) => {
          // console.log(res);
        },
        onError: async (error) => {
          MessNotify.error('Lỗi khi xóa địa điểm du lịch này ', error);
        },
      });
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  if (mutationUpdateStatus.isPending && mutationUpdateStatus.isLoading) {
    return <Loader />;
  }
  return (
    <AttractionViews
      listAttractions={_dataAttraction}
      openDatePicker={openDatePicker}
      setOpenDatePicker={setOpenDatePicker}
      handleUpdateStatus={handleUpdateStatus}
      handleCloseDatePicker={handleCloseDatePicker}
      setDateSetAgain={setDateSetAgain}
      handleSendSetDate={handleSendSetDate}
      handleDeleteAttractions={handleDeleteAttractions}
    />
  );
};
export default AttractionsPage;
