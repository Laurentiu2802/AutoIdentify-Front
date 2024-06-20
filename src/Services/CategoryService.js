import axios from "axios";

const hostname = 'http://localhost:8080';

function createCategory(categoryItem) {
    return axios.post(`${hostname}/search1/categoryCreate`, categoryItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error creating category:", error);
            throw error;
        });
}

function getCategories() {
    return axios.get(`${hostname}/search1/category`)
        .then(response => response.data)
        .catch(error => {
            console.error("Error fetching categories:", error);
            throw error;
        });
}

function updateCategory(categoryID, categoryItem) {
    return axios.put(`${hostname}/search1/updatecategory/${categoryID}`, categoryItem)
        .then(response => response.data)
        .catch(error => {
            console.error("Error updating category:", error);
            throw error;
        });
}

export default {
    createCategory,
    getCategories,
    updateCategory
};
