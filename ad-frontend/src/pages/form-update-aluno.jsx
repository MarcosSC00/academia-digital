import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getAlunoByCodMatricula, postAluno, updateAluno } from "../api/apiAluno"
import { useEntity } from "../context/EntityContext"
import { FormModel } from "../components/formmodel"
import { FieldFormModel } from "../components/fieldformmodel"
import { toast } from "sonner"

export function FormUpdateAluno() {
    const formData = new FormData()
    const navigate = useNavigate()
    const { alunoCodParam } = useParams()
    const [isLoading, setIsLoading] = useState(false)
    const { entity, setEntity } = useEntity()
    const [alunoData, setAlunoData] = useState({
        name: entity.name,
        sexo: entity.sexo,
        telefone: entity.telefone,
        email: entity.email,
        endereco: entity.endereco,
        dataDeNascimento: entity.dataDeNascimento,
        imageProfile: ''
    })

    const newAluno = async (alunoCodParam, data) => {
        setIsLoading(true)
        try {
            const response = await updateAluno(alunoCodParam, data)
            if (response.status === 200) {
                toast.success(response.message)
                navigate('/alunos')
            } else {
                toast.warning(response.message)
            }
        } catch (error) {
            console.error(`Erro: ${error.message}`)
            toast.error(error.message)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        async function getAlunoToUpdate() {
            const aluno = await getAlunoByCodMatricula(alunoCodParam)
            console.log(aluno)
            if (aluno) {
                setEntity(aluno)
            }
        }
        getAlunoToUpdate()
    }, [alunoCodParam])

    function sendAluno(event) {
        event.preventDefault()
        let inputFile = document.querySelector('#imageProfile')
        if (!inputFile) {
            inputFile = '/profile_default'
        }

        formData.append("alunoToUpdate", new Blob([JSON.stringify(alunoData)], { type: "application/json" }))
        formData.append("file", inputFile.files[0])

        newAluno(alunoCodParam, formData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setAlunoData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        sendAluno(event)
    }

    return (
        entity ? (
            <FormModel title="Cadastrar Aluno +" submit={handleSubmit}>
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
                    value={alunoData.name}
                    onChange={handleChange}
                />


                <FieldFormModel
                    label="Data de nascimento"
                    id="date"
                    name="dataDeNascimento"
                    type="date"
                    value={alunoData.dataDeNascimento}
                    onChange={handleChange}
                />

                <FieldFormModel
                    label="Celular/WathsApp"
                    id="phone"
                    name="telefone"
                    placeholder="(99) 99999-9999"
                    type="text"
                    mi
                    value={alunoData.telefone}
                    onChange={handleChange}
                    minLength={9}
                    maxLength={11}
                />

                <FieldFormModel
                    label="Endereço"
                    id="adress"
                    name="endereco"
                    placeholder="Rua da Gaveta, Centro"
                    type="text"
                    value={alunoData.endereco}
                    onChange={handleChange}
                />

                <FieldFormModel
                    label="Email"
                    id="email"
                    name="email"
                    placeholder="user@gmail.com"
                    type="email"
                    value={alunoData.email}
                    onChange={handleChange}
                />

                <div className="flex flex-col items-start">
                    <label htmlFor="sexo" className="font-semibold text-gray-200">Sexo:</label>
                    <select
                        name="sexo"
                        id="sexo"
                        className="w-full outline-none px-1 py-2 bg-transparent border border-gray-600 text-gray-200"
                        value={alunoData.sexo}
                        onChange={handleChange}
                    >
                        <option value="" className='bg-gray-600'>Selecione</option>
                        <option value="MASCULINO" className='bg-gray-600'>Masculino</option>
                        <option value="FEMININO" className='bg-gray-600'>Feminino</option>
                    </select>
                </div>

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
            <span className="text-2xl font-bold text-gray-400">Aluno não encontrado.</span>
        )
    )
}