import { BookCopy, Home, UserRound, X } from "lucide-react";
import { Link } from "react-router-dom";

export function AsideBar(props) {
    return (
        <aside className={`z-10 md:w-64 overflow-y-auto bg-[#1E1D1D] hidden md:block flex-shrink-0 shadow-[0_0_6px_rgb(0,0,0)]`}>
            <div className="py-4 text-gray-400">
                <a className="ml-6 text-lg font-bold text-gray-200" href="#">
                    Digital Academy
                </a>
                <ul className="mt-6">
                    <li className="py-6 px-3 relative">
                        <Link
                            to="/"
                            className="inline-flex items-center w-full text-sm 
                            font-semibold transition-colors duration-150 hover:text-gray-200"
                            onClick={props.closeDrawer}
                        >
                            <Home />
                            <span className="ml-4 text-[20px]">Home</span>
                        </Link>
                    </li>
                    <li className="py-6 px-3 relative">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                            to="/alunos"
                            onClick={props.closeDrawer}
                        >
                            <UserRound />
                            <span className="ml-4 text-[20px]">Alunos</span>
                        </Link>
                    </li>
                    <li className="py-6 px-3 relative">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                            to="/instrutores"
                            onClick={props.closeDrawer}
                        >
                            <Home />
                            <span className="ml-4 text-[20px]">Instrutores</span>
                        </Link>
                    </li>
                    <li className="py-6 px-3 relative">
                        <Link
                            className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                            to="/turmas"
                            onClick={props.closeDrawer}
                        >
                            <BookCopy />
                            <span className="ml-4 text-[20px]">Turmas</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </aside>
    )
}