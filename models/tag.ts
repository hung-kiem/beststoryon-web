export interface Tag {
  storyTagId: number;
  storyTagCode: string;
  storyTagName: string;
}

export interface TagListResponse {
  data: Tag[];
}

export interface GetStoryByTagCodePayload {
  keyword: string;
  status: string; // all / completed / onGoing
  sortCondition: string; // popular / new / update
  pageIndex: number;
  pageSize: number;
}
