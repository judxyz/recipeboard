import React from 'react'
import { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import RateLimitedUI from '../components/RateLimitedUI';
import axios from "axios";
import toast from 'react-hot-toast';
import RecipeCard from '../components/RecipeCard';
import api from '../lib/axios';
import { RecipesNotFound, FilterError } from '../components/RecipesNotFound';
import { Filter, Search } from 'lucide-react';


const TAGS = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false);
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await api.get("/recipes");
        console.log(res.data)
        setRecipes(res.data)
        setIsRateLimited(false)

      } catch (error) {
        console.log("Error fetching recipes:", error)
        if (error.response.status === 429) {
          setIsRateLimited(true);
        } else {
          toast.error("Failed to load recipes")
        }
      } finally { // in all cases
        setLoading(false)
      }
    }
    fetchRecipes();
  }, [])

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);

    }, 400)

    return () => clearTimeout(timer);
  }, [tags, search])


  const handleTagClick = (tag) => {
    setTags(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    )
  }


  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(search.toLowerCase()) &&
    (tags.length === 0 || recipe.tags?.some(tag => tags.includes(tag)))


  );
  return (
    <div className="min-h-screen">
      <Navbar />
      <header className="bg-base-100 border-b border-base-content/300">

        <div className="flex ml-20 pt-5 text-primary">
          <h3 className="card-title text-2xl font-extralight text-black">Recipes</h3>

        </div>
        <div className="relative w-full max-w-md mx-20 mt-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300 size-5" />
          <input
            type="text"
            className="input w-full pl-10 rounded-none bg-gray-100 italic border-2 border-primary"
            placeholder="Search recipes by title..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>



        <div className="mb-4 flex flex-wrap gap-2 ml-20 mt-4">
          {TAGS.map(tag => (
            <button
              key={tag}
              type="button"
              className={`btn btn-outline btn-sm border-2 rounded-full border-black  transition ${tags.includes(tag) ? "bg-primary text-white hover:bg-primary/100 border-black " : "bg-white text-black hover:bg-primary/100 border-black "
                }`}
              onClick={() => handleTagClick(tag)}
            >
              {tag}
            </button>
          ))}
        </div>



      </header>

        {/* <div className='italic p-0 ml-8 mt-4'>
          <p className="text-sm">
            {filteredRecipes.length} Recipes
          </p>
        </div> */}


      {isRateLimited && <RateLimitedUI />}
      <div className='max-w-7xl mx-auto p-4 mt-6'>


        {loading && <div className='text-center text-black py-10'> Loading recipes... </div>}

        {recipes.length === 0 && !loading && !isRateLimited && <RecipesNotFound />}
        {filteredRecipes.length === 0 && !loading && !isRateLimited && <FilterError />}


        {/* {recipes.length > 0 && !isRateLimited && (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((recipe) => (
                <RecipeCard key={recipe._id} recipe={recipe} setRecipes={setRecipes}/>
              ))}
          </div>
        )} */}


        {filteredRecipes.length > 0 && !isRateLimited && !loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredRecipes.map((recipe) => (
              <RecipeCard key={recipe._id} recipe={recipe} setRecipes={setRecipes} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage
