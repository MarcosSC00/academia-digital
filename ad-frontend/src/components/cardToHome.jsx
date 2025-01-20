import { BookCopy, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

export function CardToHome(props) {
    return (
        <Link 
            to={`/${props.name}`}
            className="flex items-center w-full p-2 rounded-md 
            border-2 border-yellow-400 transition-all duration-150
            hover:-translate-y-1 shadow-[0_4px_6px_rgb(0,0,0)]"
        >
            <div
                className="w-[50px] h-[50px] rounded-full flex items-center justify-center
                border-2 border-yellow-400"
            >
                {props.name === 'alunos' && (
                    <Users size={30} color="#facc15" />
                )}
                {props.name === 'instrutores' && (
                    <GraduationCap size={30} color="#facc15" />
                )}
                {props.name === 'turmas' && (
                    <BookCopy size={30} color="#facc15" />
                )}

            </div>
            <span className="pl-2 text-xl font-bold capitalize text-yellow-400">{props.name}</span>
        </Link>
    )
}