import axios from "axios"
import { getDataStorage } from "../utils/handleStorage"

const API = axios.create({
  baseURL: import.meta.env["VITE_API_SERVICE_URL"],
  responseType: "json",
  // withCredentials: true,
})

const token = getDataStorage("token")?.token

API.defaults.timeout = 20000
API.defaults.headers.post["Content-Type"] = "application/json"
API.defaults.headers.common["ngrok-skip-browser-warning"] = "true"
API.defaults.headers.common["Authorization"] = `Bearer ${token ? token : ""}`

// API.interceptors.response.use(
//   function (response) {
//     if (response.data && response.data.error_code === 401) {
//     }
//     return response
//   },
//   function (error) {
//     if (
//       error?.response?.status === 401 &&
//       error?.response?.data?.code === 401
//     ) {
//     }

//     return Promise.reject(error)
//   },
// )

export const apiService = async (
  method: "post" | "put" | "get" | "delete" | "patch",
  url: string,
  params?: any,
  data?: any,
) => {
  try {
    const response = await API({
      method,
      url,
      params,
      data,
    })
    return response.data
  } catch (error) {
    throw error
  } finally {
    console.log(`${method} ${url} finally`)
  }
}

export default apiService
