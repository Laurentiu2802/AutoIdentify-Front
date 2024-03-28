import React from "react";

function UserItem(props){
    return(
        <li>
            <p> User ID: {props.user.userID}</p>
            <p> Username: {props.user.username}</p>
            <p> Password: {props.user.password}</p>
            <p> User description: {props.user.description}</p>
        </li>
    )
}

export default UserItem;