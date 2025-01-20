export function Button(props){
    return(
        <button className={`px-3 py-2 gap-2 rounded-sm ${props.full == "true" ? 'w-full':''}
        items-center justify-center font-bold md:rounded-md flex ${props.bg} text-${props.text}
        transition-colors duration-150 hover:${props.hover}`}>
            <span>{props.name}</span>
            {props.children}
        </button>
    )
}