import axios from 'axios'
import { toast } from 'react-toastify';
import userService from '../service/userService';

const instance = axios.create({
  baseURL: "http://localhost:3000/api/v1",
  withCredentials: true,
  timeout: 10 * 60 * 1000
})

// Add a request interceptor
instance.interceptors.request.use((config) => {
  // Do something before request is sent
  return config;
}, (error) => {
  // Do something with request error
  return Promise.reject(error);
});

// Add a response interceptor
instance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error

  // Nếu là lỗi 401 thì logout
  // if (error.response?.status === 401) {
  //   userService.logout()
  //     .then(() => {
  //       location.href = '/login'
  //     })
  // }

  // Nếu là lỗi 410 thì gọi api refresh token
  // Lấy các request api đang bị lỗi
  const originalRequest = error.config
  console.log("originalRequest", originalRequest)
  console.log(error.response)
  if (error.response?.status === 410  && !originalRequest._retry) {
    // originalRequest._retry = true;

    return userService.refreshTokenApi()
      .then(() => {

        // Gọi lại các request api ban đầu đang bị lỗi
        return instance(originalRequest)
      })
      .catch((_err) => {
        userService.logout()
          .then(() => {
            location.href = '/login'
          })

        return Promise.reject(_err)
      })
  }

  // Nếu status trả về không phải là lỗi 410 GONE
  if (error.response?.status !== 410) {
    toast.error(error.response?.data?.message)
    return
  }

  return Promise.reject(error);
});

export default instance

