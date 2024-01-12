import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import PictureInput from '../inputs/PictureInput'
import TextInput from '../inputs/TextInput'
import SelectInput from '../inputs/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { getAllCaptains } from '../../features/captainReducer'
import { getAllCoaches } from '../../features/coachesReducer'
import { getAllWicketKeepers } from '../../features/wicketKeeperReducers'
import { getTeamPlayers, removeCurrentTeam, setTeamPicture, updateCurrentTeam, updateCurrentTeamRank, updatePlayerTeam, updateTeam, updateTeamRank } from '../../features/teamReducer'
import { getPlayersWithNoTeam } from '../../features/playerReducer'
import {FaPlus,FaMinus} from "react-icons/fa"
import { GiCricketBat } from "react-icons/gi";
import { MdSportsCricket } from "react-icons/md";
import { BiSolidCricketBall } from "react-icons/bi";
import Player from '../Player'
const TeamModal = ({open,onClose,loading,team}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {teamid,teamname,teampicpath,captain,t20irank,odirank,testrank,coachname,keeper,captainid,coachid,wicketkeeperid}=team;
  const {isError,isLoading,allTeams,currentTeamPlayers}=useSelector(state=>state.team);
  const {playersWithNoTeams}=useSelector(state=>state.player);
  const {allCaptains}=useSelector(state=>state.captain);
  const {allCoaches}=useSelector(state=>state.coach);
  const {allWicketKeepers}=useSelector(state=>state.wicketKeeper);
  const [selectedPlayers,setSelectedPlayers]=useState(currentTeamPlayers);//players selected for the team
  const [unSelectedPlayers,setUnSelectedPlayers]=useState(playersWithNoTeams);//players not selected for the team
  const [selectedPlayerIds,setSelectedPlayerIds]=useState(selectedPlayers.map(player=>player.playerid));//ids of players selected for the team
  const [unSelectedPlayerIds,setUnSelectedPlayerIds]=useState(unSelectedPlayers.map(player=>player.playerid));//ids of players not selected for the team
  const [load,setLoad]=useState(false);
  const [picture,setPicture]=useState(teampicpath);
  const [teamName,setTeamName]=useState(teamname);
  const [captainName,setCaptainName]=useState(captain);
  const [captainId,setCaptainId]=useState(captainid);
  const [coachId,setCoachId]=useState(coachid);
  const [wicketKeeperId,setWicketKeeperId]=useState(wicketkeeperid);
  const [coachName,setCoachName]=useState(coachname);
  const [keeperName,setKeeperName]=useState(keeper);
  const [t20iRank,setT20iRank]=useState(t20irank);
  const [odiRank,setOdiRank]=useState(odirank);
  const [testRank,setTestRank]=useState(testrank);
  const [allTeamCaptains,setAllTeamCaptains]=useState([]);
  const [allTeamCoaches,setAllTeamCoaches]=useState([]);
  const [allTeamKeepers,setAllTeamKeepers]=useState([]);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getTeamPlayers(teamid));
    dispatch(getAllCaptains());
    dispatch(getAllCoaches());
    dispatch(getAllWicketKeepers());
    dispatch(getPlayersWithNoTeam());
  },[teamid])
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
  useEffect(()=>{
    if(allCaptains.length>0){
      
      let allCaptainsForTeam=allCaptains.filter(captain=>captain.country.toLowerCase()==teamname.toLowerCase());
      //get names of those captains
      let allCaptainsNames=allCaptainsForTeam.map(captain=>({captainid:captain.playerid,playername:captain.playername}));
      //remove current captain from the list
      allCaptainsNames=allCaptainsNames.filter(captain=>captain.playername!=captainName);
      //place current captain at the top
      allCaptainsNames.unshift({captainid:captainId,playername:captainName});
      //remove null values
      allCaptainsNames=allCaptainsNames.filter(captain=>captain.playername);
      //set the state
      setAllTeamCaptains(allCaptainsNames);
      setCaptainName(allCaptainsNames[0].playername);
      setCaptainId(allCaptainsNames[0].captainid);
    }
  },[allCaptains])
  useEffect(()=>{
    if(allCoaches.length>0){
      //get names of those coaches
      let allCoachesNames=allCoaches.map(coach=>({coachid:coach.coachid,coachname:coach.coachname}));

      allCoachesNames=allCoachesNames.filter(coach=>!allTeams.map(team=>team.coachid).includes(coach.coachid));
      //remove current coach from the list
      allCoachesNames=allCoachesNames.filter(coach=>coach.coachname!=coachName);
      //place current coach at the top
      allCoachesNames.unshift({coachid:coachId,coachname:coachName});
      //remove coaches already assigned to other teams
      //set the state
      setAllTeamCoaches(allCoachesNames);
    }
  },[allCoaches])
  useEffect(()=>{
    if(allWicketKeepers.length>0){
      let allKeepers=allWicketKeepers.filter(keeper=>keeper.country.toLowerCase()==teamname.toLowerCase());
      //get names of those keepers
      let allKeepersNames=allKeepers.map(keeper=>({wicketkeeperid:keeper.playerid,playername:keeper.playername}));
      //remove current keeper from the list
      if(keeperName){
      allKeepersNames=allKeepersNames.filter(keeper=>keeper.playername!=keeperName);
      //place current keeper at the top
      allKeepersNames.unshift({wicketkeeperid:wicketKeeperId,playername:keeperName});
      }//set the state
      setAllTeamKeepers(allKeepersNames);
    }
  },[allWicketKeepers])
  
  const handleSave=()=>{
    if(teamName==teamname  && captainName==captain && coachName==coachname && keeperName==keeper && t20iRank==t20irank && odiRank==odirank && testRank==testrank && picture==teampicpath && selectedPlayers==currentTeamPlayers && unSelectedPlayers==playersWithNoTeams){
      toast.info('No changes made');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        onClose();
      }, 3000);
      return;
    }
    if(teamName.trim()==''||captainName==''||!coachName ||keeperName==''){
      toast.error('Please fill all the fields');
      return;
    }
    if(t20iRank<=0 || odiRank<=0 || testRank<=0){
      toast.error('Rank should be greater than 0');
      return;
    }
    //check if rank jump is not greater than 5
    if(Math.abs(t20iRank-t20irank)>3 || Math.abs(odiRank-odirank)>3 || Math.abs(testRank-testrank)>3){
      toast.error('Rank jump should not be greater than 3');
      return;
    }
    //check if team name already exists
    let teamNameExists=allTeams.find(team=>team.teamname==teamName && team.teamid!=teamid);
    if(teamNameExists){
      toast.error('Team name already exists');
      return;
    }
    //selected players should be max 11
    if(selectedPlayers.length!=11){
      toast.error('Please select 11 players for the team');
      return;
    }

    //get playerids which have been removed from the team by comapring curentTeamPlayers and selectedPlayers
    let removedPlayerIds=currentTeamPlayers.filter(player=>!selectedPlayerIds.includes(player.playerid)).map(player=>player.playerid);
    //get playerids which have been added to the team by comapring curentTeamPlayers and selectedPlayers
    let addedPlayerIds=selectedPlayerIds.filter(id=>!currentTeamPlayers.map(player=>player.playerid).includes(id));

    //extarct id of captain,coach and keeper
    let cptainId=allTeamCaptains.find(captain=>captain.playername==captainName).captainid;
    let cachId=allTeamCoaches.find(coach=>coach.coachname==coachName).coachid;
    let wcketKeeperId=allTeamKeepers.find(keeper=>keeper.playername.toLowerCase()==keeperName?.toLowerCase()).wicketkeeperid;
    //check if captain is already assigned to another team
    let captainExists=allTeams.find(team=>team.captainid==cptainId && team.teamid!=teamid);
    if(captainExists){
      toast.error('Captain already assigned to another team');
      return;
    }
    //check if coach is already assigned to another team
    let coachExists=allTeams.find(team=>team.coachid==cachId && team.teamid!=teamid);
    if(coachExists){
      toast.error('Coach already assigned to another team');
      return;
    }
    //check if keeper is already assigned to another team
    let keeperExists=allTeams.find(team=>team.wicketkeeperid==wcketKeeperId && team.teamid!=teamid);
    if(keeperExists){
      toast.error('Keeper already assigned to another team');
      return;
    }
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
    if(picture!=teampicpath){
      dispatch(setTeamPicture({id:teamid,picture}));
    }
    for(let i=0;i<removedPlayerIds.length;i++){
      dispatch(updatePlayerTeam({playerId:removedPlayerIds[i],teamId:-1}))
    }
    for(let i=0;i<addedPlayerIds.length;i++){
      dispatch(updatePlayerTeam({playerId:addedPlayerIds[i],teamId:teamid}))
    }
    dispatch(updateTeam({teamId:teamid,teamName,coachId:cachId,teamLogo:picture,wicketKeeperId:wcketKeeperId,captainId:cptainId}))
    if(t20iRank!=t20irank || odiRank!=odirank || testRank!=testrank){
      dispatch(updateTeamRank({teamId:teamid,t20irank:odiRank,odirank:odiRank,testrank:testRank}));
      dispatch(updateCurrentTeamRank({teamId:teamid,t20irank:odiRank,odirank:odiRank,testrank:testRank}));
    }
    if(!isError){
      toast.success('Team Updated Successfully');
      dispatch(updateCurrentTeam({id:teamid,teamName,captainName,coachName,t20rank:t20iRank,odirank:odiRank,testrank:testRank}));
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
  const handleClose=()=>{
      dispatch(removeCurrentTeam());
      onClose();
  }
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
  const hanldeCaptainChange=(e)=>{
    setCaptainName(e.target.value);
    let id=allTeamCaptains.find(captain=>captain.playername==e.target.value).captainid;
    setCaptainId(id);
    //check if player is in selected players; if not add it
    let player=selectedPlayers.find(player=>player.playerid==id);
    if(!player){
      player=allCaptains.find(captain=>captain.playername==e.target.value);
      setSelectedPlayers([...selectedPlayers,player]);
      setSelectedPlayerIds([...selectedPlayerIds,id]);
    }
    //remove player from unselected players
    setUnSelectedPlayers(unSelectedPlayers.filter(player=>player.playerid!=id));
    setUnSelectedPlayerIds(unSelectedPlayerIds.filter(id=>id!=id));

  }
  const handleWicketKeeperChange=(e)=>{
    setKeeperName(e.target.value);
    let id=allTeamKeepers.find(keeper=>keeper.playername==e.target.value).wicketkeeperid;
    setWicketKeeperId(id);
    //check if player is in selected players; if not add it
    let player=selectedPlayers.find(player=>player.playerid==id);
    if(!player){
      player=allWicketKeepers.find(keeper=>keeper.playername==e.target.value);
      setSelectedPlayers([...selectedPlayers,player]);
      setSelectedPlayerIds([...selectedPlayerIds,id]);
    }
    //remove player from unselected players
    setUnSelectedPlayers(unSelectedPlayers.filter(player=>player.playerid!=id));
    setUnSelectedPlayerIds(unSelectedPlayerIds.filter(id=>id!=id));
  }
  return (
      <Modal open={open} onClose={handleClose} width={"700px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Edit Team</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <div className='flex flex-col items-center justify-center gap-2'>
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                      <h3 className="text-2xl font-bold p-0 m-0">{teamName}</h3>
                  </div>

                  <div className="grid grid-cols-3 gap-x-6 gap-y-1">
                    <SelectInput label='Captain' value={captainName} onChange={hanldeCaptainChange} options={allTeamCaptains.map(t=>t.playername)}/>
                    <SelectInput label='Coach' value={coachName} onChange={(e)=>setCoachName(e.target.value)} options={allTeamCoaches.map(a=>a.coachname)}/>
                    <SelectInput label='Wicket Keeper' value={keeperName} onChange={handleWicketKeeperChange} options={allTeamKeepers.map(k=>k.playername)}/>
                    <TextInput  label='ODI Rank' placeholder="ODI Rank" value={odiRank} onChange={(e)=>setOdiRank(e.target.value)} type='number'/>
                    <TextInput  label='T20 Rank' placeholder="T20 Rank" value={t20iRank} onChange={(e)=>setT20iRank(e.target.value)} type='number'/>
                    <TextInput  label='Test Rank' placeholder="Test Rank" value={testRank} onChange={(e)=>setTestRank(e.target.value)} type='number'/>
                  </div>
                  {/* add horizontal rule */}
                  <hr className="w-full border-1 border-gray-300 my-[-4px]" />
                  {/* show players of current team along with players having no teams. with checkbox to add or remove players from the team */}
                  <div className="flex flex-row items-baseline w-full justify-between gap-x-2">
                    <div className="selected-players w-full">
                      <h4 className="text-lg font-semibold p-0 m-0 text-start">Selected Players: {selectedPlayers?.length}</h4>
                      <div className="flex flex-col items-center bg-stone-100 p-4 justify-center gap-2 max-h-[120px] min-h=[120px] overflow-x-hidden overflow-y-scroll w-full">
                        <div className='overflow-scroll w-full gap-y-2 flex flex-col min-h-[100px] '>
                        {selectedPlayers.map(player=>(
                        (player.playerid!=captainId && player.playerid!=wicketKeeperId)?
                          <div className="flex items-center justify-between w-full">
                                <Player player={player}/>
                            <div className="flex items-center justify-center w-5 h-5 rounded-full  hover:bg-stone-300 cursor-pointer text-red-500 hover:text-red-500 transition-all" onClick={()=>handleSub(player.playerid)}>
                              <FaMinus className="text-sm  cursor-pointer font-extrabold" />
                            </div>
                          </div>:
                          <div className="flex items-center justify-between w-full">
                              <Player player={player}/>
                            <p className='text-sm m-0 p-0 font-semibold'>{player.playerid==captainId?"C":"Wk"}</p>
                          </div>
                        ))}
                      </div>
                      </div>
                    </div>
                    <div className="player-bank w-full">
                      <h4 className="text-lg font-semibold p-0 m-0 text-start">Player Bank: {unSelectedPlayers?.length}</h4>
                      <div className="flex flex-col items-center bg-stone-100 p-4 justify-center gap-2 max-h-[120px] min-h=[120px] overflow-x-hidden overflow-y-scroll w-full">
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
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={isLoading||load}>{isLoading||load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal> 
    )
}

export default TeamModal