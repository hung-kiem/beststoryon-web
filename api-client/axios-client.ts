import axios from "axios";

const axiosClient = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.response.use(
  function (response) {
    console.log("response", response);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default axiosClient;
