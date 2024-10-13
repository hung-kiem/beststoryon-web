import { Banner } from "./banner";

export interface GetHotTopListRequest {
  requestId: string;
}

export interface GetHotTopListResponse {
  data: StoryHome[];
}

export interface GetTrendingListResponse {
  data: StoryHome[];
}

export interface GetNewReleaseListResponse {
  data: StoryHome[];
}

export interface GetHotListResponse {
  data: StoryHome[];
}

export interface GetBannerListResponse {
  data: Banner[];
}

export interface StoryHome {
  storyId: string;
  storyName: string;
  status: string;
  chapterNumber: number;
  displayOrder: number;
  urlAvatar: string;
  lastAddNewChapterLabel: string;
  lastAddNewChapter: string;
  summaryContent: string;
  author: string;
  catList: string[];
  tagList: string[];
}
