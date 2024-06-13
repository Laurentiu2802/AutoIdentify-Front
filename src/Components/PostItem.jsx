import React from "react";

function PostItem(props){
    return(
        <li>
            <p> Post ID: {props.post.postID}</p>
            <p> Description: {props.post.description}</p>
            <p> Brand: {props.post.carBrand.brandName}</p>
            <p> Model: {props.post.carModel.modelName}</p>
            <p> Category: {props.post.category.categoryName}</p>
            <p> User: {props.post.user.username}</p>
        </li>
    )
}

export default PostItem;