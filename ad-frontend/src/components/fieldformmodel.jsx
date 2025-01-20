export function FieldFormModel(props) {
    return (
        <div className={`flex items-center ${props.isCheckBox == "true" ? 'flex-row-reverse gap-2 justify-end':'flex-col'} w-full`}>
            <label
                htmlFor={`${props.id}`}
                className={`text-gray-200 font-semibold w-full ${props.isCheckBox == "true" ? 'text-[14px]':''}`}
            >
                {props.isCheckBox=="true" ? props.label : `${props.label}:`}
            </label>
            <input
                id={`${props.id}`}
                className={`w-full py-2 px-1 rounded-sm bg-transparent border border-gray-600
                 text-gray-200 outline-none placeholder-gray-400 font-light ${props.isCheckBox == "true" ? 'basis-1':'basis-0'}` }
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                checked={props.checked}
                required={props.required}
                readOnly={props.readOnly}
                maxLength={props.maxLength}
                minLength={props.maxLength}
                step={props.step}
            />
        </div>
    )
}