import axios from "axios";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function getAllUsers(page = 0, size = 10){
    return axios.get(`${hostname}/users`)
    .then(response => response.data);
}

function createUser(userItem) {
    return axios.post(`${hostname}/users`, userItem)
    .then(response => response.data)
}
function getUserDetails(userID){
    return axios.get(`${hostname}/users/userDetails/${userID}`,{
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => response.data)
    .catch(error => {
        console.log("Error fetching user details: ", error)
    });
}

function logIn(userItem) {
    return axios.post(`${hostname}/users/tokens`, userItem, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        console.log(response.data)
        if (response.data && response.data.token) {
            const accessToken = response.data.token;
            TokenManager.setAccessToken(accessToken);
            alert("User Logged In");
            window.location.href='/'
        } else {
            alert("Invalid response from the server");
        }
    })
    .catch(err => {
        if (err.response && err.response.status === 401) {
          throw new Error('Invalid credentials');
        } else {
          throw err;
        }
      });
}

export default{
    getAllUsers,
    createUser,
    logIn,
    getUserDetails,
}
