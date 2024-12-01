export interface GetChapterDetailPayload {
  chapterId: string;
}

export interface GetChapterDetailResponse {
  data: Chapter;
}

export interface Chapter {
  chapterId: number;
  storyName: string;
  storyNameAlias: string;
  content: string | null;
  chapterName: string;
  createdDateLabel: string;
  createdDate: string;
  chapterIndex: number;
  storyId: number;
  previousIndex: number;
  nextIndex: number;
}

export interface GetChapterByIndexPayload {
  storyId: string;
  chapterIndex: number;
}

export interface GetChapterByIndexResponse {
  data: Chapter;
}
