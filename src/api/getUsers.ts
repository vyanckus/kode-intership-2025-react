import axios from "axios";
import { EmployeesResponse, EmployeeType } from "../types/employeeType";

const API_URL =
  "https://stoplight.io/mocks/kode-frontend-team/koder-stoplight/86566464/users";

interface GetUsersParams {
  department?: string;
}

export async function getUsers(
  params?: GetUsersParams
): Promise<EmployeeType[]> {
  try {
    let url = API_URL;
    if (params?.department) {
      url += `?__example=${params.department}`;
    } else {
      url += "?__example=all";
    }

    const response = await axios.get<EmployeesResponse>(url, {
      headers: { "Content-Type": "application/json" },
    });

    return response.data.items;
  } catch (error: any) {
    console.error("Ошибка при получении сотрудников:", error);

    if (axios.isAxiosError(error)) {
      if (error.response) {
        console.log(
          "Server responded with status code:",
          error.response.status
        );
        console.log("Response data:", error.response.data);

        if (error.response.status === 500) {
          throw new Error("Произошла ошибка на сервере.");
        }
      } else {
        console.log("Request failed:", error.message);
      }
    }
    throw error;
  }
}
