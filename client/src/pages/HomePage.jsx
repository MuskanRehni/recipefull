import { Search } from "lucide-react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import axios from "axios";

// import data from "../../dummy_recipes.json";

import { getRandomColor } from "../lib/utils";
import { API_URL } from "../lib/constants";

const HomePage = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);

    // const fetchRecipes = async () => {
    //     setLoading(true);
    //     try {
    //         // Filter recipes based on search query (title or tags)

    //         const response = await axios.get(`${API_URL}/api/user/all`, {
    //             withCredentials:true,
    //             headers:{"Content-Type":"application/json"}
    //         });
            

    //         console.log(response);

    //         setRecipes(response.data);
    //     } catch (error) {
    //         console.error("Error fetching recipes:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const fetchRecipes = async (query = '') => {
        setLoading(true);
        try {
            const response = await axios.get(`${API_URL}/api/user/all`, {
                params: { search: query }, // Add search query parameter
                withCredentials: true,
                headers: { "Content-Type": "application/json" }
            });
            setRecipes(response.data);
        } catch (error) {
            console.error("Error fetching recipes:", error);
        } finally {
            setLoading(false);
        }
    };
    
    
    useEffect(() => {
        fetchRecipes(); // Default fetch without filters
    }, []);

    // useEffect(() => {
    //     if (!recipes) {
    //         return;
    //     }

    //     const filteredRecipes = recipes.filter(
    //         (recipe) =>
    //             recipe.title
    //                 .toLowerCase()
    //                 .includes(searchQuery.toLowerCase()) ||
    //             recipe.tags.some((tag) =>
    //                 tag.toLowerCase().includes(searchQuery.toLowerCase())
    //             )
    //     );

    //     setRecipes(filteredRecipes);
    // }, [recipes]);

    const handleSearchRecipe = (e) => {
        e.preventDefault();
        const searchQuery = e.target[0].value;
        fetchRecipes(searchQuery);
    };

    if (!recipes) {
        return <div>Loading</div>;
    }

    return (
        <div className="bg-[#faf9fb] p-10 flex-1">
            <div className="max-w-screen-lg mx-auto">
                <form onSubmit={handleSearchRecipe}>
                    <label className="input shadow-md flex items-center gap-2">
                        <Search size={"24"} />
                        <input
                            type="text"
                            className="text-sm md:text-md grow"
                            placeholder="What do you want to cook today?"
                        />
                    </label>
                </form>

                <h1 className="font-bold text-3xl md:text-5xl mt-4">
                    Recommended Recipes
                </h1>
                <p className="text-slate-500 font-semibold ml-1 my-2 text-sm tracking-tight">
                    Popular choices
                </p>

                <div className="grid gap-3 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                    {!loading &&
                        recipes.map((recipe, index) => (
                            <RecipeCard
                                key={index}
                                recipe={recipe}
                                {...getRandomColor()}
                            />
                        ))}

                    {loading &&
                        [...Array(9)].map((_, index) => (
                            <div
                                key={index}
                                className="flex flex-col gap-4 w-full"
                            >
                                <div className="skeleton h-32 w-full"></div>
                                <div className="flex justify-between">
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-24"></div>
                                </div>
                                <div className="skeleton h-4 w-1/2"></div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;