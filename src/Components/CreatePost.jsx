import React, { useEffect, useState } from "react";
import PostService from "../Services/PostService";
import TokenManager from "../Services/TokenManager";


function CreatePost() {

    const [caption, setCaption] = useState('');
    const [category, setCategory] = useState('');
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [userID, setUserID] = useState();
    const claims = TokenManager.getClaims();


    const getUserDetails = () => {
        if (claims?.studentId) {
            console.log("Fetching user details for user id:", claims.studentId);
            setUserID(claims.studentId);
            console.log("Got the Id!", claims.studentId);
        } else {
            console.log("No user logged in or missing studentId in claims", claims);
        }
    }

    useEffect(() => {
        getUserDetails();
    }, []);

    const addPost = (post) =>{
        PostService.createPost(post

        )
        .then(data => {
            console.log('Post Created', data)
        })
        .catch(response =>{
            alert(response.code);
        })
        .finally(() => {
            console.log('Post Created', data.data)
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

    return(
        <div>
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>

                <div>
                    <textarea id="caption" onChange={(e) => setCaption(e.target.value)}/>
                    <select id="category" onChange={(e) => setCategory(e.target.value)}>
                        <option value="">Select Category</option>
                        <option value="1">Maintanence</option>
                    </select>
                    <select id="brand" onChange={(e) => setBrand(e.target.value)}>
                        <option value="">Select Brand</option>
                        <option value="1">BMW</option>
                    </select>
                    <select id="model" onChange={(e) => setModel(e.target.value)}>
                        <option value="">Select Model</option>
                        <option value="1">G82 M4 Competition</option>
                    </select>
                    <button type="submit">Create Post</button>
                </div>

            </form>
        </div>
    )
}

export default CreatePost;


//userID
//categoryId
//carBrandId
//carModelId
//caption
//