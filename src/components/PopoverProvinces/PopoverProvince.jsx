import { getDistricts } from '../../services/location';

const PopoverListProvinces = ({
  hiddenModal,
  listProvinces,
  searchProvinces,
  setSearchProvinces,
  setListDistricts,
}) => {
  return (
    <ul
      hidden={hiddenModal}
      className="max-h-[30vh] overflow-y-auto absolute top-[40px] z-10 right-0 w-[300px] bg-white text-black shadow-2xl"
    >
      {listProvinces?.length > 0 &&
        listProvinces
          .filter((province) =>
            province.name
              .toLowerCase()
              .includes(
                searchProvinces?.toLowerCase()
                  ? searchProvinces?.toLowerCase()
                  : ' ',
              ),
          )
          .map((province, index) => {
            return (
              <li
                key={index}
                value={province.name}
                className="p-1 hover:cursor-pointer hover:bg-slate-200 pl-3"
                onMouseDown={async () => {
                  setSearchProvinces(province.name);
                  const dataDistricts = await getDistricts(province.id);
                  setListDistricts(dataDistricts);
                }}
              >
                {province.name}
              </li>
            );
          })}
    </ul>
  );
};
export default PopoverListProvinces;
