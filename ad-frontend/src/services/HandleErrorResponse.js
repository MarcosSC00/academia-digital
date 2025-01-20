export function handleErrorResponse(status, errorData) {
    var errorMessage

    switch (status) {
        case 422:
            console.error('Erro: ', errorData.message)
            errorMessage = {status: status, message:errorData.message}
            break
        case 404:
            console.error('Recurso não encontrado: ', errorData)
            errorMessage = {status: status, message:errorData.message}
            break
        case 400:
            console.error('Dados inválidos: ', errorData.errors)
            errorMessage = {status: status, message:errorData.errors.map(error => error.message)}
            break
        default:
            console.error('Erro na requisição: ', status, errorData)
            errorMessage = {status: status, message:errorData}
    }
    return errorMessage
}