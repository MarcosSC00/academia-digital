import { Link } from "react-router-dom";

export function NotFound(){
    return(
        <div className="w-full h-screen flex items-center justify-center">
            <div className="flex flex-col text-gray-200 items-center">
                <div className="flex flex-col items-center gap-5">
                    <img src="/not-found-page.png" alt="" />
                    <Link 
                        to="/" 
                        className="text-blue-600 underline transition-colors duration-150
                        hover:text-blue-700"

                    >
                        Voltar para home.
                    </Link>
                </div>
            </div>
        </div>
    )
}