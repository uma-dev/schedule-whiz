import api from "../api/axiosConfig";
import getDate from "./getDate";

export const getNumRecordsByEmployeeEmailAndMonth = async (
  employeeEmail: string | null,
  token: string | null,
): Promise<number> => {
  const date = getDate();
  const month = date.split("/")[0];
  const year = date.split("/")[2];
  try {
    const response = await api.get(
      `/api/records/searchbymonth?employeeEmail=${employeeEmail}&month=${month}&year=${year}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data as number;
  } catch (error) {
    console.error(
      "Error fetching records by employee email and month: ",
      error,
    );
    throw error;
  }
};
