import React, { useState } from "react";

function InputItem({addUser}) {
    const [user, setUser] = useState({ 
    username:"",
    password:"",
    description:"",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if(user.username.trim() !== ""){
            addUser(user);
            setUser({
                username:"",
                password:"",
                description:"",
            });
        }        
    };

    const handleInputChange = (event) => {
        const{name, value} = event.target;
        setUser({...user, [name]: value });
    };

    return (
        <nav >
          <form  onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              value={user.username}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Password"
              name="password"
              value={user.password}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Description"
              name="description"
              value={user.description}
              onChange={handleInputChange}
            />
            <button type="submit">
                Submit
            </button>
            </form>
            </nav>)

}

export default InputItem;