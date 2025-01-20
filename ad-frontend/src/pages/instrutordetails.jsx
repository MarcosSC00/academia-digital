import { Mail, PenBox, Phone, Plus, Trash2 } from "lucide-react";
import { CardToClass } from "../components/cardtoclass";
import { useEffect, useState } from "react";
import { deleteInstruor, getInstrutorByCodMatricula, getTurmas, removeTurma } from "../api/apiInstrutor";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEntity } from "../context/EntityContext";
import { Loading } from "./loading";
import { toast } from "sonner";

export function InstrutorDetails() {

    const { entity, setEntity } = useEntity()
    const [turmas, setTurmas] = useState([])
    const { instrutorCodParam } = useParams()
    const [isloading, setIsLoading] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        async function loadData() {
            setIsLoading(true)
            const data = await getInstrutorByCodMatricula(instrutorCodParam)
            const instrutorTurmas = await getTurmas(instrutorCodParam)
            setEntity(data)
            if (instrutorTurmas) {
                setTurmas(instrutorTurmas)
            }
            setIsLoading(false)
        }
        loadData()
    }, [instrutorCodParam, setEntity])

    async function handleDeleteInstrutor() {
        const confirm = window.confirm('Remover o instrutor tambem removerá as turmas que ele ministra. Deseja continuar?')
        if (confirm) {
            try {
                const response = await deleteInstruor(instrutorCodParam)
                if (response.status === 200) {
                    toast.success(response.message)
                    navigate('/instrutores')
                } else {
                    toast.warning(response.message)
                }

            } catch (error) {
                toast(error.message)
                console.error(error)
            }
        }
    }

    return (
        <>
            {entity ? (
                isloading ? (
                    <Loading />
                ) : (
                    <div className="container">
                        <div className="w-full flex items-center justify-between mb-10">
                            <div className="flex items-center">
                                <div className="relative">
                                    <img
                                        src={`http://localhost:8080/images/instrutores/${entity.imageProfile}`}
                                        alt=""
                                        className="object-cover w-[60px] h-[60px] rounded-full"
                                    />
                                    <span className="w-[20px] h-[20px] rounded-full bg-[#3CE711] border-2 border-gray-800 absolute right-0 b-0 translate-x-1 -translate-y-[100%]" />
                                </div>
                                <div className="flex flex-col ml-5 justify-start">
                                    <h2 className="text-xl text-gray-200 font-semibold">{entity.name}</h2>
                                    <span className="text-sm text-gray-400 font-normal">{entity.codMatricula}</span>
                                    <div className="flex items-center justify-start max-w-[200px] flex-wrap">
                                        {entity.especialidades?.map((hab, index) => (
                                            <span
                                                key={index}
                                                className="text-sm text-gray-400 font-semibold uppercase"
                                            >
                                                {hab}
                                                <span className="text-gray-400 mx-2">|</span>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <Link
                                    to={`/instrutores/update/${instrutorCodParam}`}
                                    className="flex items-center text-[#401BE3] border-2 border-[#401BE3] rounded-md
                                    px-2 md:px-4 py-1 gap-2 transition-colors duration-150 hover:bg-[#401BE3] 
                                    hover:text-gray-200"
                                >
                                    <span className="hidden md:block font-bold text-sm">EDITAR</span>
                                    <PenBox size={20} />
                                </Link>

                                <button
                                    onClick={handleDeleteInstrutor}
                                    className="flex items-center text-[#BE0D0D] border-2 border-[#BE0D0D] rounded-md px-2
                                    md:px-4 py-1 gap-2 transition-colors duration-150 hover:bg-[#BE0D0D]
                                    hover:text-gray-200"
                                >
                                    <span className="hidden md:block font-bold text-sm">EXCLUIR</span>
                                    <Trash2 />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row w-full flex-wrap gap-5 pb-3 border-b-2 border-gray-500">
                            <div className="flex flex-row gap-2 items-center">
                                <Mail className="text-[#C6E000]" size={20} />
                                <span className="text-sm text-gray-400 font-normal">{entity.email}</span>
                            </div>

                            <div className="flex flex-row gap-2 items-center">
                                <Phone className="text-[#C6E000]" size={20} />
                                <span className="text-sm text-gray-400 font-normal">{entity.telefone}</span>
                            </div>
                        </div>

                        <div className="w-full mt-10">
                            <h2 className="text-yellow-400 text-lg font-medium">TURMAS</h2>
                            {turmas && turmas.length > 0 ? (
                                <div className="grid w-full gap-6 my-4 md:grid-cols-2 xl:grid-cols-4">
                                    {turmas.map((turma) => (
                                        <CardToClass
                                            key={turma.id}
                                            nameClass={turma.name}
                                            turmaId={turma.id}
                                            codMatricula={entity.codMatricula}
                                            horario={turma.horario}
                                            diasSemana={turma.diasSemana?.map(d => d.slice(0, 3))}
                                            hiddenBtnRemove={true}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center gap-5 mt-5">
                                    <span className="text-xl md:text-2xl text-gray-400 font-semibold">Nenhuma turma encontrada.</span>
                                </div>
                            )}

                        </div>
                    </div>
                )

            ) : (
                <span className="text-2xl font-bold text-gray-400">Instrutor não encontrado.</span>
            )}
        </>

    )
}