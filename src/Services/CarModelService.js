import axios from "axios";

const hostname = 'http://localhost:8080';

function createCarModel(modelItem) {
    return axios.post(`${hostname}/search1/modelCreate`, modelItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating car model:", error);
            throw error;
        });
}

function getCarModelsByBrand(brandID) {
    return axios.get(`${hostname}/search1/models/${brandID}`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching car models:", error);
            throw error;
        });
}

function updateCarModel(modelID, modelItem) {
    return axios.put(`${hostname}/search1/model/${modelID}`, modelItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating car model:", error);
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

export default {
    createCarModel,
    getCarModelsByBrand,
    updateCarModel,
    getBrands
};
