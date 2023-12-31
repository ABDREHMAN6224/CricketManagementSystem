import React from 'react'

const FormInput = ({label,type,name,value,placeholder,onChange,required=false,minLength}) => {
  return (
    <label className="form-control">
  <div className="label">
    <span className="label-text capitalize">{label}</span>
  </div>
  <input type={type} minLength={minLength} placeholder={placeholder} required={required} name={name} onChange={onChange} value={value} className="input input-bordered" />
  
</label>
  )
}

export default FormInput