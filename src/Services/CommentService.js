import axios from "axios";

const hostname = 'http://localhost:8080';

const createComment = async (commentData) => {
    try {
        const response = await axios.post(`${hostname}/comments`, commentData);
        return response.data; // Assuming the backend returns the created comment details
    } catch (error) {
        console.error("Error creating comment:", error);
        throw error;
    }
};

function getCommentsByPostID(postID) {
    return axios.get(`${hostname}/comments`, {
        params: {
            postID: postID
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.error("Error fetching comments:", error);
        throw error;
    });
}

export default {
    createComment,
    getCommentsByPostID
};