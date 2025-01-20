import { getTurmas } from "../api/apiTurmas"

export async function FormatterTurma() {
    try {
            const turmas = await getTurmas()
            if (turmas) {
                const formattedTurmas = turmas?.map((i) => {
                    return (({ id, name, diasSemana, horario }) => ({ id, name, diasSemana, horario }))(i)
                })
                return formattedTurmas
            }
        } catch (error) {
            console.error('erro na requisição: ', error)
        }
}

export async function filterTurmas(turmaName) {

    try {
        const turma = await getTurmas()
        if (!turma) {
            throw new Error("Nenhum turma encontrada.")
        }

        const filterResult = turma.filter(instrutor => instrutor.name.toLowerCase().includes(turmaName.toLowerCase()))
        return filterResult
    } catch (error) {
        console.log('Erro: ' + error)
        throw new Error(error)
    }
}