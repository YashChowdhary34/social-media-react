import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import CreatePost, { createPostActon } from "./components/CreatePost.jsx";
import PostList from "./components/PostList.jsx";
import { postLoader } from "./components/PostList.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/create-post",
        element: <CreatePost />,
        action: createPostActon,
      },
      { path: "/post-list", element: <PostList />, loader: postLoader },
      { path: "/", element: <PostList />, loader: postLoader },
    ],
  },
  { path: "/create-post", element: <CreatePost /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
