import React, { useRef } from 'react'
import { useAtom } from 'jotai';
import { IconButton, Select, MenuItem } from '@mui/material';
import TextInput from './TextInput';
import ButtonWrap from './ButtonWrap';
import { MdSave } from 'react-icons/md';
import { IoMdClose } from "react-icons/io";

export default function EditSection({ data, setData, section, setIsOpen }) {
    const Refs = {};
    section.fields.map(field => {
        Refs[field.title] = useRef();
    });
    function saveClick() {
        var d = data;
        section.fields.map(field => {
            d.data[section.key][field.id] = Refs[field.title].current.value;
        })

        setData(d);
        setIsOpen(false);
    }
    return (
        <div className='w-[80vw] rounded-lg max-h-[90vh] overflow-auto bg-white mx-auto p-4'>
            <div className='flex justify-between items-start'>
                <div className="text-xl mb-4 text-ce">Edit {section.title}</div>
                <IconButton onClick={() => setIsOpen(false)}>
                    <IoMdClose />
                </IconButton>
            </div>
            {
                section.fields.map((field, id) =>
                    <div className="mb-4" key={id} >
                        {/* <div className="w-[40vw] gd-text">{field.title}</div>
                        <div>{data?.data?.[section.key]?.[field.id]}</div> */}
                        <TextInput options={field.options} type={field.type === 'select' ? 'select' : 'text'} height='10' defaultValue={data?.data?.[section.key]?.[field.id]} label={field.title} inputRef={Refs[field.title]} />
                    </div>
                )
            }
            <ButtonWrap onClick={() => saveClick()} className='flex w-[30vw] mx-auto h-10 mt-6 items-center gd-right rounded-full text-white justify-center gap-2'>
                <div className='text-3xl'>
                    <MdSave />
                </div>
                <div>
                    Save
                </div>
            </ButtonWrap>
        </div>
    )
}
