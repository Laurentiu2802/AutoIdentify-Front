import React, { useState, useEffect } from "react";
import PostItem from "./PostItem";
import SearchPosts from "./SearchPosts";
import PostService from "../Services/PostService";
import styles from "./postList.module.css";
import CreatePost from "../Components/CreatePost";

function PostList() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch all posts when the component mounts
        fetchPosts();
    }, []);

    const fetchPosts = async (categoryID = '', carBrandID = '', carModelID = '') => {
        setLoading(true);
        try {
            const response = await PostService.getPostsByCriteria(null, categoryID, carBrandID, carModelID);
            setPosts(response.posts || []);
        } catch (error) {
            console.error("Error fetching posts:", error);
            setPosts([]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.left_to_right}>
            <div className={styles.left}>
                <SearchPosts onSearch={fetchPosts} />
            </div>
            <div className={styles.mid}>
                <CreatePost/>
                <ul className={styles.list}>
                    {loading && <p>Loading...</p>}
                    {!loading && posts.length === 0 && <p>No posts found.</p>}
                    {posts.map(post => (
                        <PostItem key={post.postID} post={post} />
                    ))}
                </ul>
            </div>
            <div className={styles.right}></div>
        </div>
    );
}

export default PostList;
