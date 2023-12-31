import React, { useState } from 'react'
import { customFetch } from '../../customeFetch';

const FileInput = ({name,picture,setPicture,label,required}) => {
    const handlePicChange=(e)=>{
    const pic=e.target.files[0];
    const picUrl=URL.createObjectURL(pic);
    const formData=new FormData();
    formData.append('file',pic);
    const uploadPicture=async()=>{
        const response=await customFetch.post('/fileupload',formData);
        setPicture(response.data.url);
    }
    uploadPicture();
  }
  return (
    <label className="form-control w-full max-w-xs">
  <div className="label pb-0">
    <label className="form-label label-text">{label}{required?<span className='text-red-500'> *</span>:""}</label>
  </div>
  <input type="file"  name={name} onChange={handlePicChange} multiple={false} className="file-input file-input-bordered w-full max-w-xs  h-[2rem] max-h-8" />
</label>
  )
}

export default FileInput