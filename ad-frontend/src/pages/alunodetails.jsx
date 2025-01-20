import { ArrowBigRight, Cake, Mail, PenBox, Phone, Plus, Trash2 } from "lucide-react";
import { CardToClass } from "../components/cardtoclass";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteAluno, getAlunoByCodMatricula, getTurmasAluno, removeAvaliation, removeTurma } from "../api/apiAluno";
import { useEntity } from "../context/EntityContext";
import { CardToAvaliation } from "../components/cardtoavaliation";
import { getDate } from "../services/AlunoServices";
import { toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import * as Visibility from "@radix-ui/react-visually-hidden";
import { ModalSelectTurma } from "../components/modal-select-turma";

export function AlunoDetails() {

    const { entity, setEntity } = useEntity()
    const [turmas, setTurmas] = useState([])
    const { alunoCodParam } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        async function loadData() {
            const result = await getAlunoByCodMatricula(alunoCodParam)
            console.log(result)
            const turmasAluno = await getTurmasAluno(alunoCodParam)
            if (turmasAluno) {
                setTurmas(turmasAluno)
            }
            setEntity(result)
        }
        loadData()
    }, [alunoCodParam, setEntity])

    console.log(entity)
    const result = (avaliation) => {
        let resultData = avaliation?.resultado

        if (resultData) {

            let resultString = resultData.replace(/=/g, ':');
            resultString = resultString.replace(/(\w+):/g, '"$1":')
            let obj = JSON.parse(resultString)
            return obj
        }
    }

    async function handleDeleteAluno(codMatricula) {
        const confirm = window.confirm('Deseja realmente excluir este aluno?')
        if (confirm) {
            try {
                await deleteAluno(codMatricula)
                toast.success('Aluno deletado com sucesso.')
                navigate('/alunos')
            } catch (error) {
                console.error('erro ao deletar aluno: ', error)
                toast.error(error.message)
            }
        }

    }

    const dateAvaliation = (avaliacao) => {
        const dateAvaliationAluno = getDate(avaliacao.dataAvaliacao)
        return dateAvaliationAluno
    }

    const updateTurmas = async () => {
        const updatedTurmas = await getTurmasAluno(alunoCodParam)
        setTurmas(updatedTurmas)
    }

    async function handleRemoveTurma(codMatricula, turmaId) {
        const confirm = window.confirm('Deseja realmente remover essa turma?')
        if (confirm) {
            try {
                const response = await removeTurma(codMatricula, turmaId)
                if (response.status !== 200) {
                    toast.warning(response.message)
                } else {
                    const updateTurmas = await getTurmasAluno(alunoCodParam)
                    toast.success(response.message)
                    setTurmas(updateTurmas)
                }
            } catch (error) {
                console.error('erro ao remover turma: ', error)
            }
        }
    }

    async function handleRemoveAvaliation(codMatricula, avaliacaoId) {
        const confirm = window.confirm('Deseja realmente remover essa avaliação?')
        if (confirm) {
            try {
                const response = await removeAvaliation(codMatricula, avaliacaoId)
                if (response.status !== 200) {
                    toast.warning(response.message)
                } else {
                    const alunoUpdated = await getAlunoByCodMatricula(alunoCodParam)
                    setEntity(alunoUpdated)
                    toast.success(response.message)
                }

            } catch (error) {

            }
        }
    }

    return (
        <>
            {entity ? (
                <div className="w-full " >
                    <div className="w-full flex items-center justify-between mb-10">
                        <div className="flex items-center">
                            <div className="relative w-[60px]">
                                <img src={`http://localhost:8080/images/alunos/${entity.imageProfile}`} alt="" className="object-cover" />
                                <span className="w-[20px] h-[20px] rounded-full bg-[#3CE711] border-2 border-gray-800 
                                    absolute right-0 b-0 translate-x-1 -translate-y-[100%]" />
                            </div>
                            <div className="flex flex-col ml-5 justify-start">
                                <h2 className="text-xl text-gray-200 font-semibold">{entity.name}</h2>
                                <span className="text-sm text-gray-400 font-normal">{entity.codMatricula}</span>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link to={`/alunos/update/${entity.codMatricula}`}>
                                <button
                                    className="flex items-center text-[#401BE3] border-2 border-[#401BE3] rounded-md md:px-4 
                                    px-2 py-1 gap-2 transition-colors duration-150 hover:bg-[#401BE3] hover:text-gray-200"
                                >
                                    <span className="hidden md:block font-bold text-sm">EDITAR</span>
                                    <PenBox size={20} />
                                </button>
                            </Link>

                            <button
                                onClick={() => handleDeleteAluno(entity.codMatricula)}
                                className="flex items-center text-[#BE0D0D] border-2 border-[#BE0D0D] rounded-md md:px-4 
                                px-2 py-1 gap-2 transition-colors duration-150 hover:bg-[#BE0D0D] hover:text-gray-200"
                            >
                                <span className="hidden md:block font-bold text-sm">EXCLUIR</span>
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-row w-full flex-wrap gap-5 pb-3 border-b-2 border-gray-500">
                        <div className="flex flex-row gap-2 items-center">
                            <Mail className="text-[#C6E000]" size={20} />
                            <span className="text-sm text-gray-400 font-normal">{entity.email}</span>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <Cake className="text-[#C6E000]" size={20} />
                            <span className="text-sm text-gray-400 font-normal">{entity.dataDeNascimento}</span>
                        </div>

                        <div className="flex flex-row gap-2 items-center">
                            <Phone className="text-[#C6E000]" size={20} />
                            <span className="text-sm text-gray-400 font-normal">{entity.telefone}</span>
                        </div>
                    </div>

                    <div
                        className="w-full mt-10 p-5 rounded-md md:rounded-lg border border-gray-400/60
                        [box-shadow:0_0_6px_1px_rgba(0,0,0,0.4)]"
                    >
                        <div className="flex items-center justify-start gap-5">
                            <h2 className="text-yellow-400 text-lg font-medium">TURMAS</h2>
                            <Dialog.Trigger
                                className="p-1 bg-yellow-400 rounded-md text-gray-700 transition-colors duration-150
                              hover:bg-gray-600 hover:text-gray-200"
                            >
                                <Plus size={20} />
                            </Dialog.Trigger>
                            <Dialog.Portal>
                                <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                                <Dialog.Content className="absolute w-full top-1/2 left-full -translate-x-[75%] -translate-y-[75%]">
                                    <Visibility.Root>
                                        <Dialog.Title />
                                        <Dialog.Description />
                                    </Visibility.Root>
                                    <Dialog.Close>
                                        <ModalSelectTurma
                                            codMatricula={entity.codMatricula}
                                            updateTurmas={updateTurmas}
                                        />
                                    </Dialog.Close>
                                </Dialog.Content>
                            </Dialog.Portal>
                        </div>
                        {turmas ? (
                            <div
                                key={entity.codMatricula}
                                className="grid w-full gap-6 my-4 md:grid-cols-2 xl:grid-cols-4"
                            >
                                {turmas.map((turma) => (
                                    <CardToClass
                                        key={turma.name}
                                        nameClass={turma.name}
                                        horario={turma.horario}
                                        diasSemana={turma.diasSemana}
                                        turmaId={turma.id}
                                        onClick={() => handleRemoveTurma(entity.codMatricula, turma.id)}
                                    />
                                ))}

                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-5 mt-5">
                                <span className="text-gray-400 font-semibold">Nenhuma turma encontrada.</span>

                                <Dialog.Trigger
                                    className="flex px-3 py-2 gap-2 rounded-sm md:rounded-md items-center bg-transparent 
                                    border-2 border-gray-400 font-bold text-gray-200 tracking-wider transition-colors
                                    duration-150 hover:bg-gray-400 hover:text-gray-800 capitalize"
                                >
                                    Adicionar turma <span ><Plus size={20} /></span>
                                </Dialog.Trigger>
                                <Dialog.Portal>
                                    <Dialog.Overlay className="fixed inset-0 bg-black/40" />
                                    <Dialog.Content className="absolute w-full top-1/2 left-full -translate-x-[75%] -translate-y-[75%]">
                                        <Visibility.Root>
                                            <Dialog.Title />
                                            <Dialog.Description />
                                        </Visibility.Root>
                                        <ModalSelectTurma
                                            codMatricula={entity.codMatricula}
                                        />
                                    </Dialog.Content>
                                </Dialog.Portal>
                            </div>
                        )}
                    </div>

                    <div
                        className="w-full mt-10 p-5 rounded-md md:rounded-lg border border-gray-400/60
                        [box-shadow:0_0_6px_1px_rgba(0,0,0,0.4)]"
                    >

                        <div className="flex items-center justify-start gap-5">
                            <h2 className="text-yellow-400 text-lg font-medium">Avaliações</h2>
                            <Link
                                to={`/alunos/${alunoCodParam}/adicionar-avaliacao`}
                                className="p-1 bg-yellow-400 rounded-md text-gray-700 transition-colors duration-150
                              hover:bg-gray-600 hover:text-gray-200"
                            >
                                <Plus size={20} />
                            </Link>
                        </div>

                        {entity.avaliacoes && entity.avaliacoes.length !== 0 ? (
                            <div className="grid w-full gap-6 my-4 md:grid-cols-2 xl:grid-cols-4">
                                {entity.avaliacoes.map((av) => {
                                    const resultadoAvaliacao = result(av);
                                    const dateAtAvaliation = dateAvaliation(av);

                                    return (
                                        <CardToAvaliation
                                            day={dateAtAvaliation?.day}
                                            mounth={dateAtAvaliation?.month}
                                            weight={av.peso}
                                            height={av.altura}
                                            imc={resultadoAvaliacao?.imc}
                                            pgc={resultadoAvaliacao?.pgc}
                                            key={av.id}
                                            onClick={() => handleRemoveAvaliation(alunoCodParam, av.id)}
                                        />)
                                })}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center gap-5 mt-5">
                                <span className="text-gray-400 font-semibold">Nenhuma avaliação encontrada.</span>
                                <Link to={`/alunos/${entity.codMatricula}/adicionar-avaliacao`}>
                                    <button
                                        className="flex px-3 py-2 gap-2 rounded-sm md:rounded-md items-center bg-transparent 
                                        border-2 border-gray-400 font-bold text-gray-200 tracking-wider transition-colors
                                        duration-150 hover:bg-gray-400 hover:text-slate-700 capitalize"
                                    >
                                        Criar avaliação <span ><Plus size={20} /></span>
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <span className="text-2xl font-bold text-gray-400 mx-auto">Aluno não encontrado.</span>
            )}

        </>
    )
}