import React, {useState, useEffect} from "react";
import LikeService from "../Services/LikeService";
import TokenManager from "../Services/TokenManager";
import { Link } from "react-router-dom";
import styles from "./postItem.module.css";
import user from '../assets/images/user.png'
import likeImage from '../assets/images/like.png';
import unlikeImage from '../assets/images/unlike.png';



function PostItem(props) {
    const [isLiked, setIsLiked] = useState(false);
    const claims = TokenManager.getClaims();
  
    useEffect(() => {
      LikeService.hasUserLikedPost(claims.studentId, props.post.postID)
        .then(response => setIsLiked(response.liked))
        .catch(error => console.error('Error checking if liked:', error));
    }, [claims.studentId, props.post.postID]);
  
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
        <li className={styles.post}>
          <Link to={`/Post/${props.post.postID}`} className={styles.linkWrapper}>
          <div className={styles.post_top}>

            <div className={styles.post_top_left}>
              <img src={user} alt='Logo' className={styles['user_photo']}/>

              <div className={styles.username}>

                <p>{props.post.user.username}</p>

                <div className={styles.username_bot}>
                  <p>{props.post.carBrand.brandName}</p>
                  <p>{props.post.carModel.modelName}</p>                  
                </div>

              </div>

            </div>

            <div className={styles.post_top_right}>
              <p>{props.post.category.categoryName}</p>
            </div>

          </div>

          <div className={styles.post_mid}>
            <p>{props.post.description}</p>
          </div>
          </Link>
          <div className={styles.post_bot}>
            
            <p>{props.post.likes}</p>
            <img
                      src={isLiked ? unlikeImage : likeImage}
                      alt={isLiked ? "Unlike" : "Like"}
                      onClick={handleLike}
                      className={styles.likeButton}
                      style={{ cursor: 'pointer' }}
                  />
          
        </div>
        </li>
        
    )
}

export default PostItem;