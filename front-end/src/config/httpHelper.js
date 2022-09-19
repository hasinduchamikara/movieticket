import axios from "axios";

const http = axios.create({
  baseURL: `${process.env.REACT_APP_API}`,
});

export const Axios = (baseURL) =>
  axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });

export default http;
