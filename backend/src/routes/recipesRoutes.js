import express from "express";
import { createRecipe, getAllRecipes, deleteRecipe } from "../controllers/recipesController.js";
const router = express.Router();

router.get("/", getAllRecipes);
// router.get("/:id", getRecipeById);
router.post("/", createRecipe);
// router.put("/:id", updateRecipe);  // id is dynamic at end of http method
router.delete("/:id", deleteRecipe);

export default router;