import axios from "axios";
import TokenManager from "./TokenManager";

const hostname = 'http://localhost:8080'

function createPost(postItem)
{
    return axios.post(`${hostname}/posts`, postItem)
    .then(response => response.data)
}
function getPosts(){
    return axios.get(`${hostname}/posts`)
    .then(response => response.data);
}
function getCarCategories(){
    return axios.get(`${hostname}/search1/category`)
    .then(response => response.data);
}
function getCarBrands(){
    return axios.get(`${hostname}/search1/brands`)
    .then(response => response.data);
}
function getCarModels(brandID){
    return axios.get(`${hostname}/search1/models/${brandID}`)
    .then(response => response.data)
    .catch(error => {
        console.log("Error fetching models: ", error)
    });
}
function getPostsByCriteria(postID, categoryID, carBrandID, carModelID) {
    const queryParams = {
        postID,
        categoryID,
        carBrandID,
        carModelID
    };

    return axios.get(`${hostname}/posts/search`, { params: queryParams })
        .then(response => response.data)
        .catch(error => {
            console.error("Error searching posts:", error);
            throw error;
        });
}

function getUserPostCounts() {
    return axios.get(`${hostname}/posts/statistics`)
        .then(response => response.data);
}
export default{
    createPost,
    getCarCategories,
    getCarBrands,
    getCarModels,
    getPosts,
    getPostsByCriteria,
    getUserPostCounts
}
