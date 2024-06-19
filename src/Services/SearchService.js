import axios from "axios";

const hostname = 'http://localhost:8080'


//category

function createCategory(categoryItem){
    return axios.post(`${hostname}/search1/categoryCreate`, categoryItem)
    .then(response => response.data);
}

function getCarCategories(){
    return axios.get(`${hostname}/search1/category`)
    .then(response => response.data);
}


//brand

function createBrand(brandItem){
    return axios.post(`${hostname}/search1/brandCreate`, brandItem)
    .then(response => response.data);
}

function getCarBrands(){
    return axios.get(`${hostname}/search1/brands`)
    .then(response => response.data);
}


//model

function createModel(modelItem){
    return axios.post(`${hostname}/search1/modelCreate`, modelItem)
    .then(response => response.data);
}

function getCarModels(brandID){
    return axios.get(`${hostname}/search1/models/${brandID}`)
    .then(response => response.data)
    .catch(error => {
        console.log("Error fetching models: ", error)
    });
};

export default{
    createCategory,
    getCarCategories,
    createBrand,
    getCarBrands,
    createModel,
    getCarModels
}