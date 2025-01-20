import { Link } from "react-router-dom"

export function CardDashboard(props) {
    return (
        <Link to={props.page}>
            <div className="flex flex-col p-2 border border-gray-500 rounded-md md:text-2xl md:h-[200px]">
                <span className="text-start font-semibold text-gray-200">{props.name}</span>
                <span className="text-sm text-gray-400">{props.description}</span>
            </div>
        </Link>
    )
}