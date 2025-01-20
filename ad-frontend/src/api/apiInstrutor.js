import { handleErrorResponse } from "../services/HandleErrorResponse"

const URL = "http://localhost:8080/instrutores"


//GET ALL
export async function getInstrutores() {
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
        console.error('Erro ao buscar instrutores: ', error)
    }
}

//GET INSTRUTOR BY ID
export async function getInstrutorById(instrutorId) {

    try {
        const response = await fetch(`${URL}?instrutorId=${instrutorId}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar instrutor:", error)
        throw new Error(error);
    }
}

//GET INSTRUTOR BY CODMATRICULA
export async function getInstrutorByCodMatricula(instrutorCodParam) {

    try {
        const response = await fetch(`${URL}/cod/${instrutorCodParam}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar instrutor:", error)
        throw new Error(error);
    }
}

//GET INSTRUTOR BY NAME
export async function getInstrutorByName(instrutorName) {

    try {
        const response = await fetch(`${URL}/name/${instrutorName}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar instrutor:", error)
    }
}

//CREATE INSTRUTOR
export async function postInstrutor(data) {

    try {
        const response = await fetch(URL, {
            method: "POST",
            body: data
        })
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        return { message: 'Instrutor salvo com sucesso!', response };
    } catch (error) {
        console.error('Erro ao criar instrutor: ', error.message)
    }
}

//ADD TURMA
export async function addTurma(instrutorId, turmaId) {
    try {
        const response = await fetch(`${URL + "/adicionar-aula/" + instrutorId + "/?aulaId=" + turmaId}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return { message: 'Turma inserida com sucesso!', data: data }
    } catch (error) {
        console.error("Erro ao adicionar avaliação:", error)
    }
}

//UPDATE Instrutor
export async function updateInstrutor(instrutorCodParam, newInstrutor) {
    try {

        const response = await fetch(`${URL}/${instrutorCodParam}`, {
            method: "PUT",
            body: newInstrutor
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        const data = await response.json()
        return { message: 'Aluno atualizado com sucesso!', status: response.status, data: data }
    } catch (error) {
        console.error("Erro ao atualizar instrutor:", error)
    }
}

//GET TURMAS
export async function getTurmas(codMatricula) {

    try {
        if (codMatricula) {
            const response = await fetch(`${URL}/${codMatricula}/buscar-aulas`)

            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = handleErrorResponse(response.status, errorData)
                return errorMessage
            }

            const data = await response.json()
            return data
        }
    } catch (error) {
        console.error("Erro ao buscar turmas:", error)
    }
}

//REMOVE TURMA
export async function removeTurma(codMatricula, turmaId) {
    try {
        const response = await fetch(`${URL}/${codMatricula}/remove-turma/${turmaId}`, {
            method: 'DELETE'
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return response
    } catch (error) {
        console.error('erro ao remover turma', error)
        throw new Error(error)
    }
}

//DELETE INSTRUTOR
export async function deleteInstruor(codMatricula) {

    try {
        const response = await fetch(`${URL}/${codMatricula}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'Instrutor deletado com sucesso!', status: response.status }
    } catch (error) {
        console.error("Erro ao deletar instrutor:", error)
        throw new Error(error)
    }
}