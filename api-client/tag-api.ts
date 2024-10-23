import { GetStoryByCategoryResponse } from "@/models/story";
import axiosClient from "./axios-client";
import { GetStoryByTagCodePayload, Tag, TagListResponse } from "@/models/tag";

export const tagApi = {
  getTagByFirstLetter(firstLetter: string): Promise<TagListResponse> {
    return axiosClient
      .get<TagListResponse>(`/tag/getTagByFirstLetter`, {
        params: { firstLetter },
      })
      .then((response) => response.data);
  },
  getStoryByTagCode(
    payload: GetStoryByTagCodePayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/tag/getStoryByTag", payload)
      .then((response) => response.data);
  },
};
