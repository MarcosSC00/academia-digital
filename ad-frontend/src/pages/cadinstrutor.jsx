import { useState } from "react";
import { FieldFormModel } from "../components/fieldformmodel"
import { FormModel } from "../components/formmodel"
import { postInstrutor } from "../api/apiInstrutor";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export function CadInstrutor() {

    const navigate = useNavigate()
    const formData = new FormData()
    const [instrutorData, setInstrutorData] = useState({
        name: '',
        telefone: '',
        email: '',
        especialidades: [],
        imageProfile: ''
    })

    const newInstrutor = async (data) => {
        try {
            await postInstrutor(data)
            toast.success('Instrutor salvo com sucesso.')
            navigate('/instrutores')
        } catch (error) {
            console.error(`erro ao cadastrar instrutor: ${error.message}`)
            toast.error(error.message)
        }
    }

    function sendInstrutor(event) {
        event.preventDefault()
        let inputFile = document.querySelector('#imageProfile')
        if (!inputFile) {
            inputFile = '/procfile_default'
        }

        formData.append("instrutor", new Blob([JSON.stringify(instrutorData)], { type: "application/json" }))
        formData.append("file", inputFile.files[0])

        newInstrutor(formData)
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setInstrutorData((prevData) => ({
            ...prevData,
            [name]: value
        }))

    }

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.target

        setInstrutorData((prevState) => {
            const especialidades = prevState.especialidades

            if (checked) {
                return {
                    ...prevState,
                    especialidades: [...especialidades, value]
                }
            } else {
                return {
                    ...prevState,
                    especialidades: especialidades.filter((habilidade) => habilidade != value)
                }
            }
        })
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        sendInstrutor(event)
        setInstrutorData({
            name: '',
            telefone: '',
            email: '',
            imageProfile: '',
            especialidades: []
        })

        const inputFile = document.querySelector('#imageProfile');
        if (inputFile) inputFile.value = '';
    }

    return (
        <FormModel title="Cadastrar Instrutor +" submit={handleSubmit}>

            <div className="col-span-full items-start">
                <label
                    htmlFor="immageProfile"
                    className='cursor-pointer'
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
                    value={instrutorData.imageProfile}
                    className='flex text-gray-400 text-sm'
                    onChange={handleChange}
                    required={false}
                />
            </div>

            <FieldFormModel
                label="Nome"
                id="name"
                name="name"
                value={instrutorData.name}
                onChange={handleChange}
                placeholder="Informe o nome do instrutor"
                type="text"
            />

            <FieldFormModel
                label="Celular/WathsApp"
                id="telefone"
                name="telefone"
                value={instrutorData.telefone}
                onChange={handleChange}
                placeholder="(99) 99999-9999"
                type="text"
            />
            <FieldFormModel
                label="Email"
                id="email"
                name="email"
                value={instrutorData.email}
                onChange={handleChange}
                placeholder="informe um email"
                type="email"
            />
            <div className="flex flex-col items-start ">
                <h2 className="text-gray-200 mb-3 font-semibold">especialidades:</h2>
                <div className="grid grid-cols-2 w-full items-start flex-wrap max-h-[100px]">
                    <FieldFormModel
                        isCheckBox="true"
                        label="Pilates"
                        id="pilates"
                        value="Pilates"
                        onChange={handleCheckBoxChange}
                        type="checkbox"
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="CrossFit"
                        id="crossfit"
                        value="Crossfit"
                        onChange={handleCheckBoxChange}
                        type="checkbox"
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Yoga"
                        id="yoga"
                        value="Yoga"
                        onChange={handleCheckBoxChange}
                        type="checkbox"
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Cardio"
                        id="cardio"
                        value="Cardio"
                        onChange={handleCheckBoxChange}
                        type="checkbox"
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Zumba"
                        id="zumba"
                        value="Zumba"
                        onChange={handleCheckBoxChange}
                        type="checkbox"
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                    text-gray-200 font-bold transition-colors duration-150 hover:bg-gray-200 
                    md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] hover:text-gray-700 tracking-[1.25px] "
            >
                <span>ENVIAR</span>
            </button>
        </FormModel>
    )
}