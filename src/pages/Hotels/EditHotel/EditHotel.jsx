import React, { useEffect, useState } from 'react';
import EditHotelView from './EditHotelView';
import { useSearchParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { QUERY_KEY_HOTEL } from '../../../configs/QuerykeyStore';
import { editHotel, getDetailHotel } from '../../../services/hotel';
import { useForm } from 'antd/es/form/Form';
import {
  getDistricts,
  getLocation,
  getProvince,
} from '../../../services/location';
import {
  getNameCommune,
  getNameDistrict,
  getNameProvince,
} from '../../../utils/location';
const EditHotel = () => {
  const [params] = useSearchParams();
  const slug = params.get('slug');
  const [form] = useForm();

  const {
    data: detailHotel,
    isLoading,
    isSuccess,
  } = useQuery({
    queryKey: [QUERY_KEY_HOTEL.DETAIL],
    queryFn: async () => {
      const res = await getDetailHotel(slug);
      if (res && res.code === 200) {
        return res.data;
      } else return [];
    },
  });
  const { data: listProvinces } = useQuery({
    queryKey: ['GET_LIST_PROVINCES'],
    queryFn: async () => {
      const res = await getProvince();
      if (res && res.error === 0) {
        return res.data;
      } else {
        return [];
      }
    },
  });

  // state
  const [fullLocation, setFullLocation] = useState(null);
  const [searchProvinces, setSearchProvinces] = useState('');
  const [hiddenModal, setHiddenModal] = useState(true);
  const [listDistrict, setListDistricts] = useState([]);
  const [listCommune, setListCommune] = useState([]);
  const [detail, setDetail] = useState('');
  const [file, setFile] = useState(null);
  const [highlights, setHighlights] = useState([]);
  const [includes, setIncludes] = useState([]);

  const [infoRoom, setInfoRoom] = useState([
    {
      name: '',
      details: '',
      isAddChildren: null,
      price: 0,
      sale: 0,
      numberPeople: 0,
    },
  ]);
  const [state, setState] = useState({
    cancelFree: '',
    countHighlight: '',
    countInclude: '',
    includes: [],
    countRoom: '',
    images: [],
  });

  useEffect(() => {
    const filedDataDetail = async () => {
      try {
        if (isSuccess && detailHotel) {
          const location = detailHotel.location;
          const getDetailLocation = await getLocation(location.commune.id);
          if (getDetailLocation.error === 0) {
            setFullLocation(getDetailLocation.data);
          }
          const dataSet = {
            cancelFree: detailHotel.cancelFree,
            countHighlight: detailHotel.highlights?.length || 0,
            countInclude: detailHotel.includes.length,
            countRoom: detailHotel.listRooms.length,
            images: detailHotel.images,
          };
          setDetail(location.detail);
          setInfoRoom(detailHotel.listRooms);
          setState(dataSet);
          setHighlights(detailHotel.highlights);
          setIncludes(detailHotel.includes);
          const initValueForm = {
            name: detailHotel.name,
            details: detailHotel.details,
            type: detailHotel.type,
            location: {
              province: location.province.name,
              district: location.district.name,
              commune: location.commune.name,
            },
          };
          form.setFieldsValue(initValueForm);
          setSearchProvinces(location.province.name);
          const listDis = await getDistricts(location.province.id);
          setListDistricts(listDis);
        }
      } catch (error) {
        console.log(error);
      }
    };
    filedDataDetail();
  }, [detailHotel, isSuccess, form]);
  const mutationEditHotel = useMutation({
    mutationFn: editHotel,
  });
  const handleSubmit = async (value) => {
    const formData = new FormData();
    const provinceName = await getNameProvince(fullLocation.tinh);
    const districtName = await getNameDistrict(
      fullLocation.tinh,
      fullLocation.quan,
    );
    const communeName = await getNameCommune(
      fullLocation.quan,
      fullLocation.phuong,
    );
    formData.append('name', value.name);
    formData.append('details', value.details);
    formData.append('type', value.type);
    formData.append('cancelFree', state.cancelFree);
    formData.append('location_detail', `${detail}`);
    formData.append('location_province_id', fullLocation.tinh);
    formData.append('location_district_id', fullLocation.quan);
    formData.append('location_commune_id', fullLocation.phuong);
    formData.append('location_province_name', provinceName);
    formData.append('location_district_name', districtName);
    formData.append('location_commune_name', communeName);
    state.images.forEach((item) => formData.append('images[]', item));
    infoRoom.forEach((room, index) => {
      formData.append(`infoRoom[${index}][name]`, room.name);
      formData.append(`infoRoom[${index}][detail]`, room.details);
      formData.append(`infoRoom[${index}][price]`, room.price);
      formData.append(`infoRoom[${index}][numberPeople]`, room.numberPeople);
      formData.append(`infoRoom[${index}][sale]`, room.sale);
      formData.append(`infoRoom[${index}][isAddChildren]`, room.isAddChildren);
    });
    file !== null &&
      [...file].forEach((imageFile) => {
        formData.append('images', imageFile);
      });

    includes.length > 0
      ? includes.forEach((item) => formData.append('includes[]', item))
      : formData.append('includes[]');
    highlights.forEach((item) => formData.append('highlights[]', item));
    mutationEditHotel.mutate(
      { slug: detailHotel._id, formData },
      {
        onSuccess: async (data) => {
          console.log(data);
        },
        onError: (error) => {
          console.log(error);
        },
      },
    );
  };

  return (
    <EditHotelView
      form={form}
      nameHotel={detailHotel.name}
      searchProvinces={searchProvinces}
      setSearchProvinces={setSearchProvinces}
      listProvinces={listProvinces}
      listDistrict={listDistrict}
      setListDistricts={setListDistricts}
      listCommune={listCommune}
      setListCommune={setListCommune}
      detail={detail}
      setDetail={setDetail}
      detailHotel={detailHotel}
      isLoading={isLoading}
      handleSubmit={handleSubmit}
      state={state}
      setState={setState}
      hiddenModal={hiddenModal}
      setHiddenModal={setHiddenModal}
      fullLocation={fullLocation}
      infoRoom={infoRoom}
      setInfoRoom={setInfoRoom}
      file={file}
      setFile={setFile}
      highlights={highlights}
      setHighlights={setHighlights}
      includes={includes}
      setIncludes={setIncludes}
    />
  );
};

export default EditHotel;
