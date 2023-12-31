import React, { useState } from 'react'
import Modal from '../Modal'
import TextInput from '../../inputs/TextInput';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { createLocation } from '../../../features/locationReducer';

const AddStadiumModal = ({open,onClose}) => {
    const [name,setName]=useState('');
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const handleSave=()=>{
        if(name.length<1){
            toast.error("Please enter name");
            return;
        }
        if(name.length<3){
            toast.error("Name must be atleast 3 characters long");
            return;
        }
        setLoad(true);
        dispatch(createLocation({locationname:name}))
        toast.success("Location Registered");
        setTimeout(()=>{
            setLoad(false);
            setName('');
            onClose();
        },2000)
    }
  return (
 <Modal open={open} onClose={onClose} width="700px" height='auto'>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Stadium</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className="grid grid-cols-1">
                    <TextInput label="Name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                </div>
              </div>
        </div>
    </Modal>  )
}

export default AddStadiumModal