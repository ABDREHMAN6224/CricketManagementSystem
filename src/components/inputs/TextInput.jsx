import React from 'react'

const TextInput = ({label,placeholder="",onChange,value,name,type="text",disabled=false,required=false}) => {
  return (
<div className="form-row items-start">
    <label  className='form-label m-0 p-0 text-base text-start'>{label}{required?<span className='text-red-500'> *</span>:""}</label>
    <input type={type} name={name}  placeholder={placeholder} disabled={disabled} className='form-input m-0 p-0 disabled:bg-gray-300' value={value} onChange={onChange}/>
  </div>
)
}

export default TextInput