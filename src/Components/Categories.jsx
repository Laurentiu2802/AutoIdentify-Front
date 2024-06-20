import React, { useEffect, useState } from "react";
import CategoryService from "../Services/CategoryService";
import styles from "./categories.module.css";

function Categories() {
    const [categories, setCategories] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [errorSavingCategory, setErrorSavingCategory] = useState(false);
    const [errorUpdatingCategory, setErrorUpdatingCategory] = useState(false);

    useEffect(() => {
        CategoryService.getCategories()
            .then(data => {
                if (Array.isArray(data.categories)) {
                    setCategories(data.categories);
                } else {
                    console.error("Expected an array but got:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching categories", error);
            });
    }, []);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const categoryData = { categoryName };

        try {
            await CategoryService.createCategory(categoryData);
            setErrorSavingCategory(false);
            // Fetch updated categories
            const updatedCategories = await CategoryService.getCategories();
            if (Array.isArray(updatedCategories.categories)) {
                setCategories(updatedCategories.categories);
            } else {
                console.error("Expected an array but got:", updatedCategories);
            }
            setCategoryName("");
        } catch (error) {
            setErrorSavingCategory(true);
            console.error("Error creating category:", error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedCategory) return;

        const updatedCategory = { categoryName };

        try {
            await CategoryService.updateCategory(selectedCategory.categoryID, updatedCategory);
            setErrorUpdatingCategory(false);
            // Fetch updated categories
            const updatedCategories = await CategoryService.getCategories();
            if (Array.isArray(updatedCategories.categories)) {
                setCategories(updatedCategories.categories);
            } else {
                console.error("Expected an array but got:", updatedCategories);
            }
            setSelectedCategory(null);
            setCategoryName("");
        } catch (error) {
            setErrorUpdatingCategory(true);
            console.error("Error updating category:", error);
        }
    };

    const handleCategorySelect = (e) => {
        const selectedId = e.target.value;
        const category = categories.find(cat => cat.categoryID === parseInt(selectedId));
        setSelectedCategory(category);
        setCategoryName(category ? category.categoryName : "");
    };

    return (
        <div className={styles.page}>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Create Category</div>
                <form onSubmit={handleCreateSubmit} className={styles.category_form}>
                    <label htmlFor="categoryName">Category Name</label>
                    <input
                        id="categoryName"
                        type="text"
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className={styles.category_input}
                        placeholder="Category Name"
                        required
                    />
                    <button type="submit" className={styles.save_button}>Create Category</button>
                    {errorSavingCategory && <p>Error saving category. Please try again.</p>}
                </form>
            </div>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Update Category</div>
                <label htmlFor="category-select">Select Category:</label>
                <select id="category-select" className={styles.category_select} onChange={handleCategorySelect}>
                    <option value="">--Select a category--</option>
                    {categories.map(category => (
                        <option key={category.categoryID} value={category.categoryID}>
                            {category.categoryName}
                        </option>
                    ))}
                </select>
                {selectedCategory && (
                    <form onSubmit={handleUpdateSubmit} className={styles.category_form}>
                        <label htmlFor="updateCategoryName">Update Category Name</label>
                        <input
                            id="updateCategoryName"
                            type="text"
                            value={categoryName}
                            onChange={(e) => setCategoryName(e.target.value)}
                            className={styles.category_input}
                            placeholder="Update Category Name"
                            required
                        />
                        <button type="submit" className={styles.save_button}>Save Changes</button>
                        {errorUpdatingCategory && <p>Error updating category. Please try again.</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default Categories;
