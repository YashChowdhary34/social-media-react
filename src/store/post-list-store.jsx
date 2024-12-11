import { createContext, useReducer } from "react";

export const PostList = createContext(null);

const postListReducer = (currPostList, action) => {
  let newPostList = currPostList;
  if (action.type === "DELETE_POST") {
    newPostList = currPostList.filter(
      (post) => post.id !== action.payload.postId
    );
  } else if (action.type === "CREATE_POST") {
    newPostList = [action.payload, ...currPostList];
  }
  return newPostList;
};

const DEFAULT_POST_LIST = [
  {
    id: "1",
    title: "Going to Mumbai",
    body: "Hi Friends, I am going to Mumbai for my vacations.",
    reactions: 2,
    userId: "user-9",
    tags: ["vacation", "mumbai", "enjoying"],
  },
  {
    id: "2",
    title: "Going to Delhi",
    body: "Hi Friends, I am going to Delhi for my vacations.",
    reactions: 6,
    userId: "user-3",
    tags: ["vacation", "delhi", "enjoying"],
  },
];

const PostListProvider = ({ children }) => {
  const [postList, dispatchPostList] = useReducer(
    postListReducer,
    DEFAULT_POST_LIST
  );
  const addPost = (userId, postTitle, postBody, reaction, tags) => {
    const newAction = {
      type: "CREATE_POST",
      payload: {
        id: `${Date.now()}`,
        title: postTitle,
        body: postBody,
        reactions: parseInt(reaction, 10),
        userId: userId,
        tags: tags,
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
