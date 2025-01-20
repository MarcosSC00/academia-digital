import { useEffect, useState } from "react"
import { FormatterTurma } from "../services/TurmaServices"
import { addTurma } from "../api/apiAluno"
import { toast } from "sonner"

export function ModalSelectTurma(props) {

    const [turmas, setTurmas] = useState([])

    useEffect(() => {
        const formatedTurmas = async () => {
            const result = await FormatterTurma()
            setTurmas(result)
        }
        formatedTurmas()
    }, [setTurmas])

    async function handleAddTurma(codMatricula, turmaId) {
        try {
            const response = await addTurma(codMatricula, turmaId)
            if(response.status === 422){
                toast.warning(response.message)
            }else{
                toast.success(response.message)
                if(props.updateTurmas){
                    await props.updateTurmas()
                }
            }  
        } catch (error) {
            console.error('error ao adicionar turma: ', error)
            toast.error(error)
        }

    }

    return (
        <div className="max-w-[400px] flex flex-col items-center p-2 bg-gray-700 rounded-md">
            {turmas ? (
                <>
                    <h2 className="text-xl font-bold text-gray-300 mb-4">Selecione uma turma:</h2>
                    {turmas.map((turma) => (
                        <button
                            key={turma.id}
                            onClick={() => handleAddTurma(props.codMatricula, turma.id)}
                            className="flex items-center text-gray-300 border-b border-gray-500 p-1
                            w-full text-xl font-semibold transition-colors duration-150 hover:bg-gray-600
                            justify-between"
                        >
                            <div className="flex flex-col items-start ">
                                <span className="text-xl text-yellow-400">{turma.name}</span>
                                <span className="text-sm text-gray-200">{turma.horario}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                {turma.diasSemana?.map((dia, index) => (
                                    <div className="border-2 border-yellow-400 p-1 rounded-sm" key={index}>
                                        <span className="text-sm flex text-yellow-400 font-bold">{dia.slice(0, 3)}</span>
                                    </div>
                                ))}
                            </div>
                        </button>
                    ))}
                </>
            ) : (
                <span className="text-2xl font-bold text-gray-500">Nenhuma turma disponível</span>
            )}

        </div>
    )
}