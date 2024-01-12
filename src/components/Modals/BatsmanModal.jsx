import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import TextInput from '../inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import PictureInput from '../inputs/PictureInput';
import SelectInput from '../inputs/SelectInput';
import { updateNumberOfMatches, updatePlayerPicture, updatePlayerRank } from '../../features/playerReducer';
import { getAllBatsman, removeCurrentBtsman, setBatsmanPicture, updateBatsman } from '../../features/batsmanReducer';
import { toast } from 'react-toastify';

const BatsmanModal = ({open,onClose,loading,batsman}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {playername,playerpicpath,bathand,playerstatus,totalodi,totalt20i,totaltest,playerid,battingrank, bowlingrank, teamid,allrounderrank}=batsman;
  const {isError,isLoading}=useSelector(state=>state.batsman);
  const [picture,setPicture]=useState(playerpicpath);
  const [playerName,setPlayerName]=useState(playername);
  const [batHand,setBatHand]=useState(bathand);
  const [playerStatus,setPlayerStatus]=useState(playerstatus);
  const [totalOdi,setTotalOdi]=useState(totalodi);
  const [totalT20,setTotalT20]=useState(totalt20i);
  const [totalTest,setTotalTest]=useState(totaltest);
  const [battingRank,setBattingRank]=useState(battingrank);
  const [load,setLoad]=useState(false);
  const dispatch=useDispatch();
  const handleSave=()=>{
    if(picture==playerpicpath &&playerName==playername && batHand==bathand && playerStatus==playerstatus && totalOdi==totalodi && totalT20==totalt20i && totalTest==totaltest && battingRank==battingrank){
      toast.info('No changes made');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        dispatch(removeCurrentBtsman());
        onClose();
      }, 3000);
      return;
    }
    if(picture==""){
      toast.error('Please select a picture');
      return;
    }
    if(playerName.trim()==''||batHand.trim()==''||playerStatus.trim()==''){
      toast.error('Please fill all the fields');
      return;
    }
    if(battingRank<=0){
      toast.error('Rank should be greater than 0');
      return;
    }
    //check if rank jump is not greater than 5
    if(Math.abs(battingRank-battingrank)>3){
      toast.error('Rank jump should not be greater than 3');
      return;
    }

    if(picture!=playerpicpath){
      dispatch(setBatsmanPicture({id:playerid,picture}));
      dispatch(updatePlayerPicture({id:playerid,picturePath:picture}));
    }
    dispatch(updateNumberOfMatches({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,hand:batHand,type:"batsman"}));
    if(battingRank!=battingrank){
      dispatch(updatePlayerRank({id:playerid,battingrank:battingRank,bowlingrank,allrounderrank}));
    }
    if(!isError){
      toast.success('Batsman Updated Successfully');
      dispatch(updateBatsman({id:playerid,totalOdi,totalT20,totalTest,status:playerStatus,name:playerName,hand:batHand,battingRank}))
      setLoad(true);
      setTimeout(() => {
        dispatch(getAllBatsman());
        setLoad(false);
        dispatch(removeCurrentBtsman());
        onClose();
      }, 3000);
    }else{
      toast.error('Something went wrong');
    }
  }
  return (
      <Modal open={open} onClose={onClose} width={"600px"} height={"auto"}>
        <div className='p-12'>

              <div className="flex flex-col items-center justify-center gap-3">
                  <h3 className='text-3xl font-bold pb-3'>Edit Batsman</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-2">
                    <TextInput label='Player Name' placeholder="Player Name" value={playerName} onChange={(e)=>setPlayerName(e.target.value)} />
                    <SelectInput label='Player Status' value={playerStatus} onChange={(e)=>setPlayerStatus(e.target.value)} options={playerstatus.toLowerCase()=='active'?['active','retired']:['retired','active']}/>
                    <SelectInput label='Batting Hand' value={batHand} onChange={(e)=>setBatHand(e.target.value)} options={bathand?.toLowerCase()=='left'?['left','right']:['right','left']}/>
                    {/* <TextInput label='Total ODI' placeholder="Total ODI" value={totalOdi} onChange={(e)=>setTotalOdi(e.target.value)} type='number'/>
                    <TextInput label='Total T20' placeholder="Total T20" value={totalT20} onChange={(e)=>setTotalT20(e.target.value)} type='number'/>
                    <TextInput label='Total Test' placeholder="Total Test" value={totalTest} onChange={(e)=>setTotalTest(e.target.value)} type='number'/> */}
                    {teamid &&
                    <TextInput label='Rank' placeholder="Batting Rank" value={battingRank} onChange={(e)=>setBattingRank(e.target.value)} type='number'/>
                    }
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={isLoading||load}>{isLoading||load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal>
  )
}

export default BatsmanModal