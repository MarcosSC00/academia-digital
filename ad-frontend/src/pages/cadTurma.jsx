import { useState } from "react"
import { FieldFormModel } from "../components/fieldformmodel"
import { FormModel } from "../components/formmodel"
import { postTurma } from "../api/apiTurmas"
import { formatterInstrutor } from "../services/InstrutorServices"
import { SelectInstrutorWindow } from "../components/selectInstrutorWindow"
import { X } from "lucide-react"
import { toast } from "sonner"
import { useNavigate } from "react-router-dom"

export function CadTurma() {
    const [filteredInstrutores, setFilteredInstrutores] = useState([])
    const [instrutorNameLabel, setInstrutorNameLabel] = useState('')
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        name: '',
        horario: '',
        instrutorCode: '',
        diasSemana: []
    })

    const searchInstrutor = async (inputInstrutor) => {
        try {
            const result = await formatterInstrutor(inputInstrutor)
            setFilteredInstrutores(result)
        } catch (error) {
            console.error('erro ao cadastrar turma: ', error)
        }        
    }

    const newTurma = async (formData) => {
        try {
            const response = await postTurma(formData)
            if(response.status !== 201){
                toast.warning(response.message)
            }else{
                navigate('/turmas')
                toast.success(response.message)
            }
        } catch (error) {
            console.error('falha ao salvar turma: ', error)
            toast.error(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const setInstrutorName = (instrutorCode) => {
        setFormData((prevData) => ({
            ...prevData,
            instrutorCode
        }))
    }

    const handleCheckBoxChange = (event) => {
        const { value, checked } = event.target
        setFormData((prevData) => {
            const diasSemana = checked ? [...prevData.diasSemana, value] :
                prevData.diasSemana.filter((habilidade) => habilidade !== value)
            return { ...prevData, diasSemana }
        })
    }

    const handleRadioChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            horario: e.target.value,
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        newTurma(formData)
    }

    return (
        <FormModel
            title="Cadastrar aula +"
            submit={handleSubmit}
        >
            <FieldFormModel
                label="Aula"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Informe o nome da aula"
                type="text"
                required={true}
            />

            <div className="w-full flex flex-col relative">
                <FieldFormModel
                    label="Instrutor"
                    id="instrutorCode"
                    name="instrutorCode"
                    value={instrutorNameLabel}
                    type="text"
                    onChange={(e) => {
                        setInstrutorNameLabel(e.target.value)
                        searchInstrutor(e.target.value)
                    }
                    }
                    placeholder="Informe o nome do instrutor"
                    required={true}
                />
                {instrutorNameLabel && (
                    <button
                        onClick={() => setInstrutorNameLabel('')}
                        className="flex rounded-full p-1 bg-gray-400 absolute right-2 top-1/2 translate-y-[25%]"
                    >
                        <X size={10} />
                    </button>
                )}
                <div className="w-full max-h-[300px] overflow-y-auto absolute z-20 bottom-0 translate-y-full">
                    {filteredInstrutores ? (
                        filteredInstrutores.map((inst, index) => (
                            <SelectInstrutorWindow
                                imageProfile={inst.imageProfile}
                                name={inst.name}
                                key={index}
                                onClick={() => {
                                    setInstrutorName(inst.codMatricula)
                                    setInstrutorNameLabel(inst.name)
                                    setFilteredInstrutores([])
                                }}
                            />
                        ))
                    ) : ('')}
                </div>
            </div>

            <div className="flex flex-col items-start">
                <span className="font-semibold text-gray-200">Horários:</span>
                <div className="grid grid-cols-2 w-full items-start flex-wrap mt-3">
                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="horario"
                            value="10:00 - 11:00"
                            onChange={handleRadioChange}
                            required={true}
                        />
                        <span className="text-gray-200">10:00 - 11:00</span>
                    </label>

                    <label className="flex items-center space-x-2">
                        <input
                            type="radio"
                            name="horario"
                            value="12:00 - 13:00"
                            onChange={handleRadioChange}
                            required={true}
                        />
                        <span className="text-gray-200">12:00 - 13:00</span>
                    </label>
                </div>

            </div>

            <div className="flex flex-col items-start">
                <span className="font-semibold text-gray-200">Dias da Semana:</span>
                <div className="grid grid-cols-2 w-full items-start flex-wrap mt-3">
                    <FieldFormModel
                        isCheckBox="true"
                        label="Segunda"
                        id="segunda"
                        type="checkbox"
                        value="SEGUNDA"
                        onChange={handleCheckBoxChange}
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Terça"
                        id="terca"
                        type="checkbox"
                        value="TERCA"
                        onChange={handleCheckBoxChange}
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Quarta"
                        id="quarta"
                        type="checkbox"
                        value="QUARTA"
                        onChange={handleCheckBoxChange}
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Quinta"
                        id="quinta"
                        type="checkbox"
                        value="QUINTA"
                        onChange={handleCheckBoxChange}
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Sexta"
                        id="sexta"
                        type="checkbox"
                        value="SEXTA"
                        onChange={handleCheckBoxChange}
                    />
                    <FieldFormModel
                        isCheckBox="true"
                        label="Sábado"
                        id="sabado"
                        type="checkbox"
                        value="SABADO"
                        onChange={handleCheckBoxChange}
                    />
                </div>
            </div>

            <button
                type="submit"
                className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                    text-gray-200 text-[0.85rem] font-bold transition-colors duration-150 hover:bg-gray-200 
                    md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] hover:text-gray-700 tracking-[1.25px] "
            >
                <span>CADASTRAR</span>
            </button>
        </FormModel>
    )
}