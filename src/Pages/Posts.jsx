import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import PostList from "../Components/PostList";

function Posts(){
    const[posts, setPosts] = useState([]);
    const[errorSavingUser, setErrorSavingUser] = useState(false);

    useEffect(() => {
        PostService.getPosts()
        .then( data => {
            console.log("PULAAAAAAA =>", data.posts);
            setPosts(data.posts);
        })
        .catch(error => {
            console.error("Error fetching post details", error)
        })
    }, []);

    return (
        <div>
            <PostList posts={posts} />
        </div>
    )
}

export default Posts;