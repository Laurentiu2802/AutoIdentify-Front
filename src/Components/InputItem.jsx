import React, { useState } from "react";
import styles from "./inputItem.module.css";

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
        <div className={styles.signup_box}>

          <h2 className={styles.title}>Sign up</h2>

          <form  onSubmit={handleSubmit} className={styles.signin_form}>
            <div className={styles.input_box}>
              <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  data-testid="username"
                  placeholder="Enter your username"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                />
            </div>
            <div className={styles.input_box}>
              <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  data-testid="password"
                  placeholder="Enter your password"
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                />
            </div>
            <div className={styles.input_box}>
              <label htmlFor="description">Description</label>
                <input
                  type="text"
                  id="description"
                  data-testid="description"
                  placeholder="Enter your description"
                  name="description"
                  value={user.description}
                  onChange={handleInputChange}
                />
            </div>


            {/* <input
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
            /> */}
            <a className = {styles.login_link} href="/Login"> Log in here!</a>
            <button type="submit" className={styles.signin_button}>
                Submit
            </button>
          </form>
        </div>
        
  );
}

export default InputItem;