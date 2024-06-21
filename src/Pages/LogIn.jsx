import UserService from "../Services/UserService";
import LogInItem from "../Components/LogInItem";
import { useState } from "react";
import styles from "./login.module.css";

function LogIn() {
  const [errorSavingUser, setErrorSavingUser] = useState(false);

  const addUser = (user) => {
    setErrorSavingUser(false);

    UserService.logIn(user)
      .then(data => {
        console.log('User logged in:', data);
        alert("Log In Successful!");
        window.location.href = '/'; // Redirect on successful login
      })
      .catch(error => {
        console.error('Error logging in:', error);
        setErrorSavingUser(true);
        alert(error.message); // Show the actual error message
      });
  };

  return (
    <div className={styles.container}>
      <div>
        <LogInItem addUser={addUser} />
      </div>
    </div>
  );
}

export default LogIn;
