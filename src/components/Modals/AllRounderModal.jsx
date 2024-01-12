import React, { useState } from 'react'
import Modal from './Modal'
import PictureInput from '../inputs/PictureInput'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { updateNumberOfMatches, updatePlayerPicture, updatePlayerRank } from '../../features/playerReducer';
import { getAllRounders, removeCurrentAllRounder, setAllrounderPicture, updateAllRounder } from '../../features/allRounderReducer'

const AllRounderModal = ({open,onClose,loading,allRounder}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const bowlTypes=['Fast','Medium','Off-Spin','Leg-Spin']
  const {playername,playerpicpath,bowlhand,bathand,teamid,bowltype,playerstatus,totalodi,totalt20i,totaltest,playerid,battingrank, bowlingrank, allrounderrank}=allRounder;
  const {isError,isLoading}=useSelector(state=>state.allRounder);
  const [picture,setPicture]=useState(playerpicpath);
  const [playerName,setPlayerName]=useState(playername);
  const [bowlHand,setBowlHand]=useState(bowlhand);
  const [batHand,setBatHand]=useState(bathand);
  const [bowlType,setBowlType]=useState(bowltype);
  const [playerStatus,setPlayerStatus]=useState(playerstatus);
  const [totalOdi,setTotalOdi]=useState(totalodi);
  const [totalT20,setTotalT20]=useState(totalt20i);
  const [totalTest,setTotalTest]=useState(totaltest);
  const [allrounderRank,setAllrounderRank]=useState(allrounderrank);
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  
  const handleSave=()=>{
    if(playerName==playername && bowlHand==bowlhand && playerStatus==playerstatus && totalOdi==totalodi && totalT20==totalt20i && totalTest==totaltest && allrounderRank==allrounderrank && bowlType==bowltype && picture==playerpicpath){
      toast.info('No changes made');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        dispatch(removeCurrentAllRounder());
        onClose();
      }, 3000);
      return;
    }
    if(playerName==''||bowlHand==''||batHand=='' ||playerStatus==''||bowlType==''){
      toast.error('Please fill all the fields');
      return;
    }
    if(allrounderRank<=0){
      toast.error('Rank should be greater than 0');
      return;
    }
    //check if rank jump is not greater than 5
    if(Math.abs(allrounderRank-allrounderrank)>3){
      toast.error('Rank jump should not be greater than 3');
      return;
    }
    if(picture!=playerpicpath){
      dispatch(setAllrounderPicture({id:playerid,picture}));
    }
    dispatch(updatePlayerPicture({id:playerid,picturePath:picture}));
    dispatch(updateNumberOfMatches({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,bowlhand:bowlHand,hand:batHand,type:"allrounder",bowltype:bowlType}));
    if(allrounderRank!=allrounderrank){
      dispatch(updatePlayerRank({id:playerid,bowlingrank,battingrank,allrounderrank:allrounderRank}));
    }
    if(!isError){
      toast.success('AllRounder Updated Successfully');
      dispatch(updateAllRounder({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,bathand:batHand,bowlhand:bowlHand,allRounderRank:allrounderRank,bowlingType:bowlType}))
      setLoad(true);
      setTimeout(() => {
        dispatch(getAllRounders());
        setLoad(false);
        dispatch(removeCurrentAllRounder());
        onClose();
      }, 3000);
    }else{
      toast.error('Something went wrong');
    }
  }
  return (
      <Modal open={open} onClose={onClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Edit AllRounder</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <TextInput label='Player Name' placeholder="Player Name" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />
                    <SelectInput label='Player Status' value={playerStatus} onChange={(e)=>setPlayerStatus(e.target.value)} options={playerstatus.toLowerCase()=='active'?['active','retired']:['retired','active']}/>
                    <SelectInput label='Bowling Hand' value={bowlHand} onChange={(e)=>setBowlHand(e.target.value)} options={bowlHand?.toLowerCase()=='left'?['left','right']:['right','left']}/>
                    <SelectInput label='Batting Hand' value={batHand} onChange={(e)=>setBatHand(e.target.value)} options={batHand?.toLowerCase()=='left'?['left','right']:['right','left']}/>
                    <SelectInput label='Bowling Type' value={bowlType} onChange={(e)=>setBowlType(e.target.value)} options={bowlTypes}/>
                    <TextInput label='Total ODI' placeholder="Total ODI" value={totalOdi} onChange={(e)=>setTotalOdi(e.target.value)} type='number'/>
                    <TextInput label='Total T20' placeholder="Total T20" value={totalT20} onChange={(e)=>setTotalT20(e.target.value)} type='number'/>
                    <TextInput label='Total Test' placeholder="Total Test" value={totalTest} onChange={(e)=>setTotalTest(e.target.value)} type='number'/>
                    {teamid &&
                    <TextInput  label='Rank' placeholder="All Rounder Rank" value={allrounderRank} onChange={(e)=>setAllrounderRank(e.target.value)} type='number'/>
                    }
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={isLoading||load}>{isLoading||load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal> 
    )
}

export default AllRounderModal