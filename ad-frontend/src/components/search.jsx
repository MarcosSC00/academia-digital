import { SearchIcon } from "lucide-react";

export function Search(props) {

    const handleInputChange = (event) => {
        props.onValorChange(event.target.value)
    }

    return (
        <div 
            className={`w-1/2 max-w-[250px] flex items-center border border-gray-700 rounded-sm md:rounded-md justify-between`}
        >
            <input 
                className="bg-transparent px-3 py-[2px] text-sm outline-none text-gray-200 w-full" 
                type="text" 
                onChange={handleInputChange}
                placeholder="pesquisar..." 
            />
            <button 
                className="flex items-center gap-2 text-slate-200 px-3 py-[2px] transition-colors 
                duration-150 bg-gray-600 hover:bg-gray-700 rounded-e-sm md:rounded-e-md"
            >
                <SearchIcon size={20}/>
            </button>
        </div>
    )
}