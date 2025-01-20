import { Search } from "../components/search";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { deleteTurma, getInstrutorByTurma, getTurmas } from "../api/apiTurmas";
import { Link } from "react-router-dom";
import { CardToClass } from "../components/cardtoclass";
import { Loading } from "./loading";
import { toast } from "sonner";
import { filterTurmas } from "../services/TurmaServices";

export function Turmas() {

    const [turmas, setTurmas] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)
            const result = await getTurmas()
            setTurmas(result)
            setIsLoading(false)
        }
        loadData()
    }, [setTurmas])

    const handleDeleteTurma = async (turmaId) => {
        const confirm = window.confirm('Deseja realmente excluir essa turma?')
        if (confirm) {
            try {
                const response = await deleteTurma(turmaId)
                if (response.status !== 200) {
                    toast.warning(response.message)
                    console.error(response.data)
                } else {
                    toast.success(response.message)
                    setTurmas((prevTurmas) =>
                        prevTurmas.filter(turma => turma.id !== turmaId))
                }
            } catch (error) {
                toast.warning(error.message)
                console.error(error)
            }
        }

    }

    async function handleFilter(turmaName) {
        const result = await filterTurmas(turmaName)
        if (result) {
            setTurmas(result)
        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-10" >
            <div className="flex  w-full items-center justify-between">
                <div className="flex items-center gap-5 relative">
                    <h2 className="text-2xl ml-[10px] text-[#facc15] font-semibold">Turmas</h2>
                    <span
                        className="w-[3px] absolute left-0 inset-y-0 bg-[#facc15] rounded-md 
                            shadow-[4px_0_6px_0_rgba(250,204,21,0.4)]"
                    />

                    <Link to="/cadastro-turma">
                        <button className="p-1 bg-[#facc15] rounded-md text-gray-800 transition-colors duration-150
                    hover:bg-yellow-600">
                            <Plus size={20} />
                        </button>
                    </Link>
                </div>
                <Search
                    onValorChange={handleFilter}
                />
            </div>

            {isLoading ? (
                <Loading />
            ) : (
                turmas && turmas.length !== 0 ? (
                    <div className="grid w-full gap-6 my-4 md:grid-cols-2 xl:grid-cols-4">
                        {turmas.map((turma) => {
                            return (
                                < CardToClass
                                    nameClass={turma.name}
                                    horario={turma.horario}
                                    diasSemana={turma.diasSemana.map(d => d.slice(0, 3))}
                                    turmaId={turma.id}
                                    onClick={() => handleDeleteTurma(turma.id)}
                                    key={turma.id}
                                />
                            )
                        })}
                    </div>

                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src="/empty-data2.svg" alt="" width={150} />
                        <span className="text-xl md:text-2xl font-bold text-gray-400">Nenhuma turma cadastrada.</span>
                    </div>
                )
            )}

            <Link to="/cadastro-turma">
                <button
                    className="flex px-3 py-2 gap-2 rounded-sm md:rounded-md items-center bg-transparent 
                    border-2 border-[#facc15] font-bold text-[#facc15] tracking-wider transition-colors
                    duration-150 hover:bg-[#facc15] hover:text-slate-700 capitalize"
                >
                    Cadastrar turma <span ><Plus size={20} /></span>
                </button>
            </Link>

        </div>
    )
}