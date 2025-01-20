import { useEffect, useState } from "react";
import { FieldFormModel } from "../components/fieldformmodel";
import { FormModel } from "../components/formmodel";
import { addAvaliacao, getAlunoByCodMatricula } from "../api/apiAluno";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

export function CadAvaliation() {
    const [isLoading, setIsLoading] = useState(false)
    const { alunoCodParam } = useParams()
    const [currentAluno, setCurrentAluno] = useState(null)
    const navigate = useNavigate()
    const [avaliacao, setAvaliacao] = useState({
        peso: 0.00,
        altura: 0.00
    })

    useEffect(() => {
        async function getCurrentAluno() {
            const aluno = await getAlunoByCodMatricula(alunoCodParam)
            setCurrentAluno(aluno)
        }
        getCurrentAluno()
    }, [alunoCodParam])

    async function loadData() {
        setIsLoading(true)
        try {
            const data = await addAvaliacao(alunoCodParam, avaliacao)
            if (data.status !== 200) {
                console.error(data.message)
                toast.warning(data.message)
            } else {
                toast.success(data.message)
                navigate(`/alunos/${alunoCodParam}`)
            }
        } catch (error) {
            alert('Erro na requisição: ', error.message)
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target

        setAvaliacao((prevData) => ({
            ...prevData,
            [name]: value
        }))
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        loadData()
        setAvaliacao({
            peso: 0.00,
            altura: 0.00
        })
    }

    return (
        <>
            {currentAluno ? (
                <div>
                    <h2 className="text-2xl font-bold text-gray-200 mb-5">
                        Avaliando <span className="[-webkit-text-fill-color:transparent] 
                        [-webkit-text-stroke:1px] [-webkit-text-stroke-color:#e5e7eB]">{currentAluno.name}</span>
                    </h2>
                    <FormModel submit={handleSubmit}>
                        <FieldFormModel
                            label="Peso"
                            id="peso"
                            name="peso"
                            value={avaliacao.peso}
                            placeholder="Informe o peso do aluno"
                            type="number"
                            step={0.01}
                            onChange={handleChange}
                            required={true}
                        />
                        <FieldFormModel
                            label="Altura (cm)"
                            id="altura"
                            name="altura"
                            value={avaliacao.altura}
                            placeholder="Informe o altura do aluno"
                            type="number"
                            step={0.01}
                            onChange={handleChange}
                            required={true}
                        />

                        {isLoading === true ? (
                            <button
                                type="submit"
                                disabled={true}
                                className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                        text-gray-200 font-bold md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] 
                        tracking-[1.25px]"
                            >
                                <span>AVALIANDO...</span>
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="w-full md:w-auto px-10 py-2 bg-transparent border-2 border-gray-200 rounded-md
                        text-gray-200 font-bold transition-colors duration-150 hover:bg-gray-200 
                        md:absolute md:right-1/2 md:translate-x-1/2 md:-bottom-[50px] hover:text-gray-700 tracking-[1.25px] "
                            >
                                <span>AVALIAR</span>
                            </button>
                        )}
                    </FormModel>
                </div>
            ) : (
                <p>not found</p>
            )}
        </>

    )
}