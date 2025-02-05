import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../../common/Loader';
import MessNotify from '../../components/MessNotify/MessNotify';
import { QUERY_KEY_HOTEL } from '../../configs/QuerykeyStore';
import { getAllHotels, updateStatus } from '../../services/api/hotel';
import HotelsViews from './HotelsViews';
const HotelsPage = () => {
  const queyClient = useQueryClient();
  const navigate = useNavigate();

  const [openListRoom, setOpenListRoom] = useState(null);
  const [filterListRoom, setFilterListRoom] = useState({
    name: '',
    price: '',
    sale: '',
    numberPeople: '',
    numberOfRoom: '',
    isAddChildren: null,
  });
  const [filterHotel, setFilterHotel] = useState({
    name: '',
    cancelFree: '',
    rating: null,
    createdAt: '',
    isFavorite: '',
    isActive: '',
  });

  const mutationUpdateStatus = useMutation({ mutationFn: updateStatus });
  const user = useSelector((state) => state.auth.user);

  const { data: listHotel, isLoading } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.GET_ALL],
    queryFn: async () => {
      const data = await getAllHotels({
        roles: user.roles,
        idCode: user.idCode,
      });
      if (data && data.data.length > 0) {
        return data.data;
      } else {
        return [];
      }
    },
    retryDelay: 1000,
    retry: 3,
    enabled: !!user && !!user.roles,
  });

  const _dataHotels = useMemo(() => {
    if (!listHotel) return [];

    if (listHotel.length > 0) {
      return listHotel.filter((item) => {
        return Object.keys(filterHotel).every((key) => {
          const filterValue = filterHotel[key];
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
          return itemValue
            ?.toString()
            .toLowerCase()
            .includes(filterValue.toString().toLowerCase());
        });
      });
    }

    return [];
  }, [listHotel, filterHotel]);
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
  const toogleSubItem = (index) => {
    setOpenListRoom(openListRoom === index ? null : index);
  };
  return (
    <HotelsViews
      listHotel={_dataHotels}
      handleUpdateStatus={handleUpdateStatus}
      user={user}
      openListRoom={openListRoom}
      setOpenListRoom={setOpenListRoom}
      toogleSubItem={toogleSubItem}
      filterListRoom={filterListRoom}
      setFilterListRoom={setFilterListRoom}
      filterHotel={filterHotel}
      setFilterHotel={setFilterHotel}
    />
  );
};
export default HotelsPage;
