import axiosClient from "./axios-client";
import {
  GetStoryByCategoryPayload,
  GetStoryByCategoryResponse,
  GetStoryDetailPayload,
  GetStoryDetailResponse,
  GetStoryListReferPayload,
  GetStoryListReferResponse,
  RatingPayload,
} from "@/models/story";

export const storyApi = {
  getListByCatId(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/category/getStoryByCatCode", payload)
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
  getUpdateList(
    payload: GetStoryByCategoryPayload
  ): Promise<GetStoryByCategoryResponse> {
    return axiosClient
      .post<GetStoryByCategoryResponse>("/updates", payload)
      .then((response) => response.data);
  },
  ratingStory(payload: RatingPayload): Promise<any> {
    return axiosClient
      .post<any>("/rating/voteStory", payload)
      .then((response) => response.data);
  },
};
