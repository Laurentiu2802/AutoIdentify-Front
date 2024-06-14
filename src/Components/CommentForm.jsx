import React, { useState } from "react";
import CommentService from "../Services/CommentService";
import TokenManager from "../Services/TokenManager"; // Assuming TokenManager.js is in this path

function CommentForm({ postID, onCommentAdded }) {
    const [description, setDescription] = useState("");
    const [errorSavingComment, setErrorSavingComment] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();

        const userClaims = TokenManager.getClaims();
        const userID = userClaims ? userClaims.studentId : null;
        const username = TokenManager.getUsername();

        const commentItem = {
            postID: postID,
            description: description,
            userID: userID,
            username: username
        };

        try {
            const response = await CommentService.createComment(commentItem);
            onCommentAdded(response); // Notify parent component of new comment
            setDescription(""); // Clear comment textarea
        } catch (error) {
            setErrorSavingComment(true); // Set error state for display
            console.error("Error creating comment:", error);
        }
    };

    return (
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
    );
}

export default CommentForm;