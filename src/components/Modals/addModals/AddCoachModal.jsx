import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { useDispatch } from 'react-redux';
import { createCoach } from '../../../features/coachesReducer';
import TextInput from '../../inputs/TextInput';
import PictureInput from '../../inputs/PictureInput';
import { toast } from 'react-toastify';

const AddCoachModal = ({open,onClose,viewOnly=true}) => {
    const [name,setName]=useState('');
    const [picture,setPicture]=useState('');
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const handleSave=()=>{
        if(name.length==0){
            toast.error("Please enter coach name");
            return;
        }
        if(name.length<3){
            toast.error("Coach name must be atleast 3 characters long");
            return;
        }
        if(picture==""){
            toast.error("Please enter coach picture");
            return;
        }
        setLoad(true);
        let n=name.charAt(0).toUpperCase()+name.slice(1);
        dispatch(createCoach({name:n,picture}));
        toast.success("Registered successfully");
        setTimeout(()=>{
            setLoad(false);
            onClose();
        },2000)
        useEffect(()=>{
            console.log(picture);
        },[picture])
    }
  return (
 <Modal open={open} onClose={onClose} width="700px" height='auto'>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Coach</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-1">
                    <TextInput label="Name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                </div>
              </div>
        </div>
    </Modal>  )
}

export default AddCoachModal