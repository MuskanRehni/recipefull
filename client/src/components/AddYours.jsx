import React, { useState } from "react";
import "./AddRecipe.css"; // Assuming you have a separate CSS file for styling
import {API_URL} from "../lib/constants";

const AddRecipe = () => {
    const [formData, setFormData] = useState({
        recipeName: "",
        ingredients: [],
        instructions: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        servings: "",
        category: "",
        cuisine: "",
        difficulty: "",
        nutritionalInfo: {
            calories: "",
            protein: "",
            fat: "",
            carbohydrates: "",
        },
        image: null, // To store uploaded image
        createdBy: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleNestedInputChange = (e, parentKey) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [parentKey]: { ...formData[parentKey], [name]: value },
        });
    };

    const handleAddIngredient = () => {
        setFormData({
            ...formData,
            ingredients: [...formData.ingredients, { name: "", quantity: "" }],
        });
    };

    const handleIngredientChange = (index, field, value) => {
        const updatedIngredients = formData.ingredients.map((ingredient, i) =>
            i === index ? { ...ingredient, [field]: value } : ingredient
        );
        setFormData({ ...formData, ingredients: updatedIngredients });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData({ ...formData, image: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission behavior

        const pageData = new FormData();

        /*{
        recipeName: "",
        ingredients: [],
        instructions: "",
        prepTime: "",
        cookTime: "",
        totalTime: "",
        servings: "",
        category: "",
        cuisine: "",
        difficulty: "",
        nutritionalInfo: {
            calories: "",
            protein: "",
            fat: "",
            carbohydrates: "",
        },
        image: null, // To store uploaded image
        createdBy: "",
    }*/

        for (let key in formData) {
            if (
                key === "protein" ||
                key === "calories" ||
                key == "fat" ||
                key === "carbohydrates"
            ) {
                if (formData[key] === "") {
                    alert("Please fill Feild" + key);
                    return;
                }

                pageData.append(key, formData.nutritionalInfo[key]);
            } else if (key === "ingredients") {
                pageData.append(key, JSON.stringify({ data: formData[key] }));
            } else if (key === "image") {
                if (formData[key] == null) {
                    alert("Please Upload an Image");
                    return;
                }

                pageData.append("image", formData["image"]);
            } else {
                if (formData[key] === "") {
                    alert("Please fill Feild" + key);
                    return;
                } else {
                    pageData.append(key, formData[key]);
                }
            }
        }

        try {
            const response = await fetch(`${API_URL}/api/user/add`, {
                credentials:"include",
                headers:{"Content-Type":"multipart/form-data"},
                method: "POST", // Use POST to send form data
                body: pageData, // Send form data as JSON
            });

            if (response.ok) {
                const data = await response.json(); // Parse JSON response
                alert("Recipe added successfully!"); // Show success message
                console.log("Response:", data); // Log the server response
            } else {
                const errorData = await response.json();
                alert(`Error: ${errorData.error}`); // Show error message
                console.log("Error Response:", errorData);
            }
        } catch (error) {
            console.error("Error connecting to backend:", error);
            alert("An error occurred while adding the recipe.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <h1>Add Recipe</h1>
            <div className="form-group">
                <label>Recipe Name:</label>
                <input
                    type="text"
                    name="recipeName"
                    value={formData.recipeName}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Ingredients:</label>
                {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-group">
                        <input
                            type="text"
                            placeholder="Ingredient Name"
                            value={ingredient.name}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    "name",
                                    e.target.value
                                )
                            }
                            className="ingredient-input"
                        />
                        <input
                            type="text"
                            placeholder="Quantity"
                            value={ingredient.quantity}
                            onChange={(e) =>
                                handleIngredientChange(
                                    index,
                                    "quantity",
                                    e.target.value
                                )
                            }
                            className="ingredient-input"
                        />
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddIngredient}
                    className="add-ingredient-btn"
                >
                    Add Ingredient
                </button>
            </div>
            <div className="form-group">
                <label>Instructions:</label>
                <textarea
                    name="instructions"
                    value={formData.instructions}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Prep Time:</label>
                <input
                    type="text"
                    name="prepTime"
                    value={formData.prepTime}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Cook Time:</label>
                <input
                    type="text"
                    name="cookTime"
                    value={formData.cookTime}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Total Time:</label>
                <input
                    type="text"
                    name="totalTime"
                    value={formData.totalTime}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Servings:</label>
                <input
                    type="number"
                    name="servings"
                    value={formData.servings}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                {/* <label>Category:</label>
                <input
                    type="text"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="form-input"
                /> */}

                <select
                    name="category"
                    id="category"
                    onChange={handleInputChange}
                    className="border-2 border-solid border-black p-3 rounded-md"
                >
                    <option value="">Select Category</option>
                    <option value="Appetizer">Appetizer</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Dessert">Dessert</option>
                    <option value="Beverage">Beverage</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div className="form-group">
                <label>Cuisine:</label>
                <input
                    type="text"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <div className="form-group">
                {/* <label>Difficulty:</label>
                <input
                    type="text"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="form-input"
                /> */}

                <select
                    name="difficulty"
                    id="diffculty"
                    onChange={handleInputChange}
                    className="border-2 border-solid border-black p-3 rounded-md"
                >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                </select>
            </div>
            <div className="form-group">
                <label>Calories:</label>
                <input
                    type="number"
                    name="calories"
                    value={formData.nutritionalInfo.calories}
                    onChange={(e) =>
                        handleNestedInputChange(e, "nutritionalInfo")
                    }
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Protein:</label>
                <input
                    type="number"
                    name="protein"
                    value={formData.nutritionalInfo.protein}
                    onChange={(e) =>
                        handleNestedInputChange(e, "nutritionalInfo")
                    }
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Fat:</label>
                <input
                    type="number"
                    name="fat"
                    value={formData.nutritionalInfo.fat}
                    onChange={(e) =>
                        handleNestedInputChange(e, "nutritionalInfo")
                    }
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Carbohydrates:</label>
                <input
                    type="number"
                    name="carbohydrates"
                    value={formData.nutritionalInfo.carbohydrates}
                    onChange={(e) =>
                        handleNestedInputChange(e, "nutritionalInfo")
                    }
                    className="form-input"
                />
            </div>
            <div className="form-group">
                <label>Upload Image:</label>
                <input
                    type="file"
                    name="image"
                    onChange={handleImageChange}
                    className="form-input"
                />
                {formData.image && (
                    <div className="image-preview">
                        <img
                            src={
                                formData.image === null
                                    ? ""
                                    : URL.createObjectURL(formData.image)
                            }
                            alt="Uploaded Preview"
                        />
                    </div>
                )}
            </div>
            <div className="form-group">
                <label>Created By:</label>
                <input
                    type="text"
                    name="createdBy"
                    value={formData.createdBy}
                    onChange={handleInputChange}
                    className="form-input"
                />
            </div>
            <button type="submit" className="submit-btn">
                Add Recipe
            </button>
        </form>
    );
};

export default AddRecipe;