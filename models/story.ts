export interface GetStoryByCategoryPayload {
  catCode: string;
  storyStatus: string; // all / completed / on_going
  sortCondition: string; // popular / new / update
  pageIndex: number;
  pageSize: number;
}

export interface GetStoryByCategoryResponse {
  data: Story[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface Story {
  storyId: string;
  storyName: string;
  storySummary: string;
  storyAuthor: string;
  chapterNumber: number;
  status: string;
  storyStatus: string;
  urlAvatar: string;
  urlOriginCrawl: string;
  createdDate: string;
  createdBy: string;
  modifiedDate: string;
  modifiedBy: string;
  tagCodeRef: string;
  catCodeRef: string;
  urlCode: string;
  viewNumber: number;
  published: string;
  publishedDate: string;
  metaTitle: string;
  metaDescription: string;
  metaKeyword: string;
  displayOrder: number;
  likeCount: number;
  isHot: string;
  isTopFocus: string;
  storyNameAlias: string | null;
  ratingStar: number;
}

export interface GetStoryDetailPayload {
  storyId: string;
  pageIndex: number;
  pageSize: number;
}

export interface GetStoryDetailResponse {
  story: StoryDetail;
  data: Chapter[];
  totalRecord: number;
  totalPage: number;
  pageIndex: number;
  pageSize: number;
}

export interface StoryDetail {
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
  storyNameAlias: string | null;
  viewNumberLabel: string;
}

export interface Chapter {
  chapterId: number;
  storyName: string;
  content: string | null;
  chapterName: string;
  createdDateLabel: string;
  createdDate: string;
  chapterIndex: number;
}

export interface GetStoryListReferPayload {
  storyId: string;
}

export interface GetStoryListReferResponse {
  data: StoryDetail[];
}

export interface RatingPayload {
  storyId: string;
  ratingNumber: number;
}

export interface GetStoryByAuthorPayload {
  authorCode: string;
  pageIndex: number;
  pageSize: number;
}
