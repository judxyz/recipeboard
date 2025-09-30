import mongoose from "mongoose";

// 1. create a schema
// 2. create a model based off that schema

const recipeSchema = new mongoose.Schema(
    {
        url:
        {
            type: String,
            required: true,
            unique: true
        },
        title:
        {
            type: String,
            required: true
        },
        description:
        {
            type: String,
            default: ""

        },
        imageUrl:
        {
            type: String,
            default: ""

        },
        tags:
        [{
            type: String,
            enum: ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"],
        }],
        source: { type: String, default: "" },
    }, { timestamps: true } //createdAt, updatedAt

);

recipeSchema.index({ title: "text" }); // to search by title


const Recipe = mongoose.model("Recipe", recipeSchema);

export default Recipe;

