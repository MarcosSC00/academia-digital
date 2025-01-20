import { Button, Drawer, IconButton } from "@material-tailwind/react"
import { useState } from "react"
import { AsideBar } from "../components/asidebar"
import { AlignJustify, BookCopy, Home, UserRound, X } from "lucide-react"
import { Link } from "react-router-dom"

//criar o menu com o navigation
//formatar as classes do componente AsideBar

export function MenuMobile() {
    const [isOpen, setIsOpen] = useState(false)

    const openDrawer = () => setIsOpen(true)
    const closeDrawer = () => setIsOpen(false)
    return (
        <>
            <Button
                onClick={openDrawer}
                className="p-2 text-gray-300 !absolute top-0 left-6 translate-y-[25%] z-50 !shadow-none
                rounded-full bg-transparent"
            >
                <AlignJustify size={25} />
            </Button>

            <Drawer
                open={isOpen} 
                onClose={closeDrawer}
                className="fixed inset-0 z-50 shadow-[0_0_6px_rgba(0,0,0)] bg-[#1E1D1D] h-full overflow-y-auto"
            >
                <IconButton
                    onClick={closeDrawer}
                    className="text-gray-300 p-5 rounded-none bg-[#1E1D1D] !absolute right-4 top-3
                    !shadow-none"
                >
                    <X size={25} />
                </IconButton>

                <div className="py-4 text-gray-400 overflow-hidden">
                    <a className="ml-6 text-lg font-bold text-gray-200" href="#">
                        Digital Academy
                    </a>
                    <ul className="mt-6">
                        <li className="py-6 px-3 relative">
                            <Link
                                to="/"
                                className="inline-flex items-center w-full text-sm 
                            font-semibold transition-colors duration-150 hover:text-gray-200"
                                onClick={closeDrawer}
                            >
                                <Home />
                                <span className="ml-4 text-[20px]">Home</span>
                            </Link>
                        </li>
                        <li className="py-6 px-3 relative">
                            <Link
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                                to="/alunos"
                                onClick={closeDrawer}
                            >
                                <UserRound />
                                <span className="ml-4 text-[20px]">Alunos</span>
                            </Link>
                        </li>
                        <li className="py-6 px-3 relative">
                            <Link
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                                to="/instrutores"
                                onClick={closeDrawer}
                            >
                                <Home />
                                <span className="ml-4 text-[20px]">Instrutores</span>
                            </Link>
                        </li>
                        <li className="py-6 px-3 relative">
                            <Link
                                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200"
                                to="/turmas"
                                onClick={closeDrawer}
                            >
                                <BookCopy />
                                <span className="ml-4 text-[20px]">Turmas</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </Drawer>
        </>
    )
}