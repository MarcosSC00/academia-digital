import { Table } from "../components/table";
import { Search } from "../components/search";
import { Plus } from "lucide-react";
import { deleteAluno, getAlunos } from "../api/apiAluno";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Loading } from "./loading";
import { filterAlunos } from "../services/AlunoServices";
import { toast } from "sonner";

export function Alunos() {
    const [alunos, setAlunos] = useState([])
    const [isSalvedAluno, setIsSavedAluno] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    useEffect(() => {
        async function loadData() {
            const result = await getAlunos()
            setAlunos(result)
            setIsLoadingData(false)
            setIsSavedAluno(false)
        }
        loadData()
    }, [isSalvedAluno, setAlunos])

    async function handleFilterAlunos(alunoName) {
        const resultFilter = await filterAlunos(alunoName)
        if (resultFilter) {
            setAlunos(resultFilter)
        }
    }

    async function handleDeleteAluno(codMatricula) {
        const confirmDeleteAluno = window.confirm('Deseja realmente excluir esse aluno?')
        if (confirmDeleteAluno) {
            try {
                const response = await deleteAluno(codMatricula)
                if (response.status === 200) {
                    toast.success(response.message)
                    setAlunos((prevAlunos) => prevAlunos.filter(alunos => alunos.codMatricula !== codMatricula))
                } else {
                    toast.warning(response.message)
                }
            } catch (error) {
                console.error(error)
            }

        }
    }

    return (
        <div className="w-full flex flex-col items-center gap-10">
            <div className="flex gap-10 w-full items-center justify-between">
                <div className="relative flex items-center gap-5">
                    <h2 className="text-2xl ml-[10px] text-[#facc15] font-semibold">Alunos</h2>
                    <span className="w-[3px] absolute left-0 inset-y-0 bg-[#facc15] rounded-md 
                    shadow-[4px_0_6px_0_rgba(250,204,21,0.4)]" />

                    <Link
                        to={'/cadastro-aluno'}
                        className="p-1 bg-[#facc15] rounded-md text-gray-800 transition-colors duration-150
                        hover:bg-yellow-600"
                    >
                        <Plus size={20} />
                    </Link>
                </div>
                <Search
                    onValorChange={handleFilterAlunos}
                />
            </div>

            {isLoadingData ? (
                <Loading />
            ) : (
                alunos && alunos.length !== 0 ? (
                    <Table
                        data={alunos}
                        entity="alunos"
                        onDeleteEntity={handleDeleteAluno}
                    />
                ) : (
                    <div className="w-full flex flex-col items-center justify-center">
                        <img src="/empty-data2.svg" alt="" width={150} />
                        <span className="text-xl md:text-2xl font-bold text-gray-400">Nenhum aluno cadastrado.</span>
                    </div>
                )
            )}

            <Link to="/cadastro-aluno">
                <button
                    className="flex px-3 py-2 gap-2 rounded-sm md:rounded-md items-center bg-transparent 
                    border-2 border-[#facc15] font-bold text-[#facc15] tracking-wider transition-colors
                    duration-150 hover:bg-[#facc15] hover:text-slate-700"
                >
                    Cadastrar Aluno <span ><Plus size={20} /></span>
                </button>
            </Link>
        </div>
    )
}