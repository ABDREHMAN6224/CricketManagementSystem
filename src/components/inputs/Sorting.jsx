import React from 'react'
import styled from 'styled-components'
const Sorting = ({value,onChange,options,label="sort by",required=false}) => {
    return <Wrapper>
    <div className='sort-container'>
      <label htmlFor="sort" className='form-label'>{label}</label>
      <select required={required} name="sort" id="sort" className='sort-input border-2' value={value} onChange={onChange}>
        {options.map((option,index)=>{
            return(
                <option key={index} value={option.value}>{option.label}</option>
                )
            }
        )
        }
      </select>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
 
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
  }
`

export default Sorting