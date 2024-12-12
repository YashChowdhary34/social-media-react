import { useCallback, useContext, useEffect } from "react";
import Post from "./Post.jsx";
import { PostList as PostListData } from "../store/post-list-store.jsx";
import Loading from "./Loading.jsx";

const PostList = () => {
  const { fetching, postList } = useContext(PostListData);

  return (
    <>
      {fetching || postList.length === 0 ? (
        <Loading />
      ) : (
        postList.map((post) => {
          return <Post key={post.id} post={post}></Post>;
        })
      )}
    </>
  );
};

export default PostList;
