import { Link } from "react-router";
import { PlusIcon } from 'lucide-react';


const Navbar = () => {
    return (
        <header className="bg-base-100 border-b border-base-content/300">
            <div className="mx-20 max-w-8xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold text-primary tracking-tight">Recipeboard</h1>
                    <div className="flex items-center gap-4">
                        <Link to={"/create"} className = "btn btn-primary ">
                        <PlusIcon className="size-5"/>
                        <span>Add Recipe</span>
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Navbar;
