import axios from 'axios'
import { toast } from 'react-toastify';

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
    console.log(error)

    if(error.response?.status !== 410) {
        toast.error(error.response?.data?.message)
        return
    }

    return Promise.reject(error);
  });

export default instance

