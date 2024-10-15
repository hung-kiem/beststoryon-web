import { BaseResponse } from "./common";
import { StoryDetail } from "./story";

export interface SearchPayload {
  keyword: string;
  status: string;
  sortCondition: string;
  pageIndex: number;
  pageSize: number;
}

export interface SearchResponse extends BaseResponse {
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
  data: StoryDetail[];
}
