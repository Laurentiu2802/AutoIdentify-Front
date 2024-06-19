import React, { useState } from "react";
import styles from "./loginItem.module.css";


function LogInItem({ addUser }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.username.trim() !== "") {
      addUser(user);
      setUser({
        username: "",
        password: "",
      });
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  return (
      <div className={styles.login_box}>   
        <h2>Log in</h2>
          <form onSubmit={handleSubmit}>

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
            <a className = {styles.signup_link} href="/SignUp"> Create account.</a>
            
            <button type="submit">
              Submit
            </button>
            
          </form>
      </div>

  );
}

export default LogInItem;