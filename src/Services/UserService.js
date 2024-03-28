import axios from "axios";

const hostname = 'http://localhost:8080'

function getAllUsers(page = 0, size = 10){
    return axios.get(`${hostname}/users`)
    .then(response => response.data);
}

function createUser(userItem) {
    return axios.post(`${hostname}/users`, userItem)
    .then(response => response .data)
}

export default{
    getAllUsers,
    createUser
}
