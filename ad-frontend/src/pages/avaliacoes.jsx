import { Search } from "../components/search";
import { Plus } from "lucide-react";
import { CardToAvaliation } from "../components/cardtoavaliation";

export function Avaliacoes(props) {

    return (
        <div className="w-full flex flex-col items-center gap:8 md:gap-10">
            <div className="flex flex-col gap-8 md:flex-row w-full items-start justify-between">
                <div className="relative flex items-center gap-5">
                    <h2 className="text-2xl ml-[10px] text-yellow-400 font-semibold">Avaliações de <span className="">{props.name}</span></h2>
                    <span className="w-[3px] absolute left-0 inset-y-0 bg-yellow-400 rounded-md shadow-[4px_0_6px_0_rgba(250,204,21,0.4)]" />

                    <button className="p-1 bg-gray-600 rounded-md text-gray-200 transition-colors duration-150 hover:bg-gray-700">
                        <Plus size={20} />
                    </button>
                </div>
                <Search />
            </div>

            <div className="grid w-full gap-6 my-8 md:grid-cols-2 xl:grid-cols-4">
                <CardToAvaliation />
                <CardToAvaliation />
                <CardToAvaliation />
                <CardToAvaliation />
            </div>

            <button
                className="px-5 py-2 bg-transparent border-2 border-yellow-400 rounded-md
                 text-yellow-400 font-bold transition-colors duration-150
                 hover:bg-yellow-400 hover:text-gray-700"
            >
                <span>Nova avaliação +</span>
            </button>

        </div>
    )
}