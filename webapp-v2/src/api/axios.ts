import axios from "axios";
const BASE_URL = "http://192.168.3.110:8090";

export default axios.create({
  baseURL: BASE_URL,
});
