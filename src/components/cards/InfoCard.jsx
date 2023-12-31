import React from 'react'

const InfoCard = ({picture,label,number}) => {
  return (
<div className="card w-2/12 h-40 bg-base-100 shadow-xl image-full">
  <figure><img className='object-cover w-full h-full' src={picture} alt={label} /></figure>
  <div className="card-body items-center justify-center">
    <div className="card-title text-2xl justify-between w-full gap-3">
        <p className='m-0 p-0'>
        {label}
        </p>
    </div>
        <p className='m-0 p-0 mr-auto text-xl font-extrabold'>{number}</p>
  </div>
</div>  
)
}

export default InfoCard