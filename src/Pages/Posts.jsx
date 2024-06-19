import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import PostList from "../Components/PostList";
import Navbar from "../Components/Navbar";
import styles from "./posts.module.css";


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
        <div className={styles.page}>
            <Navbar/>
            <PostList posts={posts} />
        </div>
    )
}

export default Posts;