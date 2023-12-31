import React, { useState } from 'react'
import Modal from './Modal'
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import PictureInput from '../inputs/PictureInput';
import TextInput from '../inputs/TextInput';
import { updateCoach, updateCurrentCoach } from '../../features/coachesReducer';

const CoachModal = ({open,onClose,loading,coach,viewOnly=false}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {coachid,coachname,picture}=coach;
  const [coachPicture,setPicture]=useState(picture);
  const [name,setName]=useState(coachname);
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  const handleClose=()=>{
    onClose();
  }
  const handleSave=()=>{
    if(name===""){
      toast.error("Please enter coach name");
      return;
    }
    if(name===coachname && coachPicture===picture){
      toast.info("No changes made");
      return;
    }
    if(name.toLowerCase().trim().includes("coach")){
      toast.error("Coach name cannot contain coach");
      return;
    }
    if(name.trim().length<3){
      toast.error("Coach name should be atleast 3 characters long");
      return;
    }
    setLoad(true);
    dispatch(updateCurrentCoach({coachid,name,picture:coachPicture}));
    dispatch(updateCoach({coachid,name,picture:coachPicture}));
    toast.success("updated successfully");
    setTimeout(()=>{
      setLoad(false);
      onClose();
    },2000)
  }


  return (
     <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>
                    {viewOnly?"View Coach":
                      "Edit Coach"
                    }                
                  
                    </h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center flex-col justify-center gap-2">
                    <PictureInput disabled={viewOnly} hoverLabel="Update Picture" picture={coachPicture} setPicture={setPicture} />
                    <h3 className="text-2xl font-bold">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <TextInput disabled={viewOnly} label="Coach Name" value={name} onChange={e=>setName(e.target.value)} />

                  </div>
                  {!viewOnly&&
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load||viewOnly}>{load?"Saving ...":"Save"}</button>
                  }
                </div>
              </div>
        </div>
    </Modal> 
  )
}

export default CoachModal