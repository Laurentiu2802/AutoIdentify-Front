import React from "react";
import PostItem from "./PostItem";

function PostList(props) {
    return(
        <ul>
            {props.posts.map(post => (
                <PostItem key={post.postID} post={post} />
            ))}
        </ul>
    )
}

export default PostList;