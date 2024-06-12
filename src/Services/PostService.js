import axios from "axios";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function createPost(postItem)
{
    return axios.post(`${hostname}/posts`, postItem)
    .then(response => response.data)
}


export default{
    createPost,
}
