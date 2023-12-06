import axios from "axios";
import { Employee } from "../types/Employee";

const API_BASE_URL = "https://192.168.3.110:8090/api";

const getEmployeeById = async (employeeId: number): Promise<Employee> => {
  const response = await axios.get(`${API_BASE_URL}/employees/${employeeId}`);
  return response.data;
};

export default getEmployeeById;
