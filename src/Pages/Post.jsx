import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../Services/PostService";
import CommentService from "../Services/CommentService";
import TokenManager from "../Services/TokenManager"; // Assuming TokenManager.js is in this path
import styles from "./post.module.css";
import Navbar from "../Components/Navbar";
import user from '../assets/images/user.png'


function Post() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [loadingComments, setLoadingComments] = useState(false); // State to manage loading indicator
    const [description, setDescription] = useState("");
    const [errorSavingComment, setErrorSavingComment] = useState(false);

    useEffect(() => {
        const fetchPostAndComments = async () => {
            try {
                setLoadingComments(true); // Set loading indicator
                const [postResponse, commentsResponse] = await Promise.all([
                    PostService.getPostById(id),
                    CommentService.getCommentsByPostID(id)
                ]);
                setPost(postResponse); // Set the post state
                setComments(commentsResponse.comments || []); // Set comments state, default to empty array if commentsResponse is falsy
            } catch (error) {
                console.error("Error fetching post and comments:", error);
            } finally {
                setLoadingComments(false); // Clear loading indicator
            }
        };

        fetchPostAndComments();
    }, [id]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
    
        const userClaims = TokenManager.getClaims();
        const userID = userClaims ? userClaims.studentId : null;
        const username = TokenManager.getUsername();
    
        const commentItem = {
            postID: post.postID,
            description: description,
            userID: userID,
            username: username
        };
    
        try {
            const response = await CommentService.createComment(commentItem);
            console.log("Newly added comment:", response); // Log the newly added comment
            // Update comments state to include the new comment at the end
            setComments(prevComments => [...prevComments, response]);
            setDescription(""); // Clear comment textarea
            setErrorSavingComment(false); // Clear error state
        } catch (error) {
            setErrorSavingComment(true); // Set error state for display
            console.error("Error creating comment:", error);
        }
    };

    if (!post) {
        return <p>Loading post...</p>;
    }

    return (
        <div className={styles.page}>
            <Navbar/>

            <div className={styles.post_details}>

                <div className={styles.post}>
                    <div className={styles.post_header}>
                        <img src={user} alt='Logo' className={styles['user_photo']}/>

                        <div className={styles.name}>
                            <p>{post.user.username}</p>
                            <div className={styles.brand_model}>
                                <p>{post.carBrand.brandName}</p>
                                <p>{post.carModel.modelName}</p>
                            </div>
                        </div>
                        <div className={styles.category}>
                            <p>{post.category.categoryName}</p>
                        </div>
                        
                    </div>

                    <div className={styles.post_content}>
                        <p>{post.description}</p>
                    </div>

                    
                    {/* <p>Likes: {post.likes}</p> */}
                </div>


                <div className={styles.comment_section}>

                    <div className={styles.comments}>
                        {loadingComments ? (
                        <p>Loading comments...</p>
                        ) : comments.length > 0 ? (
                            <div>
                                <h3>Comments</h3>
                                <ul>
                                    {comments.map(comment => (
                                        <li key={comment.commentID}>
                                            {/* Display the username from comment.user or directly from comment */}
                                            <p>User: {comment.user ? comment.user.username : comment.username}</p>
                                            <p>Description: {comment.description}</p>
                                        </li>
                                    ))}
                                </ul>
                            </div>//dsada
                        ) : (
                            <p>No comments yet.</p>
                        )}
                    </div>

                    <form onSubmit={handleCommentSubmit} className={styles.comment_form}>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className={styles.comment_input}
                            placeholder="Enter your comment..."
                            required
                        />
                        <button type="submit" className={styles.comment_button}>Add Comment</button>
                        {errorSavingComment && <p>Error saving comment. Please try again.</p>}
                    </form>
                    

                </div>
            </div>
            
        </div>
    );
}

export default Post;