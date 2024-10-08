export interface GetStoryByCategoryPayload {
  catCode: string;
  status: string; // all / completed / on_going
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
}
