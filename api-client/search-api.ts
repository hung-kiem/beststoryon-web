import { SearchPayload, SearchResponse } from "@/models";
import axiosClient from "./axios-client";

export const searchApi = {
  search(payload: SearchPayload): Promise<SearchResponse> {
    return axiosClient
      .post<SearchResponse>("/search", payload)
      .then((response) => response.data);
  },
};
