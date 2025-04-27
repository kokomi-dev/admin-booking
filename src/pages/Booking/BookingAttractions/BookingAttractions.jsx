import Loader from '@/common/Loader';
import { QUERY_KEY_BOOKING } from '@/configs/QuerykeyStore';
import {
  getBookingAttraction,
  getBookingHotel,
  updateStatusBookingAttraction,
} from '@/services/api/booking';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import BookingAttractionViews from './BookingAttractionViews';
import MessNotify from '@/components/MessNotify/MessNotify';

const BookingAttractions = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState({
    nameAttraction: '',
    cityAttraction: '',
    emailUser: '',
    paymentMethod: '',
    paymentStatus: '',
    totalBooked: '',
    bookedDate: '',
    isSuccess: '',
  });
  const { data: listBookingAttraction, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BOOKING.GET_ALL_ATTRACTION],
    queryFn: async () => {
      const res = await getBookingAttraction({
        unitCode: user.idCode,
        roles: user.roles,
      });
      if (res && res.data.data.length > 0) {
        return res.data.data;
      } else {
        return [];
      }
    },
    enabled: !!user && !!user.idCode,
    retry: 3,
    retryDelay: 1000,
  });
  const _dataListBooking = useMemo(() => {
    if (!listBookingAttraction) return [];

    if (listBookingAttraction.length > 0) {
      return listBookingAttraction.filter((item) => {
        return Object.keys(filter).every((key) => {
          const filterValue = filter[key];
          const itemValue = item[key];
          if (filterValue === '' || filterValue === 0) return true;
          if (filter.nameAttraction) {
            return item.infoAttraction.name
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.emailUser) {
            return item.infoUser.email
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.cityAttraction) {
            return item.infoAttraction.address
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
  }, [listBookingAttraction, filter]);
  const mutationUpdateStatus = useMutation({
    mutationFn: updateStatusBookingAttraction,
  });
  const handleUpdateStatusAttraction = useCallback(async ({ id, data }) => {
    mutationUpdateStatus.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            MessNotify.success('Cập nhật thành công');
            queryClient.invalidateQueries(QUERY_KEY_BOOKING.GET_ALL_ATTRACTION);
          }
        },
        onError: async (err) => {
          return MessNotify.error('Cập nhật không thành công');
        },
      },
    );
  }, []);
  if (isLoading) {
    return <Loader />;
  }

  return (
    <BookingAttractionViews
      filter={filter}
      setFilter={setFilter}
      listBooking={_dataListBooking}
      handleUpdateStatusAttraction={handleUpdateStatusAttraction}
    />
  );
};

export default BookingAttractions;
