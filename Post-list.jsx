import React, { useContext, useEffect } from "react";
import { PostList as PostListData } from "../store/Post-List-store";
import WelcomeMessage from "./WelcomeMessage";
import Post from "./Post";
import LoadingSpinner from "./Loading-Spinner";

const PostList = () => {
  const { postlist, addinitialposts } = useContext(PostListData);

  useEffect(() => {
    // Fetch initial posts when component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        const data = await response.json();
        addinitialposts(data.posts); // Assuming data.posts is an array of posts
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [addinitialposts]);

  return (
    <>
      {postlist.length === 0 && <WelcomeMessage />}
      {postlist.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </>
  );
};

// Post-list.jsx
export const postloader = () => {
  return fetch("https://dummyjson.com/posts")
    .then((res) => res.json())
    .then((data) => {
      const formattedPosts = data.posts.map((post) => ({
        ...post,
        reactions: {
          likes: post.reactions.likes || 0,
          dislikes: post.reactions.dislikes || 0,
        },
        tags: post.tags || [],
      }));
      return formattedPosts;
    });
};

// Other components and exports...

export default PostList;
