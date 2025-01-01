import { Heart, HeartPulse, Soup } from "lucide-react";
import { useState } from "react";
import { API_URL } from "../lib/constants";

const RecipeCard = ({ recipe, bg, badge }) => {
    const [isFavorite, setIsFavorite] = useState(
        localStorage.getItem("favorites")?.includes(recipe.title)
    );

    console.log(recipe);

    const addRecipeToFavorites = () => {
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        const isRecipeAlreadyInFavorites = favorites.some(
            (fav) => fav.title === recipe.title
        );

        if (isRecipeAlreadyInFavorites) {
            favorites = favorites.filter((fav) => fav.title !== recipe.title);
            setIsFavorite(false);
        } else {
            favorites.push(recipe);
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(favorites));
    };

    // const averageRating =
    //     recipe.ratings.length > 0
    //         ? recipe.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
    //           recipe.ratings.length
    //         : "No ratings";

    return (
        <div
            className={`flex flex-col rounded-md ${bg} overflow-hidden p-3 relative`}
        >
            <a
                href={`https://www.youtube.com/results?search_query=${recipe.title} recipe`}
                target="_blank"
                className="relative h-32"
            >
                <div className="skeleton absolute inset-0" />
                <img
                    src={`${API_URL}/${recipe.imageUrl}`}
                    alt={recipe.title}
                    className="rounded-md w-full h-full object-cover cursor-pointer opacity-0 transition-opacity duration-500"
                    onLoad={(e) => {
                        e.currentTarget.style.opacity = 1;
                        e.currentTarget.previousElementSibling.style.display =
                            "none";
                    }}
                />
                <div className="absolute bottom-2 left-2 bg-white rounded-full p-1 cursor-pointer flex items-center gap-1 text-sm">
                    {recipe.servings} Servings
                </div>

                <div
                    className="absolute top-1 right-2 bg-white rounded-full p-1 cursor-pointer"
                    onClick={(e) => {
                        e.preventDefault();
                        addRecipeToFavorites();
                    }}
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
            </a>

            <div className="flex mt-1">
                <p className="font-bold tracking-wide">{recipe.title}</p>
            </div>
            <p className="my-2">{recipe.cuisine} Cuisine</p>
            <p className="text-sm text-gray-600">
                <span className="font-semibold">Difficulty:</span>{" "}
                {recipe.difficulty}
            </p>
            {/* <p className="text-sm text-gray-600">
                <span className="font-semibold">Rating:</span>{" "}
                {averageRating === "No ratings"
                    ? averageRating
                    : ${averageRating.toFixed(1)} / 5}
            </p> */}

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
        </div>
    );
};

export default RecipeCard;