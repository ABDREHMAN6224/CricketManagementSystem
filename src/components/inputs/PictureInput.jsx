import React, { useState } from 'react'
import { MdOutlineCameraAlt } from "react-icons/md";
import { customFetch } from '../../customeFetch';

const PictureInput = ({hoverLabel,picture,setPicture,w=40,h=40,disabled=false,small=false}) => {
    const [pic,setPic]=useState(picture); 
    const [show,setShow]=useState(false);
    const handleUpdatePicture=(e)=>{
    const pic=e.target.files[0];
    const picUrl=URL.createObjectURL(pic);
    const formData=new FormData();
    setPic(picUrl);
    formData.append('file',pic);
    const uploadPicture=async()=>{
        const response=await customFetch.post('/fileupload',formData);
        setPicture(response.data.url);
    }
    uploadPicture();
  }
  
  return (
  <div className={small?"flex w-[7rem] h-[7rem] flex-col items-center justify-center rounded-full bg-gray-300 relative":"flex w-40 h-40 flex-col items-center justify-center rounded-full bg-gray-300 relative"} onMouseOver={()=>setShow(true)} onMouseLeave={()=>setShow(false)}>
                      <img className={small?"w-[7rem] h-[7rem] object-cover rounded-full":"w-40 h-40 object-cover rounded-full"} src={pic||picture} alt="" />
                      {show && !disabled &&
                      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center rounded-full cursor-pointer bg-gray-700 opacity-[0.7]">
                        <p className='m-0 p-0 text-white text-1xl'>{hoverLabel}</p>
                        <label htmlFor="file" className='cursor-pointer'>
                          <MdOutlineCameraAlt className="text-2xl text-white hover:scale-110"/>
                        </label>
                        <input disabled={disabled} type="file" name='file' id='file' className="hidden" multiple={false} onChange={handleUpdatePicture}/>
                      </div>}
        </div>  )
}

export default PictureInput