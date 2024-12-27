import React, { useState } from "react";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: "",
    instructions: "",
    prepTime: "",
    cookTime: "",
    servings: 0,
    category: "",
    cuisine: "",
    difficulty: "",
    imageFile: null,
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Automatically adjust textarea height
  const autoResize = (e) => {
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    setFormData({ ...formData, imageFile: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const recipeData = new FormData();
    recipeData.append("recipeName", formData.recipeName);
    recipeData.append("ingredients", formData.ingredients);
    recipeData.append("instructions", formData.instructions);
    recipeData.append("prepTime", formData.prepTime);
    recipeData.append("cookTime", formData.cookTime);
    recipeData.append("servings", formData.servings);
    recipeData.append("category", formData.category);
    recipeData.append("cuisine", formData.cuisine);
    recipeData.append("difficulty", formData.difficulty);
    recipeData.append("image", formData.imageFile);

    console.log("Form submitted:", formData);

    // Show alert message
    alert("Your recipe has been added successfully!");

    // Reset the form fields after submission
    setFormData({
      recipeName: "",
      ingredients: "",
      instructions: "",
      prepTime: "",
      cookTime: "",
      servings: 0,
      category: "",
      cuisine: "",
      difficulty: "",
      imageFile: null,
    });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Your Recipe</h2>
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Recipe Name */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              className="w-full p-3 border rounded"
              placeholder="Enter recipe name"
              value={formData.recipeName}
              onChange={handleChange}
              required
            />
          </div>

          {/* Ingredients */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Ingredients</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={(e) => {
                handleChange(e);
                autoResize(e);
              }}
              placeholder="Add ingredients, one per line..."
              rows="3"
              className="w-full p-3 border rounded resize-none"
              required
            ></textarea>
            <small className="text-gray-500">Enter one ingredient per line.</small>
          </div>

          {/* Instructions */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Instructions</label>
            <textarea
              name="instructions"
              value={formData.instructions}
              onChange={(e) => {
                handleChange(e);
                autoResize(e);
              }}
              placeholder="Add instructions, one step per line..."
              rows="3"
              className="w-full p-3 border rounded resize-none"
              required
            ></textarea>
            <small className="text-gray-500">Enter one step per line.</small>
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">Upload Recipe Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="w-full p-3 border rounded"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
          >
            Submit Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;