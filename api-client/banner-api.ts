import { GetBannerListRequest, GetBannerListResponse } from "@/models/banner";
import axiosClient from "./axios-client";

export const bannerApi = {
  getBannerList(payload: GetBannerListRequest): Promise<GetBannerListResponse> {
    return axiosClient
      .post<GetBannerListResponse>("/home/getBannerList", payload)
      .then((response) => response.data);
  },
};
