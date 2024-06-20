import axios from "axios";

const hostname = 'http://localhost:8080';

function createBrand(brandItem) {
    return axios.post(`${hostname}/search1/brandCreate`, brandItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating brand:", error);
            throw error;
        });
}

function getBrands() {
    return axios.get(`${hostname}/search1/brands`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching brands:", error);
            throw error;
        });
}

function updateBrand(brandID, brandItem) {
    return axios.put(`${hostname}/search1/brand1/${brandID}`, brandItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating brand:", error);
            throw error;
        });
}

export default {
    createBrand,
    getBrands,
    updateBrand
};
