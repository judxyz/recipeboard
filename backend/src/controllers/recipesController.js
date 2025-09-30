import Recipe from "../models/Recipe.js";
import { recipePreview } from "../services/linkpreview_api.js"
import normalizeUrl from 'normalize-url';


// make functions async as api calls take time, dont have to wait for it to finish

export async function getAllRecipes(req, res) {
    try {
        const { q, tags } = req.query;
        const query = {};
        if (tags) query.tags = tags;
        if (q) query.title = { $regex: q, $options: "i" };
        const Recipes = await Recipe.find(query).sort({ createdAt: -1 }); // show the newest recipe first
        res.status(200).json(Recipes);
    } catch (error) {
        console.error("Error in getAllRecipes controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

// export async function getRecipeById(req, res) {
//     try {
//         const Recipe = await Recipe.findById(req.params.id);
//         if (!Recipe) return res.status(404).json({message:"Recipe not found"});
//         res.status(200).json(Recipe);

//     } catch (error) {
//         console.error("Error in getRecipeById controller:", error);
//         res.status(500).json({message: "Internal server error"});

//     }
// }

export async function createRecipe(req, res) {
    try {
        let { url, tags } = req.body;
        url = normalizeUrl(url.toString());
        if (!url || !tags) {
            return res.status(400).json({ message: "Url and tag(s) are required" });
        }
        const exist = await Recipe.findOne({ url });
        if (exist) {
            return res.status(409).json({ message: "Recipe already exists. " });
        }
        const meta = await recipePreview(url); // get title, description, imageURL

        const newRecipe = await Recipe.create({ url, tags, ...meta}); // try .save() if doesnt work
        // console.log(url, tags, meta);
        res.status(201).json(newRecipe);
        // handle same link 

    } catch (error) {
        console.error("Error in createRecipe controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}

// export async function updateRecipe(req, res) {
//     try {
//         const { title, content } = req.body; // new values to update
//         const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id, { title, content },
//             { new: true } // returns the updateed Recipe, not old one
//         );

//         // valid id (length) but not found
//         if (!updatedRecipe) return res.status(404).json({ message: "Recipe not found" });

//         res.status(200).json(updatedRecipe);
//     } catch (error) { // id is invalid format
//         console.error("Error in updateRecipe controller:", error)
//         res.status(500).json({ message: "Internal server error" });
//     }
// };

export async function deleteRecipe(req, res) {

    try {
        const deletedRecipe = await Recipe.findByIdAndDelete(req.params.id);
        if (!deletedRecipe) return res.status(404).json({ message: "Recipe not found" });
        res.status(200).json({ message: "Recipe deleted successfully!" });

    } catch (error) {
        console.error("Error in deleteRecipe controller:", error)
        res.status(500).json({ message: "Internal server error" });
    }
}


