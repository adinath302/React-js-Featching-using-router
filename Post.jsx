import React from "react";
import { useContext } from "react";
import { MdDelete } from "react-icons/md";
import { PostList } from "../store/Post-List-store";

const Post = ({ post }) => {
  const { deletepost } = useContext(PostList);

  // Ensure post and post.reactions exist before accessing their properties
  const likes = post.reactions ? post.reactions.likes : 0;
  const dislikes = post.reactions ? post.reactions.dislikes : 0;

  return (
    <div className="card post-card" style={{ width: "30rem" }}>
      <div className="card-body">
        <h5 className="card-title">
          {post.title}
          <span
            className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger delete"
            onClick={() => deletepost(post.id)}
          >
            <MdDelete />
          </span>
        </h5>
        <p className="card-text">{post.body}</p>

        {post.tags && post.tags.map((tag, i) => (
          <span className="badge text-bg-primary hashtag" key={i}>
            {tag}
          </span>
        ))}
        
        <div className="alert alert-success reactions" role="alert">
          This post has received {likes} likes and {dislikes} dislikes.
        </div>
      </div>
    </div>
  );
};

export default Post;
