import { Banner } from "./banner";
import { Story } from "./story";

export interface GetHotTopListRequest {}

export interface GetHotTopListResponse {
  data: StoryHome[];
}

export interface GetTrendingListResponse {
  data: Story[];
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
