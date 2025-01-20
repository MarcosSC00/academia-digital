export function SelectInstrutorWindow(props) {

    return (
        <button
            onClick={props.onClick}
            className="w-full flex items-center py-2 bg-slate-700 justify-start 
            gap-5 border-b border-gray-500 pl-5"
        >
            <img
                src={`http://localhost:8080/images/instrutores/${props.imageProfile}`}
                alt=""
                className="object-cover rounded-full w-[30px] h-[30px]"
            />
            <span className="text-gray-200 font-semibold">{props.name}</span>
        </button>
    )
}