import { createContext, useReducer, useEffect, useState } from "react";

export const PostList = createContext({
  postList: [],
  addPost: () => {},
  deletePost: () => {},
});

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "INITIAL_POSTS") {
    newPostList = action.payload;
  } else if (action.type === "CREATE_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const DUMMY_POSTS = [
  {
    id: 1,
    title: "His mother had always taught him",
    body: "His mother had always taught him not to ever think of himself as better than others. He'd tried to live by this motto. He never looked down on those who were less fortunate or who had less money than him. But the stupidity of the group of people he was talking to made him change his mind.",
    tags: ["history", "american", "crime"],
    reactions: {
      likes: 192,
      dislikes: 25,
    },
  },
];
const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(postListReducer, DUMMY_POSTS);

  //postList update methods
  const addPost = (post) => {
    const newAction = {
      type: "CREATE_POST",
      payload: {
        post,
      },
    };
    dispatchPostList(newAction);
  };

  const deletePost = (postId) => {
    const newAction = {
      type: "DELETE_POST",
      payload: {
        postId,
      },
    };
    dispatchPostList(newAction);
  };

  return (
    <PostList.Provider
      value={{
        postList,
        addPost,
        deletePost,
      }}
    >
      {children}
    </PostList.Provider>
  );
};

export default PostListProvider;
