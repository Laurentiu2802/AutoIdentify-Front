import axios from 'axios';

const hostname = 'http://localhost:8080'

const LikeService = {
    likePost: async (userID, postID) => {
      try {
        const response = await axios.post(`${hostname}/likes/like`, { userID, postID });
        return response.data;
      } catch (error) {
        console.error('Error liking post:', error);
        throw error;
      }
    },

    unlikePost: async (userID, postID) => {
      try {
        const response = await axios.post(`${hostname}/likes/unlike`, { userID, postID });
        return response.data;
      } catch (error) {
        console.error('Error unliking post:', error);
        throw error;
      }
    },

    hasUserLikedPost: async (userID, postID) => {
        try {
          console.log('Making request to check if liked:', { userID, postID });

          const response = await axios.get(`${hostname}/likes/hasLiked`, {
            params: { userID, postID }
          });

          console.log('Response received:', response.data);

          return response.data;
        } catch (error) {
          console.error('Error checking if liked:', error);
          throw error;
        }
      }
  };

  export default LikeService;