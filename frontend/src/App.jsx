import React from 'react'
import { Route, Routes } from "react-router"
import HomePage from "./pages/HomePage"
import CreatePage from "./pages/CreatePage"
// import RecipeDetailPage from "./pages/RecipeDetailPage"
import { toast } from 'react-hot-toast';

const App = () => {
  return (
    <div className="relative h-full w-full">
      {/* website for radial cradient: https://bg.ibelick.com/ */}
<div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]"/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
        {/* <Route path="/recipe/:id" element={<RecipeDetailPage />} /> */}

      </Routes>
    </div>
    
  );

}

export default App
