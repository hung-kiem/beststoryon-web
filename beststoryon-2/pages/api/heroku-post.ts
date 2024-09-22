import axios from "axios";

export async function loadPosts() {
  try {
    const response = await axios.get(
      "https://js-post-api.herokuapp.com/api/posts"
    );
    return response;
  } catch (error) {
    console.error("Error loading posts:", error);
    throw error;
  }
}

export async function loadPostDetail(postId: string) {
  try {
    const response = await axios.get(
      `https://js-post-api.herokuapp.com/api/posts/${postId}`
    );
    return response.data;
  } catch (error) {
    console.error("Error loading post detail:", error);
    throw error;
  }
}
