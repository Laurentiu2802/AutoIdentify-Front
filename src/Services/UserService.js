import axios from "axios";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function getAllUsers(page = 0, size = 10){
    return axios.get(`${hostname}/users`)
    .then(response => response.data);
}

function createUser(userItem) {
    return axios.post(`${hostname}/users`, userItem)
    .then(response => response .data)
}

function logIn(userItem) {
    return axios.post(`${hostname}/users/tokens`, userItem, {
        withCredentials: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    })
    .then(response => {
        if (response.data && response.data.accessToken) {
            const accessToken = response.data.accessToken;
            TokenManager.setAccessToken(accessToken);
            alert("User Logged In");
            window.location.href='/'
        } else {
            alert("Invalid response from the server");
        }
    })
    .catch(err => {
        if (err.response === undefined) {
            alert(err);
        } else if (err.response.status === 401) {
            alert('Invalid credentials');
        }
    });
}

export default{
    getAllUsers,
    createUser,
    logIn
}
