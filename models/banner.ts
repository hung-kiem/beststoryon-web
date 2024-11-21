import { BaseResponse } from "./common";

export interface Banner {
  bannerId: number;
  bannerName: string;
  bannerType: string;
  bannerDesc: string;
  bannerPos: string;
  bannerOfPage: string;
  bannerUrl: string;
  bannerLinkTo: string;
  bannerOpenType: string;
  bannerHTML: string;
}

export interface GetBannerListRequest {
  requestId: string;
  bannerOfPage: string;
}

export interface GetBannerListResponse extends BaseResponse {
  data: Banner[];
}
