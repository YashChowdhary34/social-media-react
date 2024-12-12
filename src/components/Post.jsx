import { useContext } from "react";
import { AiFillDelete } from "react-icons/ai";
import { PostList } from "../store/post-list-store.jsx";

const Post = ({ post }) => {
  const { deletePost } = useContext(PostList);

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <form
            onSubmit={(event) => {
              event.preventDefault();
              deletePost(post.id);
            }}
          >
            <button className=" btn position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              <AiFillDelete />
            </button>
          </form>
        </h5>
        <p className="card-text">{post.body}</p>
        {Array.isArray(post.tags) ? (
          post.tags.map((tag) => (
            <span key={tag} className="badge text-bg-primary hashtag">
              {tag}
            </span>
          ))
        ) : (
          <span key={post.tag} className="badge text-bg-primary hashtag">
            {post.tag}
          </span>
        )}
        <div className="alert alert-success reactions" role="alert">
          This post has been reacted by{" "}
          {post.reactions.likes /*API throwing bad request */} people.
        </div>
      </div>
    </div>
  );
};

export default Post;
