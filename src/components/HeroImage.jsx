import React from 'react'

const HeroImage = ({src}) => {
  return (
 <div className='w-full image-full'>
                <img src={src} alt="" className='w-full h-full object-cover img'/>
</div>  )
}

export default HeroImage