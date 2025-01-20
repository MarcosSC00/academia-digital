import { getAlunos } from "../api/apiAluno";

//filtered alunos
export async function filterAlunos(alunoName) {

    try {
        const alunos = await getAlunos()
        if (!alunos) {
            throw new Error("Nenhum aluno encontrado.")
        }

        const filterResult = alunos.filter(aluno => aluno.name.toLowerCase().includes(alunoName.toLowerCase()))
        return filterResult
    } catch (error) {
        console.log('Erro: ' + error)
        throw new Error(error)
    }
}

//getDate
export function getDate(date) {
    const dateAluno = new Date(date)

    var day = dateAluno.getDate() + 1
    var month

    switch (dateAluno.getMonth() + 1) {
        case 1:
            month = "JAN"
            break
        case 2:
            month = "FEV"
            break
        case 3:
            month = "MAR"
            break
        case 4:
            month = "ABR"
            break
        case 5:
            month = "MAI"
            break
        case 6:
            month = "JUN"
            break
        case 7:
            month = "JUL"
            break
        case 8:
            month = "AGO"
            break
        case 9:
            month = "SET"
            break
        case 10:
            month = "OUT"
            break
        case 11:
            month = "NOV"
            break
        default:
            month = "DEZ"
    }

    return { "day": day, "month": month }
}

//GET ALUNOS POR MES
export async function getAlunosAtMonth() {
    const alunos = await getAlunos()
    const matriculasAtMonth = [
        { mes: 'JAN', qtd: 0 }, { mes: 'FEV', qtd: 0 }, { mes: 'MAR', qtd: 0 },
        { mes: 'ABR', qtd: 0 }, { mes: 'MAI', qtd: 0 }, { mes: 'JUN', qtd: 0 },
        { mes: 'JUL', qtd: 0 }, { mes: 'AGO', qtd: 0 }, { mes: 'SET', qtd: 0 },
        { mes: 'OUT', qtd: 0 }, { mes: 'NOV', qtd: 0 }, { mes: 'DEZ', qtd: 0 }
    ]
    if (alunos) {
        alunos.forEach(aluno => {
            const dataMatricula = new Date(aluno.dataMatricula)
            const mounth = dataMatricula.getMonth()
            const monthKey = Object.keys(matriculasAtMonth[mounth])[1]
            matriculasAtMonth[mounth][monthKey]++
        })
    }
    return matriculasAtMonth
}