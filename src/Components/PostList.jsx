import React from "react";
import PostItem from "./PostItem";
import styles from "./postList.module.css";


function PostList(props) {
    return(
        <div className={styles.left_to_right}>
            <div className={styles.left}>

            </div>
            <div className={styles.mid}>
                <ul className={styles.list}>
                    {props.posts.map(post => (
                        <PostItem key={post.postID} post={post} />
                    ))}
                </ul>
            </div>
            <div className={styles.right}>
                
            </div>
        </div>
    )
}

export default PostList;