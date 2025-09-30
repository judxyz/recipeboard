import { PenSquareIcon, Trash2Icon, ArrowUpRight } from "lucide-react";
import { Link } from 'react-router';
import { formatDate } from "../lib/utils";
import api from "../lib/axios";
import toast from "react-hot-toast";

const RecipeCard = ({ recipe, setRecipes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // doesnt navigate to recipe detail page

    if (!window.confirm("Are you sure you want to delete this recipe?")) return;
    // delete recipe
    try {
      await api.delete(`/recipes/${id}`)
      setRecipes((prev) => prev.filter(recipe => recipe._id !== id)); //get rid of the previous one
      toast.success("Recipe deleted successfully");
    } catch (error) {
      console.log("Error deleting recipe:", error)
      toast.error("Failed to delete recipe.");
    }
  }


  return (
    <a href={recipe.url} target="_blank" rel="noopener noreferrer" className="card bg-base-100 hover:shadow-2xl transition-all duration-200 
      border-2 border-solid border-black m-0 rounded-xxs">
      <div className="relative pt-1 pr-1 pl-1">
        <ArrowUpRight className="absolute top-0 right-0 size-10 text-black" />


      </div>
      <div className="card-body p-0 group">


        <h3 className="card-title text-black font-bold uppercase pr-8 pt-2 pl-4 line-clamp-2 min-h-[4rem] group-hover:underline">{recipe.title}</h3>
        <div className>
          {recipe.tags?.map((tag, index) => (
            <span key={index} className="bg-primary text-white text-bold text-xs px-2 py-1 ml-2 rounded-full"
    >
          {tag}

            </span>
          ))}
        </div>
        
        <div className="card-actions justify-between items-center mt-0">

          <span className="text-sm text-gray-20 text-base-content/60 italic pl-4">{recipe.source}</span>
          <div className="flex items-center gap-1">
            <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, recipe._id)}>
              <Trash2Icon className="size-4" />
            </button>
          </div>
        </div>

        

        
      <div className="overflow-hidden">
      <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="w-80 h-60 object-cover round-none transition-transform duration-300 ease-in-out group-hover:scale-105"
          loading="lazy"
        />
        </div>

      </div>


    </a>
  )

}


export default RecipeCard
