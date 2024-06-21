import React from "react";
import UserService from "../Services/UserService";
import InputItem from "../Components/InputItem";

function SignUp(){
    const addUser = (user) => {
        UserService.createUser(user)
        .then(data => {
            console.log(`User created: `, data);
            alert('User created'); 
        })
        .catch(response => {
            const data = response.response.data;
            alert('An error occurred'); 
        })
        .finally(() => {
            console.log('User created');
        });
    };

    return(
        <div className="container">
            <div className="inner">
                <InputItem addUser={addUser} />
            </div>
        </div>
    );
}

export default SignUp;
