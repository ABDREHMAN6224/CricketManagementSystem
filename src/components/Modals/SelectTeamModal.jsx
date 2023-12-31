import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import Player from '../Player'
import { FaMinus, FaPlus } from 'react-icons/fa'
import { getTeamPlayers, removeCurrentTeam, updatePlayerTeam, updateTeam } from '../../features/teamReducer'
import { getAllCaptains } from '../../features/captainReducer'
import { getAllCoaches } from '../../features/coachesReducer'
import { getAllWicketKeepers } from '../../features/wicketKeeperReducers'
import { getPlayersWithNoTeam } from '../../features/playerReducer'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const SelectTeamModal = ({open,onClose,team,restrictions=false}) => {
    const {
        teamName:teamname,
        coachId:coachid,
        captainId:captainid,
        wicketKeeperId:wicketkeeperid,
        teamLogo:teampicpath,
        coachname:coachname,
        captain:captain,
        wicketkeeper:keeper
      }=team;
    const {playersWithNoTeams}=useSelector(state=>state.player);
    const {allCaptains}=useSelector(state=>state.captain);
    const {allCoaches}=useSelector(state=>state.coach);
    const {allWicketKeepers}=useSelector(state=>state.wicketKeeper);
    const {currentId,isError,isLoading,allTeams,currentTeamPlayers}=useSelector(state=>state.team);

      const [load,setLoad]=useState(false);
    const [selectedPlayers,setSelectedPlayers]=useState(currentTeamPlayers);//players selected for the team
    const [unSelectedPlayers,setUnSelectedPlayers]=useState(playersWithNoTeams);//players not selected for the team
    const [selectedPlayerIds,setSelectedPlayerIds]=useState(selectedPlayers.map(player=>player.playerid));//ids of players selected for the team
    const [unSelectedPlayerIds,setUnSelectedPlayerIds]=useState(unSelectedPlayers.map(player=>player.playerid));//ids of players not selected for the team
    const dispatch=useDispatch()
   useEffect(()=>{
    if(!currentId && !restrictions){
      return;
    }
    if(restrictions){
      dispatch(getTeamPlayers(team.teamId));
    }else{
      dispatch(getTeamPlayers(currentId));
    }
    dispatch(getAllCaptains());
    dispatch(getAllCoaches());
    dispatch(getAllWicketKeepers());
    dispatch(getPlayersWithNoTeam());
  },[currentId||team?.teamId])
  useEffect(()=>{
    setSelectedPlayers(currentTeamPlayers);
    setSelectedPlayerIds(currentTeamPlayers.map(player=>player.playerid));
  },[currentTeamPlayers])
  useEffect(()=>{
    //keep only those player where country and teamname is same
    let players=playersWithNoTeams.filter(player=>player.country==teamname);
    setUnSelectedPlayers(players);
    setUnSelectedPlayerIds(players.map(player=>player.playerid));
  },[playersWithNoTeams])
   const handleAdd=(playerid)=>{
    setSelectedPlayerIds([...selectedPlayerIds,playerid]);
    setUnSelectedPlayerIds(unSelectedPlayerIds.filter(id=>id!=playerid));
    let player=unSelectedPlayers.find(player=>player.playerid==playerid);
    setSelectedPlayers([...selectedPlayers,player]);
    setUnSelectedPlayers(unSelectedPlayers.filter(player=>player.playerid!=playerid));
  }
  const handleSub=(playerid)=>{
    setUnSelectedPlayerIds([...unSelectedPlayerIds,playerid]);
    setSelectedPlayerIds(selectedPlayerIds.filter(id=>id!=playerid));
    let player=selectedPlayers.find(player=>player.playerid==playerid);
    setUnSelectedPlayers([...unSelectedPlayers,player]);
    setSelectedPlayers(selectedPlayers.filter(player=>player.playerid!=playerid));
  }
  const handleSave=()=>{

    if(selectedPlayers.length>11){
      toast.error('Team can have max 11 players');
      return;
    }
    if(restrictions){
      //team should exactly have 11 players
      if(selectedPlayers.length!=11){
        toast.error('Team should have 11 players');
        return;
      }
    }
    //get playerids which have been removed from the team by comapring curentTeamPlayers and selectedPlayers
    let removedPlayerIds=currentTeamPlayers.filter(player=>!selectedPlayerIds.includes(player.playerid)).map(player=>player.playerid);
    //get playerids which have been added to the team by comapring curentTeamPlayers and selectedPlayers
    let addedPlayerIds=selectedPlayerIds.filter(id=>!currentTeamPlayers.map(player=>player.playerid).includes(id));
    //check if team has max 5 batsmen
    let batsmen=selectedPlayers.filter(player=>player.playertype=='Batsman');
    if(batsmen.length>5){
      toast.error('Team can have max 5 batsmen');
      return;
    }
    //check if team has max 5 bowlers
    let bowlers=selectedPlayers.filter(player=>player.playertype=='Bowler');
    if(bowlers.length>5){
      toast.error('Team can have max 5 bowlers');
      return;
    }

    //check if team has max 5 allrounder
    let allrounders=selectedPlayers.filter(player=>player.playertype=='Allrounder');
    if(allrounders.length>5){
      toast.error('Team can have max 5 allrounders');
      return;
    }
    for(let i=0;i<removedPlayerIds.length;i++){
      dispatch(updatePlayerTeam({playerId:removedPlayerIds[i],teamId:-1}))
    }
    for(let i=0;i<addedPlayerIds.length;i++){
      dispatch(updatePlayerTeam({playerId:addedPlayerIds[i],teamId:currentId||team?.teamId}))
    }
    
    dispatch(updateTeam({teamId:currentId||team?.teamId,teamName:teamname,coachId:coachid,teamLogo:teampicpath,wicketKeeperId:wicketkeeperid,captainId:captainid}))
    if(!isError){
      toast.success('Team Updated Successfully');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        dispatch(removeCurrentTeam());
        onClose();
      }, 3000);
    }else{
      toast.error('Something went wrong');
    }
  }
  return (
     <Modal open={open} onClose={onClose} autoClose={false} width="700px" height='auto'>
        <div className='p-8 w-full'>
          <div className='flex items-center flex-col justify-center'>
          <h2 className='text-3xl font-bold'>Select Players</h2>
            <div className='my-2 mt-2 w-40 h-40 rounded-full border-gray-500 '>
            <img src={teampicpath} className='w-full h-full rounded-full border-3 shadow-lg  object-cover' alt="" />
            </div>
          <h3 className='text-3xl font-bold'>{teamname}</h3>
          </div>
          <div className="flex flex-row items-baseline w-full justify-between gap-x-8">
                    <div className="selected-players w-full">
                      <h4 className="text-lg font-semibold p-0 m-0 w-full text-start mb-2">Selected Players: {selectedPlayers?.length}</h4>
                      <div className="flex flex-col items-center bg-stone-200 p-4 justify-start gap-2 max-h-[200px] min-h-[200px] overflow-x-hidden overflow-y-scroll w-full">
                        <div className='overflow-scroll w-full gap-y-2 flex flex-col min-h-[100px] '>
                        {selectedPlayers.map(player=>(
                        (player.playerid!=captainid && player.playerid!=wicketkeeperid)?
                          <div className="flex items-center justify-between w-full">
                                <Player player={player}/>
                             <div className="flex items-center justify-center w-5 h-5 rounded-full  hover:bg-stone-300 cursor-pointer text-red-500 hover:text-red-500 transition-all" onClick={()=>handleSub(player.playerid)}>
                              <FaMinus className="text-sm  cursor-pointer font-extrabold" />
                            </div>
                          </div>:
                          <div className="flex items-center justify-between w-full">
                              <Player player={player}/>
                            <p className='text-sm m-0 p-0 font-semibold'>{player.playerid==captainid?"C":"Wk"}</p>
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                    <div className="player-bank w-full">
                      <h4 className="text-lg font-semibold p-0 m-0 text-start mb-2">Player Bank: {unSelectedPlayers?.length}</h4>
                      <div className="flex flex-col items-center bg-stone-200 p-4 justify-start gap-2 max-h-[200px] min-h-[200px] overflow-x-hidden overflow-y-scroll w-full">
                        <div className='overflow-scroll w-full gap-y-2 flex flex-col min-h-[100px] '>
                                  {unSelectedPlayers.map(player=>(
                                    <div className="flex items-center justify-between w-full">
                                      <Player player={player}/>
                                      <div className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-stone-300 transition-all cursor-pointer text-green-500 hover:text-green-500" onClick={()=>handleAdd(player.playerid)}>
                                        <FaPlus className="text-sm cursor-pointer font-extrabold"/>
                                      </div>
                                    </div>
                                  ))}
                        </div>
                                
                        
                      </div>
                    </div>
                  </div>
                                <button className="btn btn-primary mt-4 btn-block" onClick={handleSave} disabled={isLoading||load}>{isLoading||load?"Please Wait ...":"Continue"}</button>
                  </div>
    </Modal>
  )
}

export default SelectTeamModal