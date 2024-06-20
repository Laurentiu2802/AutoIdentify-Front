import React, { useEffect, useState } from "react";
import CarModelService from "../Services/CarModelService";
import styles from "./carModels.module.css";

function CarModels() {
    const [models, setModels] = useState([]);
    const [brands, setBrands] = useState([]);
    const [modelName, setModelName] = useState("");
    const [selectedBrandID, setSelectedBrandID] = useState("");
    const [selectedModel, setSelectedModel] = useState(null);
    const [updateBrandName, setUpdateBrandName] = useState("");
    const [errorSavingModel, setErrorSavingModel] = useState(false);
    const [errorUpdatingModel, setErrorUpdatingModel] = useState(false);

    useEffect(() => {
        CarModelService.getBrands()
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

    const handleBrandSelect = async (e) => {
        const brandID = e.target.value;
        setSelectedBrandID(brandID);
        if (brandID) {
            try {
                const data = await CarModelService.getCarModelsByBrand(brandID);
                if (Array.isArray(data.carModels)) {
                    setModels(data.carModels);
                    const brand = brands.find(brand => brand.brandID === parseInt(brandID));
                    setUpdateBrandName(brand ? brand.brandName : "");
                } else {
                    console.error("Expected an array but got:", data);
                }
            } catch (error) {
                console.error("Error fetching car models:", error);
            }
        } else {
            setModels([]);
        }
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        const modelData = { modelName, brandID: selectedBrandID };

        try {
            await CarModelService.createCarModel(modelData);
            setErrorSavingModel(false);
            // Fetch updated models
            const updatedModels = await CarModelService.getCarModelsByBrand(selectedBrandID);
            if (Array.isArray(updatedModels.carModels)) {
                setModels(updatedModels.carModels);
            } else {
                console.error("Expected an array but got:", updatedModels);
            }
            setModelName("");
            setSelectedBrandID("");
        } catch (error) {
            setErrorSavingModel(true);
            console.error("Error creating car model:", error);
        }
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        if (!selectedModel) return;

        const updatedModel = { modelName, brandID: selectedBrandID };

        try {
            await CarModelService.updateCarModel(selectedModel.modelID, updatedModel);
            setErrorUpdatingModel(false);
            // Fetch updated models
            const updatedModels = await CarModelService.getCarModelsByBrand(selectedBrandID);
            if (Array.isArray(updatedModels.carModels)) {
                setModels(updatedModels.carModels);
            } else {
                console.error("Expected an array but got:", updatedModels);
            }
            setSelectedModel(null);
            setModelName("");
            setSelectedBrandID("");
            setUpdateBrandName("");
        } catch (error) {
            setErrorUpdatingModel(true);
            console.error("Error updating car model:", error);
        }
    };

    const handleModelSelect = (e) => {
        const selectedId = e.target.value;
        const model = models.find(model => model.modelID === parseInt(selectedId));
        setSelectedModel(model);
        setModelName(model ? model.modelName : "");
        if (model) {
            console.log(model.carBrand.brandID)
            setSelectedBrandID(model.carBrand.brandID);
            // const brand = brands.find(brand => brand.brandID === model.brandID);
            // setUpdateBrandName(brand ? brand.brandName : "");
        } else {
            setUpdateBrandName("");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Create Car Model</div>
                <form onSubmit={handleCreateSubmit} className={styles.model_form}>
                    <label htmlFor="modelName">Model Name</label>
                    <input
                        id="modelName"
                        type="text"
                        value={modelName}
                        onChange={(e) => setModelName(e.target.value)}
                        className={styles.model_input}
                        placeholder="Model Name"
                        required
                    />
                    <label htmlFor="brand-select">Select Brand:</label>
                    <select
                        id="brand-select"
                        className={styles.brand_select}
                        value={selectedBrandID}
                        onChange={handleBrandSelect}
                        required
                    >
                        <option value="">--Select a brand--</option>
                        {brands.map(brand => (
                            <option key={brand.brandID} value={brand.brandID}>
                                {brand.brandName}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className={styles.save_button}>Create Model</button>
                    {errorSavingModel && <p>Error saving model. Please try again.</p>}
                </form>
            </div>
            <div className={styles.form_section}>
                <div className={styles.form_title}>Update Car Model</div>
                <label htmlFor="model-select">Select Model:</label>
                <select id="model-select" className={styles.model_select} onChange={handleModelSelect}>
                    <option value="">--Select a model--</option>
                    {models.map(model => (
                        <option key={model.modelID} value={model.modelID}>
                            {model.modelName}
                        </option>
                    ))}
                </select>
                {selectedModel && (
                    <form onSubmit={handleUpdateSubmit} className={styles.model_form}>
                        <label htmlFor="update-brand-name">Update Brand:</label>
                        <input
                            id="update-brand-name"
                            type="text"
                            value={updateBrandName}
                            className={styles.model_input}
                            readOnly
                        />
                        <label htmlFor="updateModelName">Update Model Name</label>
                        <input
                            id="updateModelName"
                            type="text"
                            value={modelName}
                            onChange={(e) => setModelName(e.target.value)}
                            className={styles.model_input}
                            placeholder="Update Model Name"
                            required
                        />
                        <button type="submit" className={styles.save_button}>Save Changes</button>
                        {errorUpdatingModel && <p>Error updating model. Please try again.</p>}
                    </form>
                )}
            </div>
        </div>
    );
}

export default CarModels;
