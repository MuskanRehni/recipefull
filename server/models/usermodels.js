import mongoose from 'mongoose';

// Define the Recipe schema
const recipeSchema = new mongoose.Schema({
  recipeName: {
    type: String,
    required: true,
    trim: true,
  },
  ingredients: [
    {
      name: { type: String, required: true },
      quantity: { type: String, required: true },
    },
  ],
  instructions: {
    type: [String], // Array of step-by-step instructions
    required: true,
  },
  prepTime: {
    type: String, // Format: "30 mins"
    required: true,
  },
  cookTime: {
    type: String,
    required: true,
  },
  totalTime: {
    type: String,
    required: true,
  },
  servings: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage', 'other'], // Example categories
    required: true,
  },
  cuisine: {
    type: String,
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'],
    required: true,
  },
  nutritionalInfo: {
    calories: { type: Number },
    protein: { type: Number },
    fat: { type: Number },
    carbohydrates: { type: Number },
  },
  imageUrl: {
    type: String,
  },
  createdBy: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the Recipe model
const Recipe = mongoose.model('Recipe', recipeSchema);

export default Recipe;

