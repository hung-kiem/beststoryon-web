export async function loadPosts() {
  const response = await fetch("http://localhost:3000/api/posts");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const data = await response.json();
  return data;
}

export async function loadPostDetail(id: string) {
  const res = await fetch(`https://js-post-api.herokuapp.com/api/posts/${id}`);
  const posts = await res.json();

  return posts;
}
