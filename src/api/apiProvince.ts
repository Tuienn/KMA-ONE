import axios from "axios"

export const apiGetProvinces = async () => {
  const response = await axios.get(
    "https://open.oapi.vn/location/provinces?page=0&size=100",
  )
  return response.data.data
}

export const apiGetDistricts = async (provinceId: string) => {
  const response = await axios.get(
    `https://open.oapi.vn/location/districts/${provinceId}?page=0&size=100`,
  )
  return response.data.data
}
export const apiGetWards = async (districtId: string) => {
  const response = await axios.get(
    `https://open.oapi.vn/location/wards/${districtId}?page=0&size=100`,
  )
  return response.data.data
}
