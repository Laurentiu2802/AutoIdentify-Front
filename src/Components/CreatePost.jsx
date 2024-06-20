import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import TokenManager from "../Services/TokenManager";
import styles from "./createPost.module.css";



function CreatePost() {

    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [userID, setUserID] = useState();
    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [models, setModels] = useState([]);
    const claims = TokenManager.getClaims();


    const getUserDetails = () => {
        if (claims?.studentId) {
            setUserID(claims.studentId);
            console.log("Got the Id!", claims.studentId);
        } else {
            console.log("No user logged in or missing studentId in claims", claims);
        }
    }

    const getCategories = async () => {
        try {
            const response = await PostService.getCarCategories();
            console.log("Fetched categories:", response);
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
    }

    const getBrands = async () => {
        try {
            const response = await PostService.getCarBrands();
            console.log("Fetched brands:", response);
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
    }
    const getModels = async (brandID) => {
        try {
            const response = await PostService.getCarModels(brandID);
            console.log("Fetched models:", response);
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
    }
    useEffect(() => {
        getUserDetails();
        getCategories();
        getBrands();
    }, []);

    const addPost = (post) =>{
        PostService.createPost(post

        )
        .then(data => {
            console.log('Post Created', data)
        })
        .catch(response =>{
            alert(response.data);
        })
        .finally(() => {
            console.log('Post Created', data)
        });
    };

    const handleSubmit = async (e) => {
        
        e.preventDefault()

        const post = {
            description: caption,
            userID: userID,
            categoryID: category,
            carBrandID: brand,
            carModelID: model,
        };

        try{
            await addPost(post);
            console.log('Post Created', post);
        } catch (error) {
            console.error('Error creating psot', error);
            alert(error.code);
        }

    };
    const handleBrandChange = (e) => {
        const selectedBrand = e.target.value;
        setBrand(selectedBrand);
        getModels(selectedBrand);
    };
    return(
        
        <form onSubmit={handleSubmit} className={styles.create_post}>

            <div className={styles.wrapper}>

                <div className={styles.selections}>
                    <select id="category" onChange={(e) => setCategory(e.target.value)} className={styles.choice}>
                        <option value="">Select Category</option>
                        {categories.map(cat => (
                            <option key={cat.categoryID} value={cat.categoryID}>{cat.categoryName}</option>
                        ))}
                    </select>
                    <select id="brand" onChange={handleBrandChange} className={styles.choice}>
                        <option value="">Select Brand</option>
                        {brands.map(br => (
                            <option key={br.brandID} value={br.brandID}>{br.brandName}</option>
                        ))}
                    </select>
                    <select id="model" onChange={(e) => setModel(e.target.value)} className={styles.choice}>
                        <option value="">Select Model</option>
                        {models.map(md => (
                            <option key={md.modelID} value={md.modelID}>{md.modelName}</option>
                        ))}
                    </select>
                </div>
                
                <textarea id="caption" onChange={(e) => setCaption(e.target.value)} placeholder="Write a post" className={styles.text}/>
                
                <button type="submit" className={styles.create_post_button}>Create Post!</button>

            </div>

        </form>
        
    )
}

export default CreatePost;


//userID
//categoryId
//carBrandId
//carModelId
//caption
//