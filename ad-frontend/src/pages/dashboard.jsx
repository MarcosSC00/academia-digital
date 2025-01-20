import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, } from "recharts"
import { getAlunosAtMonth } from "../services/AlunoServices"
import { useEffect, useState } from "react"
import { CardToHome } from "../components/cardToHome"

export function Dashboard() {
    const [dataMatriculaAlunos, setDataMatriculaAlunos] = useState([])
    useEffect(() => {
        async function getDataAlunos() {
            const dataAlunos = await getAlunosAtMonth()
            setDataMatriculaAlunos(dataAlunos)
        }
        getDataAlunos()
    }, [])

    return (
        <div className="w-full h-full flex flex-col my-5 md:justify-between">
            <div className="w-full flex gap-5 flex-col items-center mb-15 justify-start 
            md:mb-40 md:flex-row">
                <CardToHome name='alunos' />
                <CardToHome name='instrutores' />
                <CardToHome name='turmas' />
            </div>
            <div className="mt-20 md:mt-0">
                <h2 className="text-2xl text-gray-300 font-bold mb-">Alunos Matriculados</h2>
                <ResponsiveContainer width={"100%"} height={200}>
                    <LineChart
                        data={dataMatriculaAlunos}
                        barCategoryGap={'50'}
                        margin={{ left: -40 }}
                    >
                        <Line
                            type="monotone"
                            dataKey="qtd"
                            fill="#8884d8"
                        />
                        <CartesianGrid strokeDasharray="3 3" vertical={false} />
                        <XAxis dataKey="mes" color="#FFFFFF" />
                        <YAxis />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>

    )
}