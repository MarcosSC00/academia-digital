import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getInstrutorByTurma } from "../api/apiTurmas";

export function CardToClass(props) {
    const [instrutor, setInstrutor] = useState()

    useEffect(() => {
        const fetchInstrutor = async () => {
            const turmaInstrutor = await getInstrutorByTurma(props.turmaId)
            setInstrutor(turmaInstrutor)
        }
        fetchInstrutor()
    }, [])

    return (
        <div
            className="flex flex-col border border-[rgba(0,0,0,0.2)] rounded-md bg-gray-900 
            shadow-[4px_4px_10px_0_rgba(0,0,0,0.4)]"
        >
            <div className="flex w-full p-[10px_10px_0px_10px] justify-between items-center">
                <h2
                    className="text-yellow-400 font-[900] text-[24px] [-webkit-text-fill-color:transparent] 
                    [-webkit-text-stroke:0.6px] tracking-[0.1rem] capitalize"
                >
                    {props.nameClass}
                </h2>
                <span className="p-[10px] rounded-md border border-yellow-400 shadow-[0_0_6px_0_rgba(234,179,8,0.8)]">
                    <Activity size={15} className="text-yellow-400" />
                </span>
            </div>

            <div className="flex flex-col p-2 gap-[12px]">
                <div className="flex items-center gap-2">
                    <span className="text-gray-200 text-sm font-semibold">Instrutor: </span>
                    <span className="rounded-full object-cover text-gray-200 relative group">
                        <img
                            src={`http://localhost:8080/images/instrutores/${instrutor?.imageProfile}`}
                            alt="imagem de perfil"
                            className="w-[25px] h-[25px] object-cover rounded-full"
                        />
                        <Link
                            to={`/instrutores/${instrutor?.codMatricula}`}
                            className="hidden px-2 rounded-sm absolute top-0 -translate-y-full z-50 
                            bg-gray-900 text-yellow-500 font-semibold group-hover:block
                            [box-shadow:0_0_6px_0_rgba(0,0,0,0.9)]"
                        >
                            {instrutor?.name.split(' ')[0]}
                        </Link>
                    </span>
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-gray-200 text-sm font-semibold">Horario: </span>
                    <span className="text-gray-300 text-sm font-light">{props.horario}</span>
                </div>

                <div className="flex items-center gap-2">
                    {props.diasSemana && (
                        props.diasSemana.map((dia, index) => (
                            <div className="flex p-1 border border-yellow-400 rounded-md" key={index}>
                                <span className="text-yellow-400 font-semibold text-[12px]">
                                    {dia}
                                </span>
                            </div>
                        ))
                    )}

                </div>
            </div>

            <button
                className={props.hiddenBtnRemove ? 'hidden' : 'w-full px-3 py-2 rounded-b-md bg-yellow-400 transition-colors duration-150 hover:bg-yellow-500'}
                onClick={props.onClick}
            >
                <span className="text-slate-900 text-[14px] font-bold">EXCLUIR</span>
            </button>
        </div>
    )
}