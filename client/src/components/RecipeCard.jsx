import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../lib/constants";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RecipeCard = ({ recipe, bg, badge }) => {
    const navigate = useNavigate();
    const [isFavorite, setIsFavorite] = useState(
        localStorage.getItem("favorites")?.includes(recipe.recipeName)
    );
    const [showDetails, setShowDetails] = useState(false);

    const addRecipeToFavorites = (e) => {
        e.stopPropagation(); // Prevent triggering the card click
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRecipeAlreadyInFavorites = favorites.some(
            (fav) => fav.recipeName === recipe.recipeName
        );

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.recipeName !== recipe.recipeName);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    const toggleDetails = () => {
        setShowDetails(!showDetails);
    };
    // Delete recipe from database
    const handleDelete = async (e, id) => {
        e.stopPropagation();
        const confirmDelete = window.confirm("Are you sure you want to delete this recipe?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${API_URL}/api/user/${id}`);
            alert("Recipe deleted successfully!");
            window.location.reload(); // Or update the parent state to reflect the changes
        } catch (error) {
            console.error("Error deleting recipe:", error);
            alert("Failed to delete recipe.");
        }
    };
    // Navigate to update form page
    const handleUpdate = (e, recipe) => {
        e.stopPropagation();
        navigate(`/edit/${recipe._id}`);
    };

    return (
        <div
            className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative cursor-pointer`}
            onClick={toggleDetails}
        >
            <div className="relative h-32">
                <div className="skeleton absolute inset-0" />
                <img
                    src={`${API_URL}/${recipe.imageUrl}`}
                    alt={recipe.recipeName}
                    className="rounded-md w-full h-full object-cover opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display = "none";
                    }}
                />
                <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 flex items-center gap-1 text-sm">
                    {recipe.servings} Servings
                </div>

                <div
                    className="absolute top-1 right-2 bg-white rounded-full p-1"
                    onClick={addRecipeToFavorites}
                >
                    {!isFavorite && (
                        <Heart
                            size={20}
                            className="hover:fill-red-500 hover:text-red-500"
                        />
                    )}
                    {isFavorite && (
                        <Heart
                            size={20}
                            className="fill-red-500 text-red-500"
                        />
                    )}
                </div>
            </div>

            <div className="flex mt-1">
                <p className="font-bold tracking-wide">{recipe.recipeName}</p>
            </div>
            <p className="my-2">{recipe.cuisine} Cuisine</p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Difficulty:</span>{" "}
                {recipe.difficulty}
            </p>

            {showDetails && (
                <div className="mt-4 space-y-4">
                    <div>
                        <h3 className="font-bold mb-2">Ingredients:</h3>
                        <ul className="list-disc pl-5 space-y-1">
                            {recipe.ingredients.map((ingredient, idx) => (
                                <li key={idx}>
                                    {ingredient.quantity && `${ingredient.quantity} `}
                                    {ingredient.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Instructions:</h3>
                        <div className="whitespace-pre-line">{recipe.instructions}</div>
                    </div>
                    <div>
                        <h3 className="font-bold mb-2">Nutritional Info:</h3>
                        <p>Calories: {recipe.nutritionalInfo?.calories || 'N/A'}</p>
                        <p>Protein: {recipe.nutritionalInfo?.protein || 'N/A'}g</p>
                        <p>Fat: {recipe.nutritionalInfo?.fat || 'N/A'}g</p>
                        <p>Carbs: {recipe.nutritionalInfo?.carbohydrates || 'N/A'}g</p>
                    </div>
                </div>
            )}

            {!showDetails && (
                <div className="flex gap-2 mt-auto">
                    {recipe.ingredients.slice(0, 2).map((ingredient, idx) => (
                        <div
                            key={idx}
                            className={`flex gap-1 ${badge} items-center p-1 rounded-md`}
                        >
                            <HeartPulse size={16} />
                            <span className="text-sm tracking-tighter font-semibold">
                                {ingredient.name}
                            </span>
                        </div>
                    ))}
                </div>
            )}
             {/* DELETE and UPDATE buttons */}
             <div className="flex gap-2 mt-4">
                {/* DELETE BUTTON */}
                <button
                    onClick={(e) => handleDelete(e, recipe._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                >
                    Delete
                </button>

                {/* UPDATE BUTTON */}
                <button
                    onClick={(e) => handleUpdate(e, recipe)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 text-sm"
                >
                    Update
                </button>
            </div>
        </div>
    );
};

export default RecipeCard;