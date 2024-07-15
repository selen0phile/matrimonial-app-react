import React from 'react'

export default function TextInput({ defaultValue, label, value, setValue, inputRef, type = "text", height = '12', options = [] }) {
    return (
        <div className='w-full'>
            <div className='ml-1 tp text-xs font-bold'>{label}</div>
            {
                type === 'text' ?
                    <input defaultValue={defaultValue} ref={inputRef} type={type} value={value} onChange={(e) => { if (setValue) setValue(e.target.value) }}
                        className={'h-' + height + ' border-white bg-gray-200 rounded-xl w-full pl-4 focus:outline-none'} />
                    :
                    <select defaultValue={defaultValue} ref={inputRef} value={value} onChange={(e) => { if (setValue) setValue(e.target.value) }}
                        className={'h-' + height + ' border-white bg-gray-200 rounded-xl w-full pl-4 focus:outline-none border-r-8 border-r-transparent'} >
                        {
                            options.length > 0 && options.map((option, index) => 
                                <option key={index} value={index+1}>{option}</option>
                            )
                        }
                    </select>
            }
        </div>
    )
}
