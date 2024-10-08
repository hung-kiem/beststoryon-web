import { Category } from "@/models";
import axiosClient from "./axios-client";

export const categoryApi = {
  getList(): Promise<Category[]> {
    return axiosClient
      .post<Category[]>("/category/getList", null)
      .then((response) => response.data);
  },
};
