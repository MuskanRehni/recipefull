import React, { useState } from "react";

const AddYours = () => {
  const [formData, setFormData] = useState({
    recipeName: "",
    ingredients: [{ name: "", quantity: "" }],
    instructions: [""],
    prepTime: "",
    cookTime: "",
    totalTime: "",
    servings: 0,
    category: "",
    cuisine: "",
    difficulty: "",
    nutritionalInfo: { calories: 0, protein: 0, fat: 0, carbohydrates: 0 },
    imageUrl: "",
    createdBy: "",
  });

  // Handle change for individual fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add a new ingredient field
  const addIngredient = () => {
    setFormData({
      ...formData,
      ingredients: [...formData.ingredients, { name: "", quantity: "" }],
    });
  };

  // Handle ingredient change
  const handleIngredientChange = (index, e) => {
    const updatedIngredients = formData.ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [e.target.name]: e.target.value } : ingredient
    );
    setFormData({ ...formData, ingredients: updatedIngredients });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with API call
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full max-w-4xl p-8 bg-white rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Add Your Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 font-medium">Recipe Name</label>
            <input
              type="text"
              name="recipeName"
              className="w-full p-3 border rounded"
              placeholder="Enter recipe name"
              value={formData.recipeName}
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Ingredients</label>
            {formData.ingredients.map((ingredient, index) => (
              <div key={index} className="flex gap-4 mb-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Ingredient Name"
                  value={ingredient.name}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="p-2 border rounded w-1/2"
                />
                <input
                  type="text"
                  name="quantity"
                  placeholder="Quantity"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, e)}
                  className="p-2 border rounded w-1/2"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addIngredient}
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              Add Ingredient
            </button>
          </div>

          <div className="mb-6">
            <label className="block mb-2 font-medium">Instructions</label>
            <textarea
              name="instructions"
              rows="4"
              placeholder="Enter instructions (comma-separated)"
              className="w-full p-3 border rounded"
              value={formData.instructions}
              onChange={handleChange}
            />
          </div>

          {/* Add other fields here */}

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-3 rounded hover:bg-green-600"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddYours;
