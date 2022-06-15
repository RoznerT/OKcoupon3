import axios from "axios";

const jwtAxios = axios.create();

jwtAxios.interceptors.request.use((request) => {
  request.headers = {
    authorization: "Bearer " + localStorage.getItem("token"),
  };
  return request;
});

jwtAxios.interceptors.response.use((response) => {
  localStorage.setItem("token", response.headers.authorization);
  return response;
});

export default jwtAxios;
