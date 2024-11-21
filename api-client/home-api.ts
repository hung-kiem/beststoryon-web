import {
  GetHotListResponse,
  GetHotTopListRequest,
  GetHotTopListResponse,
  GetNewReleaseListResponse,
  GetTrendingListResponse,
} from "@/models/home";
import axiosClient from "./axios-client";
import { GetBannerListRequest, GetBannerListResponse } from "@/models/banner";

export const homeApi = {
  getHotTopList(
    requestData: GetHotTopListRequest
  ): Promise<GetHotTopListResponse> {
    return axiosClient
      .post<GetHotTopListResponse>("/home/getHotTopList", {
        params: requestData,
      })
      .then((response) => response.data);
  },
  getTrendingList(
    requestData: GetHotTopListRequest
  ): Promise<GetTrendingListResponse> {
    return axiosClient
      .post<GetTrendingListResponse>("/home/getTrendingList", {
        params: requestData,
      })
      .then((response) => response.data);
  },
  getBannerList(payload: GetBannerListRequest): Promise<GetBannerListResponse> {
    return axiosClient
      .post<GetBannerListResponse>("/home/getBannerList", payload)
      .then((response) => response.data);
  },
  getNewReleaseList(
    requestData: GetHotTopListRequest
  ): Promise<GetNewReleaseListResponse> {
    return axiosClient
      .post<GetNewReleaseListResponse>("/home/getNewReleaseList", {
        params: requestData,
      })
      .then((response) => response.data);
  },
  getHotList(requestData: GetHotTopListRequest): Promise<GetHotListResponse> {
    return axiosClient
      .post<GetHotListResponse>("/home/getHotList", {
        params: requestData,
      })
      .then((response) => response.data);
  },
};
