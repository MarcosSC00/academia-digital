import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Eye, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import { useState } from 'react'
import { Link } from "react-router-dom";
import { deleteAluno } from "../api/apiAluno";
import { deleteInstruor } from "../api/apiInstrutor";
import { toast } from "sonner";

export function Table(props) {

    const [page, setPage] = useState(1)
    const { data, onDeleteEntity } = props
    const totalPages = Math.ceil((data?.length) / 10)

    const deleteEntity = async (codMatricula) => {
        switch (props.entity) {
            case 'alunos':
                const confirmDeleteAluno = window.confirm('Deseja realmente excluir esse aluno?')
                if (confirmDeleteAluno) {
                    await deleteAluno(codMatricula)
                    toast.success('aluno exluído com sucesso.')
                }
                break
            case 'instrutores':
                const confirmDeleteInstrutor = confirm('Deseja realmente excluir esse instrutor?')
                if (confirmDeleteInstrutor) {
                    await deleteInstruor(codMatricula)
                    toast.success('aluno excluído com sucesso.')
                }
                break
            default:
                null
        }
    }

    function goToNextPage() {
        setPage(page + 1)
    }

    function goToPreviousPage() {
        setPage(page - 1)
    }

    function goToFirstPage() {
        setPage(1)
    }

    function goToLastPage() {
        setPage(totalPages)
    }

    return (
        <div className="w-full border border-gray-700 rounded-[10px] py-2 bg-gray-800 overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b text-xs bg-gray-800 border-gray-700 text-left text-gray-300 uppercase ">
                        <th className="px-4 py-3">Nome</th>
                        <th className="px-4 py-3">Código</th>
                        <th className="px-4 py-3">STATUS</th>
                        <th className="px-2 py-3 text-center w-[100px]">Options</th>
                    </tr>
                </thead>

                <tbody className="bg-gray-800">
                    {props.data?.slice(((page - 1) * 10), page * 10).map((element, index) => (
                        <tr key={index} className="text-gray-400 border-b border-gray-700">
                            <td className="px-4 py-3">
                                <div className="flex items-center text-sm">
                                    <div className="relative hidden mr-3 lg:block">
                                        <img
                                            className="object-cover w-8 h-8 rounded-full"
                                            src={`http://localhost:8080/images/${props.entity}/${element.imageProfile}`}
                                            alt="image profile"
                                        />
                                    </div>
                                    <div>
                                        <p className="font-semibold">{element.name}</p>
                                        <p className="text-xs text-gray-600">{element.dataDeNascimento}</p>
                                    </div>
                                </div>
                            </td>

                            <td className="px-4 py-3 text-sm">{element.codMatricula}</td>
                            <td className="px-4 py-3 text-xs">
                                <span className="px-2 py-1 font-semibold leading-tight text-green-100 bg-green-700 rounded-full">active</span>
                            </td>
                            <td className="px-4 py-3 text-xs">
                                <div className="flex justify-center gap-2">
                                    <Link
                                        to={`/${props.entity}/${element.codMatricula}`}
                                        className="px-2 py-1 transition-colors duration-150 border
                                         border-blue-800 rounded-md text-blue-800 hover:bg-blue-800 hover:text-gray-800"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="hidden md:block font-bold">VER</span>
                                            <Eye className="w-[14px]" />
                                        </div>
                                    </Link>

                                    <button
                                        onClick={() => onDeleteEntity(element.codMatricula)}
                                        className="px-2 py-1 transition-colors duration-150 border
                                         border-red-700 rounded-md text-red-700 hover:bg-red-700 hover:text-gray-800"
                                    >
                                        <div className="flex items-center gap-2">
                                            <span className="hidden md:block font-bold">EXCLUIR</span>
                                            <Trash2 className="w-[14px]" />
                                        </div>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={3} className="text-gray-400">
                            <span className="ml-3">{`página ${page} de ${totalPages}`}</span>
                        </td>
                        <td colSpan={1} className="text-left text-gray-400">
                            <div className="mr-3 flex">
                                <button 
                                    onClick={goToFirstPage}
                                    disabled={page === 1}
                                >
                                    <ChevronsLeft className="w-5" />
                                </button>

                                <button 
                                    onClick={goToPreviousPage}
                                    disabled={page === 1}
                                >
                                    <ChevronLeft className="w-5" />
                                </button>

                                <button 
                                    onClick={goToNextPage}
                                    disabled={page === totalPages}
                                >
                                    <ChevronRight className="w-5" />
                                </button>

                                <button 
                                    onClick={goToLastPage}
                                    disabled={page === totalPages}
                                >
                                    <ChevronsRight className="w-5" />
                                </button>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    )
}