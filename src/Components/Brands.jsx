import React, { useEffect, useState } from "react";
import BrandService from "../Services/BrandService";
import styles from "./brands.module.css";

function Brands() {
    const [brands, setBrands] = useState([]);
    const [brandName, setBrandName] = useState("");
    const [selectedBrand, setSelectedBrand] = useState(null);
    const [errorSavingBrand, setErrorSavingBrand] = useState(false);
    const [errorUpdatingBrand, setErrorUpdatingBrand] = useState(false);

    useEffect(() => {
        BrandService.getBrands()
            .then(data => {
                if (Array.isArray(data.carBrands)) {
                    setBrands(data.carBrands);
                } else {
                    console.error("Expected an array but got:", data);
                }
            })
            .catch(error => {
                console.error("Error fetching brands", error);
            });
    }, []);

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const brandData = { brandName };

        try {
            await BrandService.createBrand(brandData);
            setErrorSavingBrand(false);
            // Fetch updated brands
            const updatedBrands = await BrandService.getBrands();
            if (Array.isArray(updatedBrands.carBrands)) {
                setBrands(updatedBrands.carBrands);
            } else {
                console.error("Expected an array but got:", updatedBrands);
            }
            setBrandName("");
        } catch (error) {
            setErrorSavingBrand(true);
            console.error("Error creating brand:", error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedBrand) return;

        const updatedBrand = { brandName };

        try {
            await BrandService.updateBrand(selectedBrand.brandID, updatedBrand);
            setErrorUpdatingBrand(false);
            // Fetch updated brands
            const updatedBrands = await BrandService.getBrands();
            if (Array.isArray(updatedBrands.carBrands)) {
                setBrands(updatedBrands.carBrands);
            } else {
                console.error("Expected an array but got:", updatedBrands);
            }
            setSelectedBrand(null);
            setBrandName("");
        } catch (error) {
            setErrorUpdatingBrand(true);
            console.error("Error updating brand:", error);
        }
    };

    const handleBrandSelect = (e) => {
        const selectedId = e.target.value;
        const brand = brands.find(brand => brand.brandID === parseInt(selectedId));
        setSelectedBrand(brand);
        setBrandName(brand ? brand.brandName : "");
    };

    return (
        <div className={styles.page}>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Create Brand</div>
                <form onSubmit={handleCreateSubmit} className={styles.brand_form}>
                    <label htmlFor="brandName">Brand Name</label>
                    <input
                        id="brandName"
                        type="text"
                        value={brandName}
                        onChange={(e) => setBrandName(e.target.value)}
                        className={styles.brand_input}
                        placeholder="Brand Name"
                        required
                    />
                    <button type="submit" className={styles.save_button}>Create Brand</button>
                    {errorSavingBrand && <p>Error saving brand. Please try again.</p>}
                </form>
            </div>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Update Brand</div>
                <label htmlFor="brand-select">Select Brand:</label>
                <select id="brand-select" className={styles.brand_select} onChange={handleBrandSelect}>
                    <option value="">--Select a brand--</option>
                    {brands.map(brand => (
                        <option key={brand.brandID} value={brand.brandID}>
                            {brand.brandName}
                        </option>
                    ))}
                </select>
                {selectedBrand && (
                    <form onSubmit={handleUpdateSubmit} className={styles.brand_form}>
                        <label htmlFor="updateBrandName">Update Brand Name</label>
                        <input
                            id="updateBrandName"
                            type="text"
                            value={brandName}
                            onChange={(e) => setBrandName(e.target.value)}
                            className={styles.brand_input}
                            placeholder="Update Brand Name"
                            required
                        />
                        <button type="submit" className={styles.save_button}>Save Changes</button>
                        {errorUpdatingBrand && <p>Error updating brand. Please try again.</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default Brands;
