import axios from "axios";
// 상황따라 주소 다름
const LOCAL_BACKEND = process.env.REACT_APP_LOCAL_BACKEND;
// const PROD_BACKEND = process.env.REACT_APP_PROD_BACKEND;
// const BACKEND_PROXY = process.env.REACT_APP_BACKEND_PROXY;

const api = axios.create({
  // baseURL: `${BACKEND_PROXY}/api`,
  baseURL: LOCAL_BACKEND,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem("token")}`,
  },
});
/**
 * console.log all requests and responses
 */
api.interceptors.request.use(
  (request) => {
    console.log("Starting Request", request);
    // request.headers.authorization = `Bearer ${sessionStorage.getItem("token")}`;

    // 헤더에 토큰 추가하는 부분 수정
    const token = sessionStorage.getItem("token");
    if (token) {
      request.headers.authorization = `Bearer ${token}`;
    }
    
    return request;
  },
  function (error) {
    console.log("REQUEST ERROR", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    // error = error.response.data;
    error = error.response ? error.response.data : { message: "Unknown error" }; // 에러 처리 부분 수정
    console.log("RESPONSE ERROR", error);
    return Promise.reject(error);
  }
);

export default api;