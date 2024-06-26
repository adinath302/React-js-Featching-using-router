import { useContext, useRef } from "react";
import { PostList } from "../store/Post-List-store";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const { addpost } = useContext(PostList);
  const navigate = useNavigate();

  const useridElement = useRef();
  const titleElement = useRef();
  const bodyElement = useRef();
  const likesElement = useRef();
  const dislikesElement = useRef();
  const tagsElement = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const userid = useridElement.current.value.trim();
    const title = titleElement.current.value.trim();
    const body = bodyElement.current.value.trim();
    const likes = parseInt(likesElement.current.value.trim(), 10) || 0;
    const dislikes = parseInt(dislikesElement.current.value.trim(), 10) || 0;
    const tags = tagsElement.current.value.split(" ").map(tag => tag.trim()).filter(tag => tag);

    if (!userid || !title || !body) {
      alert("Please fill in all required fields.");
      return;
    }

    useridElement.current.value = "";
    titleElement.current.value = "";
    bodyElement.current.value = "";
    likesElement.current.value = "";
    dislikesElement.current.value = "";
    tagsElement.current.value = "";

    fetch("https://dummyjson.com/posts/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: userid,
        title: title,
        body: body,
        reactions: {
          likes: likes,
          dislikes: dislikes,
        },
        tags: tags,
      }),
    })
      .then((res) => res.json())
      .then((post) => {
        if (post.id) {
          addpost(post);
          navigate("/");
        } else {
          alert("Failed to create post. Please try again.");
        }
      })
      .catch((error) => {
        console.error("Error creating post:", error);
        alert("An error occurred while creating the post. Please try again.");
      });
  };

  return (
    <form className="create-post" onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="userId" className="form-label">Enter your User id here</label>
        <input ref={useridElement} type="text" className="form-control" id="userId" placeholder="Your User id ..." required />
      </div>

      <div className="mb-3">
        <label htmlFor="title" className="form-label">Post Title</label>
        <input ref={titleElement} type="text" className="form-control" id="title" placeholder="How are you feeling today ..." required />
      </div>

      <div className="mb-3">
        <label htmlFor="body" className="form-label">Post Content</label>
        <textarea ref={bodyElement} rows={4} className="form-control" id="body" placeholder="Tell us more about it ..." required></textarea>
      </div>

      <div className="mb-3">
        <label htmlFor="likes" className="form-label">Number of likes</label>
        <input ref={likesElement} type="number" className="form-control" id="likes" placeholder="How many people liked this post" />
      </div>

      <div className="mb-3">
        <label htmlFor="dislikes" className="form-label">Number of dislikes</label>
        <input ref={dislikesElement} type="number" className="form-control" id="dislikes" placeholder="How many people disliked this post" />
      </div>

      <div className="mb-3">
        <label htmlFor="tags" className="form-label">Enter your hashtags here</label>
        <input ref={tagsElement} type="text" className="form-control" id="tags" placeholder="Please enter tags using space" />
      </div>

      <button type="submit" className="btn btn-primary">Post</button>
    </form>
  );
};

export default CreatePost;