import axios from "axios";

export default axios.create({
//   baseURL: "http://ec2-13-125-249-233.ap-northeast-2.compute.amazonaws.com",
  baseURL: "http://localhost:5000/api",
  timeout: 3000,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json"
  }
});
