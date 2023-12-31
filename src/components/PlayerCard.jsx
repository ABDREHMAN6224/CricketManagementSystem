import React, { useEffect, useState } from 'react'
import {FaCheck, FaEdit} from "react-icons/fa"
import AddScoreModal from './Modals/addModals/AddScoreModal';
const PlayerCard = ({player,match_id,type,setTeamPlayersInfo,label="Add Record"}) => {
  useEffect(()=>{
  },[player])
    const [done,setDone]=useState(false);
    const [openScorecard,setOpenScorecard]=useState(false);
    const [p,setP]=useState(player);
    useEffect(()=>{
    },[p,player])
    useEffect(()=>{
      if(JSON.parse(localStorage.getItem(`player_${player.playerid}`))?.playerid){
        setP(JSON.parse(localStorage.getItem(`player_${p.playerid}`)));
      }else{
        setP(player);
      }
    },[done,openScorecard])
  return (
<div className={done?"card w-45 bg-green-100 shadow-lg w-full max-h-[60px] ":"card w-45 bg-base-200 shadow-lg w-full max-h-[60px]"}>
  <div className="card-body m-0 p-4 flex flex-row gap-x-5 justify-between items-center opacity-80 max-h-[60px]">
    <div>
    <div className="flex items-center space-x-3">
        <div className="inline-flex w-10 h-10">
            <img className="w-10 h-10 object-cover rounded-full" src={p.playerpicpath} alt="" />
        </div>
    <h6 className="m-0 p-0 font-semibold">{p.playername}
    {player.isCaptain?<span className='font-semibold  text-sm'>(C)</span>:
    player.isKeeper?<span className='font-semibold ml-2 text-sm'>(Wk)</span>:''}
    
    </h6>
    <div className='flex items-center gap-5 justify-center mx-2'>
        <p className="m-0 p-0">Runs:<span className='pl-1'>{p?.runs?`(${p.runs} / ${p.balls})`:"0/0"}</span></p>
        <p className="m-0 p-0">Wickets:<span className='pl-1'>{p?.wickets?`(${p.runs_given} - ${p.wickets})`:"0-0"}</span></p>
        <p className="m-0 p-0">SR:<span className='pl-1'>{p?.runs?(p.runs/p.balls).toFixed(2):"0.00"}</span></p>
        <p className="m-0 p-0">Eco:<span className='pl-1'>{p?.overs?(p.runs_given/p.overs).toFixed(2):"0.00"}</span></p>
        
    </div>
    </div>
    </div>
      <button className={done?"":"btn btn-outline btn-sm"}
      onClick={()=>setOpenScorecard(true)}
      >
    {done?<FaEdit/>:label}
      </button>
  </div>
    {openScorecard && <AddScoreModal setTeamPlayersInfo={setTeamPlayersInfo} setDone={setDone} type={type} open={openScorecard} onClose={()=>setOpenScorecard(false)} player={p} match_id={match_id}/>}
</div>  )
}

export default PlayerCard