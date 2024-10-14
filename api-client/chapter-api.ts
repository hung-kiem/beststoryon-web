import {
  GetChapterByIndexPayload,
  GetChapterByIndexResponse,
  GetChapterDetailPayload,
  GetChapterDetailResponse,
} from "@/models/chapter";
import axiosClient from "./axios-client";
export const chapterApi = {
  getById(payload: GetChapterDetailPayload) {
    return axiosClient
      .post<GetChapterDetailResponse>("/chapter/getById", payload)
      .then((response) => response.data);
  },
  getByIndex(payload: GetChapterByIndexPayload) {
    return axiosClient
      .post<GetChapterByIndexResponse>("/chapter/getQuickByIndex", payload)
      .then((response) => response.data);
  },
};
