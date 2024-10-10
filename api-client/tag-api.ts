import axiosClient from "./axios-client";
import { Tag, TagListResponse } from "@/models/tag";

export const tagApi = {
  // Hàm lấy danh sách tag
  getList(): Promise<Tag[]> {
    return axiosClient
      .get<Tag[]>("/tag/getList")
      .then((response) => response.data);
  },

  // Hàm lấy tag theo chữ cái đầu tiên
  getTagByFirstLetter(firstLetter: string): Promise<TagListResponse> {
    return axiosClient
      .get<TagListResponse>(`/tag/getTagByFirstLetter`, {
        params: { firstLetter },
      })
      .then((response) => response.data);
  },
};
