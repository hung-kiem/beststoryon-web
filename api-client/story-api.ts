import axiosClient from "./axios-client";
import {
  GetStoryByCategoryPayload,
  GetStoryByCategoryResponse,
  GetStoryDetailPayload,
  GetStoryDetailResponse,
  GetStoryListReferPayload,
  GetStoryListReferResponse,
} from "@/models/story";

export const storyApi = {
  getListByCatId(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/story/getListByCatId", payload)
      .then((response) => response.data);
  },
  getDetail(payload: GetStoryDetailPayload): Promise<GetStoryDetailResponse> {
    return axiosClient
      .post<GetStoryDetailResponse>("/story/getDetail", payload)
      .then((response) => response.data);
  },
  getListRefer(
    payload: GetStoryListReferPayload
  ): Promise<GetStoryListReferResponse> {
    return axiosClient
      .post<GetStoryListReferResponse>("/story/getListRefer", payload)
      .then((response) => response.data);
  },
  getNewReleaseList(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/story/getNewReleaseList", payload)
      .then((response) => response.data);
  },
  getTrendingList(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/story/getTrendingList", payload)
      .then((response) => response.data);
  },
  getHotList(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/story/getHotList", payload)
      .then((response) => response.data);
  },
};
