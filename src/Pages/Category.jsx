import React from "react";
import Categories from "../Components/Categories";
import Brands from "../Components/Brands";
import CarModels from "../Components/CarModels";
import Navbar from "../Components/Navbar";
import styles from "./categoryPage.module.css";

function CategoryPage() {
    return (
        <div className={styles.page}>
            <Navbar />
            <div className={styles.content}>
                <div className={styles.column}>
                    <Categories />
                </div>
                <div className={styles.column}>
                    <Brands />
                </div>
                <div className={styles.column}>
                    <CarModels />
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;
