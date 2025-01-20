import { Ruler, Weight } from "lucide-react";

export function CardToAvaliation(props) {

    return (
        <div className="flex flex-col border border-gray-500/30 rounded-md pt-[80px] relative bg-gradient-to-t from-gray-800 to-gray-500">
            <div className="absolute top-0 inset-x-0 h-[70px] bg-[#F9D81F] rounded-t-md" />

            <div className="flex flex-col justify-center items-center border-2 border-gray-600 rounded-md font-bold leading-none px-4 py-2 text-gray-700 bg-[#F9D81F] absolute top-[70px] -translate-y-1/2 left-4">
                <span className="text-[20px]">{props.day}</span>
                <span className="text-[12px]">{props.mounth}</span>
            </div>

            <div className="flex flex-col px-4 gap-3 my-5">
                <div className="flex items-center border-b border-gray-500 justify-between py-1">
                    <div className="flex items-center">
                        <Weight size={20} color="#FFFFFF" />
                        <span className="text-[12px] font-semibold text-gray-200 pl-2">{`Peso: ${props.weight}`}</span>
                    </div>
                    <div className="flex items-center">
                        <Ruler size={20} color="#FFFFFF"/>
                        <span className="text-[12px] font-semibold text-gray-200 pl-2">{`Altura: ${props.height}`}</span>
                    </div>
                </div>

                <div className="flex items-center px-1 py-1 border border-gray-400 rounded-sm justify-between">
                    <h2 className="text-[14px] font-bold text-gray-200">IMC: <span className="text-gray-200 font-medium text-[12px]">{parseFloat(props.imc).toFixed(2)}</span></h2>
                </div>

                <div className="flex items-center px-1 py-1 border border-gray-400 rounded-sm justify-between">
                    <h2 className="text-[14px] font-bold text-gray-200">PGC: <span className="text-gray-200 font-medium text-[12px]">{parseFloat(props.pgc).toFixed(2)}%</span></h2>
                </div>
            </div>

            <button
                onClick={props.onClick}
                className="bg-[#F9D81F] text-gray-700 text-[14px] font-bold py-2 rounded-b-md"
            >
                EXCLUIR
            </button>
        </div>
    )
}