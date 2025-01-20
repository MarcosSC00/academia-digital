import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { Alunos } from "../pages/alunos";
import { Instrutores } from "../pages/instrutores";
import { Turmas } from "../pages/turmas";
import { Avaliacoes } from "../pages/avaliacoes";
import { AlunoDetails } from "../pages/alunodetails";
import { CadAluno } from "../pages/cadaluno";
import { CadInstrutor } from "../pages/cadinstrutor";
import { CadTurma } from "../pages/cadTurma";
import { InstrutorDetails } from "../pages/instrutordetails";
import { CadAvaliation } from "../pages/cadavaliation";
import { NotFound } from "../pages/notFound";
import { Dashboard } from "../pages/dashboard";
import { FormUpdateAluno } from "../pages/form-update-aluno";
import { FormUpdateInstrutor } from "../pages/form-update-instrutor";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Dashboard/>
            },
            {
                path: "/alunos",
                element: <Alunos />
            },
            {
                path: "/instrutores",
                element: <Instrutores />
            },
            {
                path: "/turmas",
                element: <Turmas />
            },
            {
                path: "/avaliacoes",
                element: <Avaliacoes />
            },
            {
                path: "/cadastro-aluno",
                element: <CadAluno />
            },
            {
                path: "/cadastro-turma",
                element: <CadTurma />
            },
            {
                path: "/cadastro-instrutor",
                element: <CadInstrutor />
            },
            {
                path: "/alunos/:alunoCodParam",
                element: <AlunoDetails />
            },
            {
                path: "/alunos/update/:alunoCodParam",
                element: <FormUpdateAluno />
            },
            {
                path: "/alunos/:alunoCodParam/adicionar-avaliacao",
                element: <CadAvaliation />
            },
            {
                path: "/alunos/:alunoCodParam/buscar-avaliacoes",
                element: <Avaliacoes />
            },
            {
                path: "instrutores/:instrutorCodParam",
                element: <InstrutorDetails />
            },
            {
                path: "instrutores/update/:instrutorCodParam",
                element: <FormUpdateInstrutor />
            },
            {
                path: "instrutores/:codMatricula/buscar-aulas",
                element: <Turmas />
            }
        ]
    },
    {
        path: "*",
        element: <NotFound />
    }
])