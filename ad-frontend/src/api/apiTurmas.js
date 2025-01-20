import { handleErrorResponse } from "../services/HandleErrorResponse"

const URL = 'http://localhost:8080/turmas'

//GET ALL
export async function getTurmas() {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro ao buscar dados: ` + error)
    }
}

//GET TURMA BY ID
export async function getTurmaById(turmaId) {
    try {
        const response = await fetch(`${URL}/tumaId=${turmaId}`)
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro ao buscar dados: ` + error)
    }
}

//CREATE TURMA
export async function postTurma(turma) {
    try {
        const response = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(turma)
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        } else {
            return { message: 'Turma salva com sucesso!', data: response, status: response.status }
        }
    } catch (error) {
        console.error(`Erro ao criar turma: ` + error.message)
        throw error
    }
}

//UPDATE TURMA
export async function updateTurma(turmaId, newTurma) {
    try {
        const response = await fetch(`${URL}/turmaId=${turmaId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTurma)
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        return {message:'Turma atualizada com sucesso!', data:response}
    } catch (error) {
        console.error('Erro: ' + error.message)
    }
}

//DELETE TURMA
export async function deleteTurma(turmaId) {
    try {
        const response = await fetch(`${URL}/${turmaId}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return {message: 'Turma deeltada com sucesso!', status: response.status, data: response}
    } catch (error) {
        console.error(`Erro ao deletar turma: ` + error)
    }
}

//GET ALUNOS
export async function getAlunosByTurma(turmaId) {
    try {
        const response = await fetch(`${URL}/${turmaId}/buscar-alunos`)
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error(`Erro ao buscar dados: ` + error)
    }
}

//GET INSTRUTOR
export async function getInstrutorByTurma(turmaId) {
    try {
        if (turmaId) {
            const urlgetInstrutor = `${URL}/${turmaId}/buscar-instrutor`
            const response = await fetch(urlgetInstrutor)
            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = handleErrorResponse(response.status, errorData)
                return errorMessage
            }
            const data = await response.json()
            return data
        }
    } catch (error) {
        console.error(`Erro ao buscar dados: ` + error)
    }
}