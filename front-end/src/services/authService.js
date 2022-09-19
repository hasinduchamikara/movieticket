import http, { Axios } from "../config/httpHelper";

const httpRequest = {
  loginUser: (data) =>
    //http
    Axios("http://localhost:5000/api/v1").post("/users/sign-in", data),
};

export default httpRequest;
