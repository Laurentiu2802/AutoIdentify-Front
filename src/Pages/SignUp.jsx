import React from "react";
import UserService from "../Services/UserService";
import InputItem from "../Components/InputItem";

function SignUp(){
    const addUser = (user) => {

        UserService.createUser(user)
        .then(data => {
            console.log(`User created: `, data);
        })
        .catch(response => {
            const data = response.response.data;
            if(data.errors.find(error => error.error === 'USER_DUPLICATE')){
            }
        })
        .finally(() => {
            console.log('User created');
        });
    };

    return(
        <div className="container">
            <div className="inner">
                <InputItem addUser={addUser} /> {}
            </div>
        </div>
    );
}

export default SignUp;
