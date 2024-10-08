import { Category } from "@/models";
import axiosClient from "./axios-client";
import {
  GetStoryByCategoryPayload,
  GetStoryByCategoryResponse,
} from "@/models/story";

export const storyApi = {
  getListByCatId(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/story/getListByCatId", payload)
      .then((response) => response.data);
  },
};
