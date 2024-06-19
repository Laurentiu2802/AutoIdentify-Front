import React from "react";
import SearchService from "../Services/SearchService";

function CreateCategory(){
    const addCategory = (category) => {

        SearchService.createCategory(category)
        .then(data => {
            console.log(`Category created: `, data);
        })
        .catch(response => {
            const data = response.response.data;
            if(data.errors.find(error => error.error === `Category duplicate`)){
            }
        })
        .finally(() => {
            console.log(`Category created`);
        });
    };

    return(
        <div className="container">'
            <div className="inner">
            </div>
        </div>
    )
}