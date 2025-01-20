export function FormModel(props) {
    return (
        <div className="flex flex-col md:pb-10 relative">
            <h2 className="text-2xl font-bold text-gray-200 mb-5">{props.title}</h2>
            <form onSubmit={props.submit} className="grid grid-cols-1 md:grid-cols-2 items-center gap-4">
                {props.children}
            </form>
        </div>
    )
}