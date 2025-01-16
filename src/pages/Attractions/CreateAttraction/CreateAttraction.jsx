import React, { useEffect, useState } from 'react';

import { addAttracion } from '../../../services/attraction';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../../../common/Loader';
import MessNotify from '../../../components/MessNotify/MessNotify';
import convertToSlug from '../../../utils/convertToSlug';
import CreateAttractionView from './CreateAttractionView';
import {
  getNameCommune,
  getNameDistrict,
  getNameProvince,
} from '../../../utils/location';

const CreateAttraction = () => {
  const isLoading = useSelector((state) => state.loading.isLoading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [price1, setPrice1] = useState();
  const [price2, setPrice2] = useState();
  const [duration, setDurration] = useState(1);
  const [schedule, setSchedule] = useState([]);
  const [file, setFile] = useState([]);
  const [countIncludes, setCountIncludes] = useState(1);
  const [included, setIncluded] = useState([]);
  const [isTrending, setIsTrending] = useState(false);
  const [cancelFree, setCancelFree] = useState(false);

  const [listProvinces, setListProvinces] = useState([]);
  const [listDistrict, setListDistricts] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [detail, setDetail] = useState('');
  const [full, setFull] = useState();
  const [searchProvinces, setSearchProvinces] = useState({
    id: '',
    name: '',
  });
  useEffect(() => {
    const getProvince = async () => {
      const data = await fetch('https://esgoo.net/api-tinhthanh/1/0.htm');
      const res = await data.json();
      if (res.error !== 0) {
        return MessNotify.warning('Lỗi khi lấy tỉnh thành');
      } else {
        setListProvinces(res.data);
      }
    };
    getProvince();
  }, [dispatch]);

  // handle envent choose location
  const [hiddenModal, setHiddenModal] = useState(true);

  const getDistricts = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/2/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return MessNotify.warning('Lỗi khi lấy quận/huyện thành');
    } else {
      setListDistricts(res.data);
    }
  };
  const getCommune = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/3/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return MessNotify.warning('Lỗi khi xã/ phường thành');
    } else {
      setListCommune(res.data);
    }
  };
  const getLocation = async (id) => {
    const data = await fetch(`https://esgoo.net/api-tinhthanh/5/${id}.htm`);
    const res = await data.json();
    if (res.error !== 0) {
      return MessNotify.warning('Lỗi khi lấy thông tin cụ thể');
    } else {
      return setFull(res.data);
    }
  };
  // handle request to server
  const handleSubmit = async (value) => {
    const provinceName = await getNameProvince(full.tinh);
    const districtName = await getNameDistrict(full.tinh, full.quan);
    const communeName = await getNameCommune(full.quan, full.phuong);
    const formData = new FormData();

    formData.append('name', value.name);
    formData.append('description', value.description);
    formData.append('isTrending', isTrending);
    formData.append('cancelFree', cancelFree);
    formData.append('difficulty', value.difficulty);
    formData.append('startDate', value.startDate);
    formData.append('maxGroupSize', value.maxGroupSize);
    formData.append('guides', value.guides);
    formData.append('price[]', price1);
    formData.append('price[]', price2);
    formData.append('city-slug', convertToSlug(searchProvinces.name));

    formData.append('numberOfTicketsAdult', value.numberOfTicketsAdult);
    formData.append('numberOfTicketsChildren', value.numberOfTicketsChildren);

    formData.append('location_detail', `${detail}`);
    formData.append('location_province_id', full.tinh);
    formData.append('location_district_id', full.quan);
    formData.append('location_commune_id', full.phuong);
    formData.append('location_province_name', provinceName);
    formData.append('location_district_name', districtName);
    formData.append('location_commune_name', communeName);

    formData.append('updatedAt', null);

    formData.append('unitCode', user.idCode);
    formData.append('city', searchProvinces.name);
    formData.append('duration', duration);
    schedule.forEach((item) => formData.append('schedule[]', item));
    included.forEach((item) => formData.append('included[]', item));
    formData.append('comments', []);
    formData.append('rating', value.rating);
    [...file].forEach((imageFile) => {
      formData.append('images', imageFile);
    });

    const res = await addAttracion(formData, dispatch);
    if (res.code === 201) {
      return MessNotify.success('Tạo mới thành công');
    } else {
      return MessNotify.warning('Tạo mới lỗi, Vui lòng liên hệ nhà phát triển');
    }
  };
  if (isLoading) {
    return <Loader />;
  }
  return (
    <CreateAttractionView
      detail={detail}
      duration={duration}
      hiddenModal={hiddenModal}
      setHiddenModal={setHiddenModal}
      setPrice1={setPrice1}
      setPrice2={setPrice2}
      setDurration={setDurration}
      setSchedule={setSchedule}
      setFile={setFile}
      setCountIncludes={setCountIncludes}
      countIncludes={countIncludes}
      setIncluded={setIncluded}
      isTrending={isTrending}
      setIsTrending={setIsTrending}
      cancelFree={cancelFree}
      setCancelFree={setCancelFree}
      listProvinces={listProvinces}
      listDistrict={listDistrict}
      listCommune={listCommune}
      setDetail={setDetail}
      searchProvinces={searchProvinces}
      setSearchProvinces={setSearchProvinces}
      getDistricts={getDistricts}
      getCommune={getCommune}
      getLocation={getLocation}
      handleSubmit={handleSubmit}
    />
  );
};
export default CreateAttraction;
