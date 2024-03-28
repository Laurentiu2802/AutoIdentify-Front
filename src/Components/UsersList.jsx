import React from "react";
import UserItem from "./UserItem";

function UsersList(props) {
    return(
        <ul>
            {props.users.map(user => (
                <UserItem key={user.userID} user={user} />
            ))}
        </ul>
    )
}

export default UsersList;