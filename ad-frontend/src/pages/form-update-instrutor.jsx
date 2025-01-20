import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useEntity } from "../context/EntityContext"
import { FormModel } from "../components/formmodel"
import { FieldFormModel } from "../components/fieldformmodel"
import { toast } from "sonner"
import { getInstrutorByCodMatricula, updateInstrutor } from "../api/apiInstrutor"

export function FormUpdateInstrutor() {
    const formData = new FormData()
    const navigate = useNavigate()
    const { instrutorCodParam } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const { entity, setEntity } = useEntity()
    const [instrutorData, setInstrutorData] = useState({
        name: entity.name,
        telefone: entity.telefone,
        email: entity.email,
        especialidades: entity.especialidades,
        dataDeNascimento: entity.dataDeNascimento,
        imageProfile: ''
    })

    const newAluno = async (instrutorCodParam, data) => {
        setIsLoading(true)
        try {
            const response = await updateInstrutor(instrutorCodParam, data)
            if (response.status === 200) {
                toast.success(response.message)
                navigate('/instrutores')
            } else {
                response.message?.map(msm => 
                    toast.warning(msm)
                )
            }
        } catch (error) {
            console.error(`Erro: ${error.message}`)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getInstrutorToUpdate() {
            const instrutor = await getInstrutorByCodMatricula(instrutorCodParam)
            if (instrutor) {
                setEntity(instrutor)
            }
        }
        getInstrutorToUpdate()
    }, [instrutorCodParam])

    function sendInstrutor(event) {
        event.preventDefault()
        let inputFile = document.querySelector('#imageProfile')
        if (!inputFile) {
            inputFile = '/profile_default'
        }

        formData.append("instrutorToUpdate", new Blob([JSON.stringify(instrutorData)], { type: "application/json" }))
        formData.append("file", inputFile.files[0])

        newAluno(instrutorCodParam, formData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setInstrutorData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        sendInstrutor(event)
    }

    return (
        entity ? (
            <FormModel title="Atualizar Instrutor" submit={handleSubmit}>
                <div className="col-span-full items-start">
                    <label
                        htmlFor="imageProfile"
                        className='flex w-fit cursor-pointer'
                    >
                        <img
                            src="/procfile_default.png"
                            alt=""
                            className='w-[100px] object-cover'
                        />
                    </label>
                    <input
                        id='imageProfile'
                        name='imageProfile'
                        type="file"
                        className='text-gray-400 text-sm'
                        onChange={handleChange}
                        required={false}
                    />
                </div>
                <FieldFormModel
                    label="Nome"
                    id="name"
                    name="name"
                    placeholder="insira seu nome"
                    type="text"
                    value={instrutorData.name}
                    onChange={handleChange}
                />

                <FieldFormModel
                    label="Celular/WathsApp"
                    id="phone"
                    name="telefone"
                    placeholder="(99) 99999-9999"
                    type="text"
                    value={instrutorData.telefone}
                    onChange={handleChange}
                    minLength={9}
                    maxLength={11}
                />

                <FieldFormModel
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="user@gmail.com"
                    type="email"
                    value={instrutorData.email}
                    onChange={handleChange}
                />

                {isLoading === true ? (
                    <button
                        type="submit"
                        disabled={true}
                        className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                        text-gray-200 font-bold md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] 
                        tracking-[1.25px]"
                    >
                        <span>ENVIANDO...</span>
                    </button>
                ) : (
                    <button
                        type="submit"
                        className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                        text-gray-200 font-bold transition-colors duration-150 hover:bg-gray-200 
                        md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] hover:text-gray-700 tracking-[1.25px] "
                    >
                        <span>ATUALIZAR</span>
                    </button>
                )}

            </FormModel>
        ) : (
            <span className="text-2xl font-bold text-gray-400">Instrutor não encontrado.</span>
        )
    )
}