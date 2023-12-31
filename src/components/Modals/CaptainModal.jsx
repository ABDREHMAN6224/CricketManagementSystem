import React, { useState } from 'react'
import Modal from './Modal'
import { useDispatch } from 'react-redux';
import { removeCurrentCaptain, updateCaptain, updateCurrentCaptain } from '../../features/captainReducer';
import { toast } from 'react-toastify';
import PictureInput from '../inputs/PictureInput';
import TextInput from '../inputs/TextInput';

const CaptainModal = ({open,onClose,loading,captain,viewOnly=false}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>
  )}
  const {playerid,playername,playerpicpath,matchesascaptain,totalwins}=captain;
  const [name,setName]=useState(playername);
  const [picture,setPicture]=useState(playerpicpath);
  const [load,setLoad]=useState(false);
  const [matches,setMatches]=useState(matchesascaptain);
  const [wins,setWins]=useState(totalwins);
  const dispatch=useDispatch();
  const handleClose=()=>{
    dispatch(removeCurrentCaptain());
    onClose();
  }
  const handleSave=()=>{
    if(name=='' || matches<0 || matches=='' || wins=='' || wins<0){
      toast.error('Please enter valid details');
      return;
    }
    if(name.trim()==='' || name.trim().length<3 || name.toLowerCase().trim().includes('captain')){
      toast.error('Please enter valid captain name');
      return;
    }
    if(matches<0 || wins<0){
      toast.error('Please enter valid numbers');
      return;
    }
    if(wins>matches){
      toast.error('Total wins cannot be greater than matches as captain');
      return;
    }
    if(name.toLowerCase().trim()===playername && matches===matchesascaptain && wins===totalwins){
      toast.info('No changes made');
      return;
    }
    setLoad(true);
    dispatch(updateCurrentCaptain({playerid,playername:name,playerpicpath:picture,matchesascaptain:matches,totalwins:wins}));
    dispatch(updateCaptain({playerid,name,picpath:picture,matches,wins}));
    toast.success('Captain updated successfully');
    setTimeout(()=>{
      setLoad(false);
      handleClose();
    },2000)
  }


        // dispatch(updatePlayerPicture({id:playerid,picturePath:picture}));

  return (
     <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>{viewOnly?"View captain":"Edit Captain"}</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center flex-col justify-center gap-2">
                    <PictureInput disabled={viewOnly} hoverLabel="Update Picture" picture={picture} setPicture={setPicture} />
                    <h3 className="text-2xl font-bold">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <TextInput disabled={viewOnly} label="Captain Name" value={name} onChange={e=>setName(e.target.value)} />
                    <TextInput disabled={viewOnly} label="Matches as captain" value={matches} onChange={e=>setMatches(e.target.value)} type="number"/>
                    <TextInput disabled={viewOnly} label="Total wins" value={wins} onChange={e=>setWins(e.target.value)} type="number"/>
                  </div>
                  {!viewOnly &&
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load||viewOnly}>{load?"Saving ...":"Save"}</button>
                  }
                </div>
              </div>
        </div>
    </Modal> 
    )
}

export default CaptainModal