import React from 'react'
import styled from 'styled-components'

const SelectInput = ({value,onChange,options,label,bold=false,disabled=false,required=false,full=false}) => {
  return (
    <Wrapper>
    <div className={full?"sort-container w-full min-w-[120px]":"sort-container w-full"}>

    <label htmlFor="" className={bold?"form-label text-base font-semibold self-start":"form-label self-start"}>{label}{required?<span className='text-red-500'> *</span>:""}</label>

      <select disabled={disabled} name="sort" id="sort" className='sort-input border-2'  value={value} onChange={onChange}>
        {options.map((option,index)=>{
          return(
            <option key={index} value={option}>{option}</option>
            )
          }
          )}
</select>  
      </div>
</Wrapper>
)
}

export default SelectInput
const Wrapper=styled.div`
    margin-bottom: 10px;
    @media (max-width: 576px) {
      label {
        display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
  }
  .sort-container {
    display: flex;
        flex-direction: column;
        gap: .2rem;
      }
      
      .sort-input {
        font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
    margin: 0 !important;
  }
    
`