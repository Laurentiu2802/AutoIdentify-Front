import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../Services/PostService";
import CommentService from "../Services/CommentService";
import TokenManager from "../Services/TokenManager"; // Assuming TokenManager.js is in this path

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
        <div>
            <h2>Post Details</h2>
            <p>Post ID: {post.postID}</p>
            <p>Description: {post.description}</p>
            <p>Brand: {post.carBrand.brandName}</p>
            <p>Model: {post.carModel.modelName}</p>
            <p>Category: {post.category.categoryName}</p>
            <p>User: {post.user.username}</p>
            <p>Likes: {post.likes}</p>

            {/* Display comments if available */}
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

            {/* Comment submission form */}
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter your comment..."
                    required
                />
                <button type="submit">Add Comment</button>
                {errorSavingComment && <p>Error saving comment. Please try again.</p>}
            </form>
        </div>
    );
}

export default Post;