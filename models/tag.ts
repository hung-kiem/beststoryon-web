export interface Tag {
  storyTagId: number;
  storyTagCode: string;
  storyTagName: string;
}

export interface TagListResponse {
  data: Tag[];
}
