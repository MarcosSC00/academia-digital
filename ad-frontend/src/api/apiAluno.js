import { handleErrorResponse } from "../services/HandleErrorResponse"

const URL = "http://localhost:8080/alunos"


//GET ALL
export async function getAlunos() {
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
        console.error('Erro ao buscar alunos: ', error)
    }
}

//POST ALUNO
export async function postAluno(data) {

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

        return { message: 'Aluno salvo com sucesso!', data: response };
    } catch (error) {
        console.error('Erro ao criar aluno: ', error.message)
        throw error
    }
}

//GET ALUNO BY ID
export async function getAlunoById(alunoId) {

    try {
        const response = await fetch(`${URL}/${alunoId}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        return null;
    }
}

//GET ALUNO BY CODMATRICULA
export async function getAlunoByCodMatricula(codMatricula) {

    try {
        const response = await fetch(`${URL}/cod/${codMatricula}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar aluno:", error);
        return null;
    }
}

//ADD AVALIACAO
export async function addAvaliacao(codMatricula, avaliacao) {

    try {
        const response = await fetch(`${URL}/${codMatricula}/adicionar-avaliacao`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(avaliacao)
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'avaliação inserida com sucesso!', status: response.status, data: response }
    } catch (error) {
        console.error("Erro ao adicionar avaliação:", error);
        throw new Error(error)
    }
}

//ADD TURMA
export async function addTurma(alunoId, turmaId) {
    try {
        const response = await fetch(`${URL}/${alunoId}/adicionar-turma/${turmaId}`, {
            method: "POST"
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'Aula inserida com sucesso!', data: response }
    } catch (error) {
        console.error("Erro ao adicionar turma:", error);
        throw new Error(error)
    }
}

//UPDATE ALUNO
export async function updateAluno(alunoCodParam, newAluno) {
    try {

        const response = await fetch(`${URL}/${alunoCodParam}`, {
            method: "PUT",
            body: newAluno
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }

        const data = await response.json()
        return { message: 'Aluno atualizado com sucesso!', status: response.status, data: data }
    } catch (error) {
        console.error("Erro ao atualizar aluno:", error);
        throw new Error(error)
    }
}

//GET AVALIACOES
export async function getAvaliacoes(alunoId) {

    try {
        const response = await fetch(`${URL}/buscar-avaliacoes?alunoId?${alunoId}`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'Aluno atualizado com sucesso!', status: response.status, data: response }
    } catch (error) {
        console.error("Erro ao buscar avaliações:", error);
        throw new Error(error)
    }
}

//GET TURMAS
export async function getTurmasAluno(codMatricula) {

    try {
        const response = await fetch(`${URL}/${codMatricula}/buscar-turmas`)

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        const data = await response.json()
        return data
    } catch (error) {
        console.error("Erro ao buscar turmas:", error);
        throw new Error(error)
    }
}

//DELETE ALUNO
export async function deleteAluno(codMatricula) {

    try {
        const response = await fetch(`${URL}/${codMatricula}`, {
            method: "DELETE",
        })

        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'Aluno deletado com sucesso!', status: response.status }
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        throw new Error(error)
    }
}

//REMOVE TURMA
export async function removeTurma(codMatricula, turmaId) {
    try {
        const response = await fetch(`${URL}/${codMatricula}/remover-turma/${turmaId}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        } else {
            return { message: 'Turma removida com sucesso!', status: response.status, data: response }
        }
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        throw new Error(error)
    }
}

//REMOVE AVALIATION
export async function removeAvaliation(codMatricula, turmaId) {
    try {
        const response = await fetch(`${URL}/${codMatricula}/remover-avaliacao/${turmaId}`, {
            method: 'DELETE'
        })
        if (!response.ok) {
            const errorData = await response.json()
            const errorMessage = handleErrorResponse(response.status, errorData)
            return errorMessage
        }
        return { message: 'Avaliação removida com sucesso!', status: response.status, data: response }
    } catch (error) {
        console.error("Erro ao deletar aluno:", error);
        throw new Error(error)
    }
}