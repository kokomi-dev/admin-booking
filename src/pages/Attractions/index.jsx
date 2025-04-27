import Loader from '@/common/Loader';
import MessNotify from '@/components/MessNotify/MessNotify';
import { QUERY_KEY_ATTRACTION } from '@/configs/QuerykeyStore';
import {
  delAttractions,
  getAllAttractions,
  updateStatus,
} from '@/services/api/attraction';
import formatDateToISOString from '@/utils/formatDateToISO';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import AttractionViews from './AttractionViews';

const AttractionsPage = () => {
  const user = useSelector((state) => state.auth.user);
  const { data: listAttractions, isLoading } = useQuery({
    queryKey: [QUERY_KEY_ATTRACTION.GET_ALL],
    queryFn: async () => {
      const res = await getAllAttractions({
        unitCode: user.idCode,
        roles: user.roles,
      });
      if (res && res.status === 200) {
        return res.data.data;
      } else {
        return [];
      }
    },
    retry: 3,
    retryDelay: 1000,
    enabled: Boolean(user?.idCode && user?.roles),
  });
  const mutationUpdateStatus = useMutation({ mutationFn: updateStatus });
  const mutationDelete = useMutation({ mutationFn: delAttractions });
  const [filter, setFilter] = useState({
    location: '',
    numberOfTicketsAdult: '',
    numberOfTicketsChildren: '',
    name: '',
    priceAdult: '',
    priceChildren: '',
    startDate: '',
    isTrending: '',
    duration: '',
    rating: null,
    cancelFree: '',
    isActive: '',
  });

  const queyClient = useQueryClient();

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
  const [openUpdateTickets, setOpenUploadTickets] = useState({
    status: false,
    index: null,
    id: null,
  });
  const [dateSetAgain, setDateSetAgain] = useState('');
  const [numberTicketsAgain, setNumberTicketsAgain] = useState({
    adult: '',
    children: '',
  });
  const [openDel, setOpenDel] = useState({
    status: false,
    id: '',
  });
  // handle close date picker modal
  const handleCloseDatePicker = () => {
    setOpenDatePicker({
      status: false,
      index: null,
      id: null,
    });
  };
  const handleCloseUploadTickets = () => {
    setOpenUploadTickets({
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
        {
          data: { startDate: formatDateToISOString(dateSetAgain) },
          id: openDatePicker.id,
        },
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
  // handle update number of tickets
  const handleUpdateNumberOfTickets = () => {
    mutationUpdateStatus.mutate(
      {
        data: {
          numberOfTickets: {
            adult: Number(numberTicketsAgain.adult),
            children: Number(numberTicketsAgain.children),
          },
        },
        id: openUpdateTickets.id,
      },
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
    handleCloseUploadTickets();
  };
  // handle delete attractions
  const handleDeleteAttraction = () => {
    mutationDelete.mutate(openDel.id, {
      onSuccess: (res) => {
        if (res.status === 200) {
          MessNotify.success(res.data.message);
          queyClient.invalidateQueries(QUERY_KEY_ATTRACTION.GET_ALL);
          setOpenDel({
            status: false,
            id: '',
          });
        }
      },
      onError: async (error) => {
        MessNotify.error('Lỗi khi xóa địa điểm du lịch này ', error);
      },
    });
  };
  const _dataAttraction = useMemo(() => {
    if (!listAttractions) return [];

    if (listAttractions.length > 0) {
      return listAttractions.filter((item) => {
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

          if (filter.location) {
            return item.location.detail
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }

          if (filter.numberOfTicketsAdult) {
            return item.numberOfTickets.adult
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.numberOfTicketsChildren) {
            return item.numberOfTickets.children
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.priceAdult) {
            return item.price[0]
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.priceChildren) {
            return item.price[1]
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
  }, [filter, listAttractions]);
  if (isLoading || mutationDelete.isPending || mutationUpdateStatus.isPending) {
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
      handleDeleteAttraction={handleDeleteAttraction}
      openDel={openDel}
      setOpenDel={setOpenDel}
      filter={filter}
      setFilter={setFilter}
      openUpdateTickets={openUpdateTickets}
      setOpenUploadTickets={setOpenUploadTickets}
      handleCloseUploadTickets={handleCloseUploadTickets}
      numberTicketsAgain={numberTicketsAgain}
      setNumberTicketsAgain={setNumberTicketsAgain}
      handleUpdateNumberOfTickets={handleUpdateNumberOfTickets}
    />
  );
};
export default AttractionsPage;
