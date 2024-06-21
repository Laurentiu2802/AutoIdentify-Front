import React, { useState } from 'react';
import styles from "./navbar.module.css";
import TokenManager from "../Services/TokenManager";
import logo2 from '../assets/images/logo2.png'

function Navbar () {
    const [results, setResults] = useState([]);
    // const claims = TokenManager.getClaims();
    return(
        <nav className={styles['navbar']}>
            <div className={styles['left-container']}>
                <img src={logo2} alt='Logo' className={styles['logo']}/>
            </div>

            <div className={styles['middle-container']}>
            </div>

            <div className={styles['right-container']}>
                {/* <ul className={styles['button-list']}>
                    <>
                        <li><a href='/Home'>Home</a></li>
                        <li><a href="/LogIn">Cacamaca momentan</a></li>
                        <li><a href="/Chat">ChatRoom</a></li>
                    </> */}
                    {accessToken && claims.roles && claims.roles.includes("ADMIN") && (
                        <>
                            <li><a href="/Statistics">Statistics</a></li>
                            <li><a href="/Category">Criteria Management</a></li>
                        </>

                    )}
                    {accessToken && claims.roles && claims.roles.includes("USER") && (
                        <>
                            <li><a href='/Posts'>Posts</a></li>
                            <li><a href="/">Profile</a></li>
                            <li><a href="/Chat">Chat room</a></li>
                        </>
                    )}
                {/* </ul> */}
            </div>
        </nav>
    );
}
export default Navbar;