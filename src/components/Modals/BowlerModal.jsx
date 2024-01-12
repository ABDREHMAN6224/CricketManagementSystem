import React, { useState } from 'react'
import Modal from './Modal'
import PictureInput from '../inputs/PictureInput'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { getAllBowlers, removeCurrentBowler, setBowlerPicture, updateBowler } from '../../features/bowlerReducer'
import { toast } from 'react-toastify';
import { updateNumberOfMatches, updatePlayerPicture, updatePlayerRank } from '../../features/playerReducer';

const BowlerModal = ({open,onClose,loading,bowler}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const bowlTypes=['Fast','Medium','Off-Spin','Leg-Spin']
  const {playername,playerpicpath,bowlhand,bowltype,teamid,playerstatus,totalodi,totalt20i,totaltest,playerid,battingrank, bowlingrank, allrounderrank}=bowler;
  const {isError,isLoading}=useSelector(state=>state.bowler);
  const [picture,setPicture]=useState(playerpicpath);
  const [playerName,setPlayerName]=useState(playername);
  const [bowlHand,setBowlHand]=useState(bowlhand||"Right");
  const [bowlType,setBowlType]=useState(bowltype||"Left");
  const [playerStatus,setPlayerStatus]=useState(playerstatus);
  const [totalOdi,setTotalOdi]=useState(totalodi);
  const [totalT20,setTotalT20]=useState(totalt20i);
  const [totalTest,setTotalTest]=useState(totaltest);
  const [bowlingRank,setBowlingRank]=useState(bowlingrank);
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  
  const handleSave=()=>{
    if(playerName==playername && bowlHand==bowlhand && playerStatus==playerstatus && totalOdi==totalodi && totalT20==totalt20i && totalTest==totaltest && bowlingRank==bowlingrank && bowlType==bowltype && picture==playerpicpath){
      toast.info('No changes made');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        dispatch(removeCurrentBowler());
        onClose();
      }, 3000);
      return;
    }
    if(picture==""){
      toast.error('Please select a picture');
      return;
    }
    if(playerName==''||bowlHand==''||playerStatus==''||bowlType==''||picture==''){
      toast.error('Please fill all the fields');
      return;
    }
    if(bowlingRank<=0){
      toast.error('Rank should be greater than 0');
      return;
    }
    //check if rank jump is not greater than 5
    if(Math.abs(bowlingRank-bowlingrank)>3){
      toast.error('Rank jump should not be greater than 3');
      return;
    }
    if(picture!=playerpicpath){
      dispatch(setBowlerPicture({id:playerid,picture}));
    }
    dispatch(updatePlayerPicture({id:playerid,picturePath:picture}));
    dispatch(updateNumberOfMatches({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,bowlhand:bowlHand,type:"bowler",bowltype:bowlType}));
    if(bowlingRank!=bowlingrank){
      dispatch(updatePlayerRank({id:playerid,bowlingrank:bowlingRank,battingrank,allrounderrank}));
    }
    if(!isError){
      toast.success('Bowler Updated Successfully');
      dispatch(updateBowler({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,hand:bowlHand,bowlingRank,bowlingType:bowlType}))
      setLoad(true);
      setTimeout(() => {
        dispatch(getAllBowlers());
        setLoad(false);
        dispatch(removeCurrentBowler());
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
                  <h3 className='text-3xl font-bold pb-3'>Edit Bowler</h3>
                <div className="flex flex-col items-center justify-center gap-12">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                    <TextInput label='Player Name' placeholder="Player Name" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />
                    <SelectInput label='Player Status' value={playerStatus} onChange={(e)=>setPlayerStatus(e.target.value)} options={playerstatus?.toLowerCase()=='active'?['active','retired']:['retired','active']}/>
                    <SelectInput label='Bowling Hand' value={bowlHand} onChange={(e)=>setBowlHand(e.target.value)} options={bowlHand?.toLowerCase()=='left'?['left','right']:['right','left']}/>
                    <SelectInput label='Bowling Type' value={bowlType} onChange={(e)=>setBowlType(e.target.value)} options={bowlTypes}/>
                    {/* <TextInput label='Total ODI' placeholder="Total ODI" value={totalOdi} onChange={(e)=>setTotalOdi(e.target.value)} type='number'/>
                    <TextInput label='Total T20' placeholder="Total T20" value={totalT20} onChange={(e)=>setTotalT20(e.target.value)} type='number'/>
                    <TextInput label='Total Test' placeholder="Total Test" value={totalTest} onChange={(e)=>setTotalTest(e.target.value)} type='number'/> */}
                    {teamid&&
                    <TextInput  label='Rank' placeholder="Bowling Rank" value={bowlingRank} onChange={(e)=>setBowlingRank(e.target.value)} type='number'/>
                    }
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={isLoading||load}>{isLoading||load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal> 
    )
}

export default BowlerModal