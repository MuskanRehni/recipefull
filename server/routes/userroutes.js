import express from "express";
import Recipe from "../models/usermodels.js"; // Import the Recipe model with '.js' extension
import upload from "../utils/multer.js";

const router = express.Router();

// Create a new recipe
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        if (req.file == null) {
            throw new Error("No Image Found");
        }

        const fileName = req.file.filename;

        const { data } = JSON.parse(req.body.ingredients);

        console.log(data);

        const recipe = new Recipe({
            ...req.body,
            nutritionalInfo: {
                calories: req.body.calories,
                protein: req.body.protein,
                fat: req.body.fat,
                carbohydrates: req.body.carbohydrates,
            },
            ingredients: data,
            imageUrl: fileName,
        });

        const savedRecipe = await recipe.save();

        res.status(201).json({
            message: "Recipe added successfully",
            data: savedRecipe,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get all recipes
// router.get("/all", async (req, res) => {
//     try {
//         const recipes = await Recipe.find();
//         res.status(200).json(recipes);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });/
// Get all recipes with optional search
router.get("/all", async (req, res) => {
    try {
        const { search } = req.query;

        // If no search query, return all recipes
        if (!search) {
            const recipes = await Recipe.find();
            return res.status(200).json(recipes);
        }

        // Search only by recipeName (case-insensitive)
        const recipes = await Recipe.find({
            recipeName: { $regex: search, $options: 'i' }
        });

        res.status(200).json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get a specific recipe by ID
router.get("/:id", async (req, res) => {
    try {
        const recipe = await Recipe.findById(req.params.id);
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update a recipe by ID
router.put("/:id", async (req, res) => {
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({
            message: "Recipe updated successfully",
            data: updatedRecipe,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete a recipe by ID
router.delete("/:id", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) {
            return res.status(404).json({ message: "Recipe not found" });
        }
        res.status(200).json({ message: "Recipe deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;