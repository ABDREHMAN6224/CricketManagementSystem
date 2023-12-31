import React from 'react'

const SearchInput = ({onChange,placeholder,label,name,value,type="text"}) => {
  return (
<div className="form-row" style={{margin:0}}>
            <label className='form-label' htmlFor={name}>{label}</label>
            <input type={type} className="form-input" placeholder={placeholder} onChange={onChange} value={value}/>
</div> 
 )
}

export default SearchInput