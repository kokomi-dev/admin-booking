import Loader from '@/common/Loader';
import { QUERY_KEY_BOOKING } from '@/configs/QuerykeyStore';
import { getBookingAttraction, getBookingHotel } from '@/services/api/booking';
import { useQuery } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import BookingAttractionViews from './BookingAttractionViews';

const BookingAttractions = () => {
  const user = useSelector((state) => state.auth.user);
  const [filter, setFilter] = useState({
    nameAttraction: '',
    cityAttraction: '',
    emailUser: '',
    paymentMethod: '',
    totalBooked: '',
    numberOfTicketAdult: '',
    numberOfTicketChildren: '',
    dateStart: '',
    hourStart: '',
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

          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }

    return [];
  }, [listBookingAttraction, filter]);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <BookingAttractionViews
      filter={filter}
      setFilter={setFilter}
      listBooking={_dataListBooking}
    />
  );
};

export default BookingAttractions;
