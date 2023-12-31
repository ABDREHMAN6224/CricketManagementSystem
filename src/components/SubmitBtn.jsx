import React from 'react'

const SubmitBtn = ({text="submit",onClick,disabled}) => {
  return (
    <button disabled={disabled} className='btn btn-primary' onClick={onClick}>{text}</button>
  )
}

export default SubmitBtn