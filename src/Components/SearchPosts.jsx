import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import styles from "./searchPosts.module.css";


function SearchPosts({ onSearch }) {
    const [categoryID, setCategoryID] = useState('');
    const [carBrandID, setCarBrandID] = useState('');
    const [carModelID, setCarModelID] = useState('');
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);

    useEffect(() => {
        async function fetchData() {
            await Promise.all([
                getCategories(),
                getBrands()
            ]);
        }
        fetchData();
    }, []);

    const getCategories = async () => {
        try {
            const response = await PostService.getCarCategories();
            if (response && Array.isArray(response.categories)) {
                setCategories(response.categories);
            } else {
                console.error("Expected an array but got:", response);
                setCategories([]);
            }
        } catch (error) {
            console.error("Error fetching categories", error);
            setCategories([]);
        }
    };

    const getBrands = async () => {
        try {
            const response = await PostService.getCarBrands();
            if (response && Array.isArray(response.brands)) {
                setBrands(response.brands);
            } else if (response && Array.isArray(response.carBrands)) {
                setBrands(response.carBrands);
            } else {
                console.error("Expected an array but got:", response);
                setBrands([]);
            }
        } catch (error) {
            console.error("Error fetching brands", error);
            setBrands([]);
        }
    };

    const getModels = async (brandID) => {
        try {
            const response = await PostService.getCarModels(brandID);
            if (response && Array.isArray(response.carModels)) {
                setModels(response.carModels);
            } else {
                console.error("Expected an array but got:", response);
                setModels([]);
            }
        } catch (error) {
            console.error("Error fetching models", error);
            setModels([]);
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await onSearch(categoryID, carBrandID, carModelID);
        } catch (error) {
            console.error("Error searching posts:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleCategoryChange = (e) => {
        const selectedCategory = e.target.value;
        setCategoryID(selectedCategory);
    };

    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setCarBrandID(selectedBrand);
        getModels(selectedBrand);
    };

    const handleModelChange = (e) => {
        const selectedModel = e.target.value;
        setCarModelID(selectedModel);
    };

    return (
        <div className={styles.search}>
            <h2>Filter</h2>
            <form onSubmit={handleSearch} className={styles.search_form}>
                <div className={styles.dropbox}>
                    <label>Category:</label>
                    <select value={categoryID} onChange={handleCategoryChange}>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.dropbox}>
                    <label>Brand:</label>
                    <select value={carBrandID} onChange={handleBrandChange}>
                        <option value="">Select Brand</option>
                        {brands.map(br => (
                            <option key={br.brandID} value={br.brandID}>{br.brandName}</option>
                        ))}
                    </select>
                </div>
                <div className={styles.dropbox}>
                    <label>Model:</label>
                    <select value={carModelID} onChange={handleModelChange}>
                        <option value="">Select Model</option>
                        {models.map(md => (
                            <option key={md.modelID} value={md.modelID}>{md.modelName}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <button type="submit" disabled={loading} className={styles.search_button}>
                        {loading ? 'Searching...' : 'Search'}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SearchPosts;
