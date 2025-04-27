import Loader from '@/common/Loader';
import { QUERY_KEY_BOOKING, QUERY_KEY_HOTEL } from '@/configs/QuerykeyStore';
import {
  getBookingHotel,
  updateStatusBookingHotel,
} from '@/services/api/booking';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import BookingHotelsViews from './BookingHotelsViews';
import MessNotify from '@/components/MessNotify/MessNotify';

const BookingHotels = () => {
  const queryClient = useQueryClient();
  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState({
    emailUser: '',
    hotelName: '',
    paymentMethod: '',
    totalBooked: '',
    bookedDate: '',
    isSuccess: '',
  });
  const { data: listBookingHotel, isLoading } = useQuery({
    queryKey: [QUERY_KEY_BOOKING.GET_ALL_HOTEL],
    queryFn: async () => {
      const res = await getBookingHotel({
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
    if (!listBookingHotel) return [];

    if (listBookingHotel.length > 0) {
      return listBookingHotel.filter((item) => {
        return Object.keys(filter).every((key) => {
          const filterValue = filter[key];
          const itemValue = item[key];
          if (filterValue === '' || filterValue === 0) return true;
          if (filter.emailUser) {
            return item.infoUser.email
              ?.toString()
              .toLowerCase()
              .includes(filterValue.toString().toLowerCase());
          }
          if (filter.hotelName) {
            return item.infoHotel.name
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
  }, [listBookingHotel, filter]);
  const mutationUpdateStatus = useMutation({
    mutationFn: updateStatusBookingHotel,
  });
  const handleUpdateStatusHotel = useCallback(async ({ id, data }) => {
    mutationUpdateStatus.mutate(
      {
        id,
        data,
      },
      {
        onSuccess: async (res) => {
          if (res.status === 200) {
            MessNotify.success('Cập nhật thành công');
            queryClient.invalidateQueries(QUERY_KEY_BOOKING.GET_ALL_HOTEL);
          }
        },
        onError: async (err) => {
          return MessNotify.error('Cập nhật không thành công');
        },
      },
    );
  }, []);
  if (isLoading || mutationUpdateStatus.isPending) {
    return <Loader />;
  }
  return (
    <BookingHotelsViews
      filter={filter}
      setFilter={setFilter}
      listBooking={_dataListBooking}
      handleUpdateStatusHotel={handleUpdateStatusHotel}
    />
  );
};

export default BookingHotels;
