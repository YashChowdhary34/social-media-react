import { createContext, useReducer, useEffect, useState } from "react";

export const PostList = createContext({
  fetching: false,
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
  const [fetching, setFetching] = useState(false);

  //fetching initial data from server
  useEffect(() => {
    setFetching(true);
    fetch("https://dummyjson.com/posts")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch posts.");
        return res.json();
      })
      .then((data) => {
        dispatchPostList({ type: "INITIAL_POSTS", payload: data.posts });
        setFetching(false);
      })
      .catch((error) => console.error("Error loading posts:", error));
  }, []);

  //postList update methods
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
        fetching,
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
