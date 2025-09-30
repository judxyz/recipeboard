import { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { ArrowLeftIcon } from "lucide-react";
import toast from 'react-hot-toast';
import api from '../lib/axios';

const TAGS = ["Breakfast", "Lunch", "Dinner", "Snack", "Dessert"];

const CreatePage = () => {
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleTagClick = (tag) => {
    setTags((prev) => prev.includes(tag)
      ? prev.filter((t) => t !== tag)
      : [...prev, tag]
    )
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url.trim() || tags.length === 0) {
      toast.error("Please provide both url and at least 1 tag");
      return;
    }

    setLoading(true);

      console.log(url, tags)


    try {
      await api.post("/recipes", {
        url,
        tags
      });
      toast.success("Recipe added successfully");
      navigate("/")
    } catch (error) {
      console.log("Error adding recipe:", error)
      if (error.response.status === 429) {
        toast.error("Too many requests, please try again later.", {
          duration: 4000,
          icon: "⚠️"
        });
      } else {
        toast.error("Failed to add recipe.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-base-300">

      <div className="container mx-auto px-4 py-8">

        <div className="max-w-2xl mx-auto ">

          <div className="card bg-base-100 rounded-none border-2">
            <div className="card-body">
              <div className="flex items-center mb-4">
                <Link to="/" className="btn btn-ghost">
                  <ArrowLeftIcon className="size-8" />
                </Link>
                <h2 className="card-title text-2xl">Add New Recipe</h2>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-control mb-4">
                  <label className="text-base">URL:
                  </label>
                  <input type="text"
                    className="input w-full rounded-none bg-gray-100 italic mt-2 text-primary border-2 border-primary"
                    placeholder='Paste link here...'
                    value={url}
                    onChange={((e) => setUrl(e.target.value))}
                  />

                </div>
                <div className="form-control mb-4">
                  <label className="">Select tags:</label>
                  <div className=' flex flex-wrap gap-2 mt-2'>
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
                </div>

                <div className='card-actions justify-end'>
                  <button type="submit" className="btn btn-primary text-white" disabled={loading}>
                    {loading ? "Creating..." : "Create Recipe"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePage
