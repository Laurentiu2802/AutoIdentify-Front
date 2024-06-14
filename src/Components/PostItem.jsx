import React, {useState, useEffect} from "react";
import LikeService from "../Services/LikeService";
import TokenManager from "../Services/TokenManager";

function PostItem(props) {
    const [isLiked, setIsLiked] = useState(false);
    const claims = TokenManager.getClaims();
  
    useEffect(() => {
      LikeService.hasUserLikedPost(claims.studentId, props.post.postID)
        .then(response => setIsLiked(response.liked))
        .catch(error => console.error('Error checking if liked:', error));
    }, []);
  
    const handleLike = async () => {
      try {
        if (isLiked) {
          await LikeService.unlikePost(claims.studentId, props.post.postID);
          props.post.likes -= 1;
        } else {
          await LikeService.likePost(claims.studentId, props.post.postID);
          props.post.likes += 1;
        }
        setIsLiked(prevIsLiked => !prevIsLiked);
      } catch (error) {
        console.error('Error interacting with the like functionality:', error);
      }
    };
    return(
        <li>
            <p> Post ID: {props.post.postID}</p>
            <p> Description: {props.post.description}</p>
            <p> Brand: {props.post.carBrand.brandName}</p>
            <p> Model: {props.post.carModel.modelName}</p>
            <p> Category: {props.post.category.categoryName}</p>
            <p> User: {props.post.user.username}</p>
            <div>
          <p>Likes: {props.post.likes}</p>
          <button onClick={handleLike}>{isLiked ? "Unlike" : "Like"}</button>
        </div>
        </li>
    )
}

export default PostItem;