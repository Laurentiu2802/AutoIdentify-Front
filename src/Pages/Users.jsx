import React, { useEffect, useState } from "react";
import UserList from "../Components/UsersList";
import UserService from "../Services/UserService";
import CreatePost from "../Components/CreatePost";

function Users(){
    const[users, setUsers] = useState([]);
    const[errorSavingUser, setErrorSavingUser] = useState(false);

    useEffect(() => {
        UserService.getAllUsers()
        .then(data => setUsers(data.users))
    }, []);

    return (
        <div>
            <UserList users={users} />
            <CreatePost></CreatePost>
        </div>
    )
}

export default Users;