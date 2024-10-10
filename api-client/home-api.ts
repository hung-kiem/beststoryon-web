import {
  GetBannerListResponse,
  GetHotTopListRequest,
  GetHotTopListResponse,
  GetTrendingListResponse,
} from "@/models/home";
import axiosClient from "./axios-client";

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
  getTrendingList(): Promise<GetTrendingListResponse> {
    return axiosClient
      .get<GetTrendingListResponse>("/home/getTrendingList")
      .then((response) => response.data);
  },
  getBannerList(): Promise<GetBannerListResponse> {
    return axiosClient
      .get<GetBannerListResponse>("/home/getBannerList")
      .then((response) => response.data);
  },
};
