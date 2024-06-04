import UserService from "../Services/UserService";
import LogInItem from "../Components/LogInItem";
import { useState } from "react";

function LogIn(){
    const[errorSavingUser, setErrorSavingUser] = useState(false)
    const addUser = (user) => {
        setErrorSavingUser(false);

        UserService.logIn(user)
        .then(data => {
            console.log('User created: ', response.response.data)
        })
        .catch(response => {
            const data = response.response.data;
            setErrorSavingUser(true);
        })
        .finally(() => {
            if(!errorSavingUser){
            }
            console.log("Log In Succesfull!")
        })
    };
    return(
        <div>
            <div>
                <LogInItem addUser={addUser} /> {}
            </div>    
        </div>
    )
}

export default LogIn;