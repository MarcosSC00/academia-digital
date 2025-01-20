import { Table } from "../components/table";
import { Search } from "../components/search";
import { Plus } from "lucide-react";
import { deleteInstruor, getInstrutores } from "../api/apiInstrutor";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./loading";
import { filterIstrutores } from "../services/InstrutorServices";
import { toast } from "sonner";

export function Instrutores() {

    const [instrutores, setInstrutores] = useState([])
    const [isSavedInstrutores, setIsSavedInstrutores] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    useEffect(() => {
        async function loadData() {
            const result = await getInstrutores()
            setInstrutores(result)
            setIsLoadingData(false)
            setIsSavedInstrutores(false)
        }
        loadData()
    }, [isSavedInstrutores, setInstrutores])

    async function handleFilter(instrutorName) {
        const result = await filterIstrutores(instrutorName)
        if (result) {
            setInstrutores(result)
        }
    }

    async function handleDeleteInstrutor(codMatricula) {
        const confirmDeleteInstrutor = confirm('Ao deletar um instrutor a turma que ele ministra também será deletada. Deseja continuar?')
        if (confirmDeleteInstrutor) {
            try {
                const response = await deleteInstruor(codMatricula)
                if (response.status === 200) {
                    toast.success('aluno excluído com sucesso.')
                    setInstrutores((prevInstrutores) => prevInstrutores.filter(inst => inst.codMatricula !== codMatricula))
                } else {
                    toast.warning(response.message)
                }

            } catch (error) {
                console.error()
            }

        }
    }

    return (
        <div className="w-full gap flex flex-col items-center gap-10">
            <div className="flex w-full gap-10 items-center justify-between">
                <div className="flex items-center gap-5 relative">
                    <h2 className="text-2xl ml-[10px] text-[#facc15] font-semibold">Instrutores</h2>
                    <span className="w-[3px] absolute left-0 inset-y-0 bg-[#facc15] rounded-md shadow-[4px_0_6px_0_rgba(250,204,21,0.4)]" />

                    <Link
                        to={'/cadastro-instrutor'}
                        className="p-1 bg-[#facc15] rounded-md text-gray-800 transition-colors duration-150
                        hover:bg-yellow-600"
                    >
                        <Plus size={20} />
                    </Link>
                </div>
                <Search
                    onValorChange={handleFilter}
                />
            </div>

            {isLoadingData ? (
                <Loading />
            ) : (
                instrutores && instrutores.length !== 0 ? (
                    <Table
                        data={instrutores}
                        entity="instrutores"
                        onDeleteEntity={handleDeleteInstrutor}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src="/empty-data2.svg" alt="" width={150} />
                        <span className="text-xl md:text-2xl font-bold text-gray-400">Nenhum instrutor cadastrado.</span>
                    </div>
                )
            )}

            <Link to="/cadastro-instrutor">
                <button
                    className="flex px-3 py-2 gap-2 rounded-sm md:rounded-md items-center bg-transparent 
                    border-2 border-[#facc15] font-bold text-[#facc15] tracking-wider transition-colors
                    duration-150 hover:bg-[#facc15] hover:text-slate-700"
                >
                    Cadastrar Instrutor <span ><Plus size={20} /></span>
                </button>
            </Link>
        </div>
    )
}