import { useContext } from "react";
import Post from "./Post.jsx";
import { PostList as PostListData } from "../store/post-list-store.jsx";
import Loading from "./Loading.jsx";
import { useLoaderData } from "react-router-dom";

const PostList = () => {
  const { postList } = useContext(PostListData);
  const postListLoader = useLoaderData();
  return (
    <>
      {postList.length === 0 && postListLoader.length === 0 ? (
        <Loading />
      ) : (
        postList.map((post) => {
          return <Post key={post.id} post={post}></Post>;
        })
      )}
      {postListLoader.map((post) => {
        return <Post key={post.id} post={post}></Post>;
      })}
    </>
  );
};

export const postLoader = () => {
  return fetch("https://dummyjson.com/posts")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to fetch posts.");
      return res.json();
    })
    .then((data) => {
      return data.posts;
    })
    .catch((error) => console.error("Error loading posts:", error));
};

export default PostList;
