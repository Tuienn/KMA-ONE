import axios from "axios"

export const apiGetProvinces = async () => {
  try {
    const response = await axios.get(
      "https://open.oapi.vn/location/provinces?page=0&size=100",
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}

export const apiGetDistricts = async (provinceId: string) => {
  try {
    const response = await axios.get(
      `https://open.oapi.vn/location/districts/${provinceId}?page=0&size=100`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}
export const apiGetWards = async (districtId: string) => {
  try {
    const response = await axios.get(
      `https://open.oapi.vn/location/wards/${districtId}?page=0&size=100`,
    )
    return response.data.data
  } catch (error) {
    throw error
  }
}
