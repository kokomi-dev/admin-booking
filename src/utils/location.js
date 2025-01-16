const getNameProvince = async (id) => {
  try {
    const response = await fetch("https://esgoo.net/api-tinhthanh/1/0.htm");
    const result = await response.json();

    if (result.error === 0) {
      const province = result.data.find((item) => item.id === id);
      return province ? province.name : null;
    }

    throw new Error("Error fetching provinces");
  } catch (error) {
    console.error("Error in getNameProvince:", error);
    return null;
  }
};
const getNameDistrict = async (idProvince, idDistrict) => {
  try {
    const response = await fetch(
      `https://esgoo.net/api-tinhthanh/2/${idProvince}.htm`
    );
    const result = await response.json();

    if (result.error === 0) {
      const district = result.data.find((item) => item.id === idDistrict);
      return district ? district.name : null;
    }

    throw new Error("Error fetching provinces");
  } catch (error) {
    console.error("Error in getNameProvince:", error);
    return null;
  }
};

const getNameCommune = async (idDistrict, idCommune) => {
  try {
    const response = await fetch(
      `https://esgoo.net/api-tinhthanh/3/${idDistrict}.htm`
    );
    const result = await response.json();

    if (result.error === 0) {
      const commune = result.data.find((item) => item.id === idCommune);
      return commune ? commune.name : null;
    }

    throw new Error("Error fetching provinces");
  } catch (error) {
    console.error("Error in getNameProvince:", error);
    return null;
  }
};

export { getNameProvince, getNameDistrict, getNameCommune };
