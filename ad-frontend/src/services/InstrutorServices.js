import { getInstrutorByCodMatricula, getInstrutores } from "../api/apiInstrutor";

//getInstrutorFormatedByCod
export async function formatterInstrutor(nameInstrutor) {
    try {
        const instrutores = await getInstrutores()
        if (instrutores) {
            var filterInstrutores = nameInstrutor !== null && nameInstrutor !== ""  ?
                instrutores.filter((inst) => inst.name.toLowerCase().includes(nameInstrutor.toLowerCase())) :
                instrutores

            const formattedInstrutores = filterInstrutores?.map((i) => {
                return (({ name, imageProfile, codMatricula }) => ({ name, imageProfile, codMatricula }))(i)
            })
            return formattedInstrutores
        }
    } catch (error) {
        console.error('erro na requisição: ', error)
    }
}

export async function filterIstrutores(nameInstrutor) {

    try {
        const instrutores = await getInstrutores()
        if (!instrutores) {
            throw new Error("Nenhum instrutor encontrado.")
        }

        const filterResult = instrutores.filter(instrutor => instrutor.name.toLowerCase().includes(nameInstrutor.toLowerCase()))
        return filterResult
    } catch (error) {
        console.log('Erro: ' + error)
        throw new Error(error)
    }
}