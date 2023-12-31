import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAllTeams } from '../../features/teamReducer';
import { getAllPlayers } from '../../features/playerReducer';
import { createWicketKeeper, getAllWicketKeepers } from '../../features/wicketKeeperReducers';
import SelectInput from '../../components/inputs/SelectInput';
import TextInput from '../../components/inputs/TextInput';
import keeper from "../../images/keeper.jpeg"
import HeroImage from '../../components/HeroImage';
const AddWicketKeeper = () => {
  const [allAvailableTeams,setAllAvailableTeams]=useState([]);
    const {allTeams}=useSelector(state=>state.team);
    const {allPlayers}=useSelector(state=>state.player);
    const {isError,allWicketKeepers}=useSelector(state=>state.wicketKeeper);
    const [allPlayersForTeam,setAllPlayersForTeam]=useState([]);
    const [playerName,setPlayerName]=useState('');
    const [playerId,setPlayerId]=useState(null);
    const [playerRanks,setPlayerRanks]=useState({battingrank:0,bowlingrank:0,allrounderrank:0});
    const [team,setTeam]=useState('');
    const [teamId,setTeamId]=useState('');
    const [load,setLoad]=useState(false);
    const [totalStumps,setTotalStumps]=useState(0);
    const [totalCatches,setTotalCatches]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager'&&user.userrole.toLowerCase()=="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }      dispatch(getAllWicketKeepers());
        dispatch(getAllTeams());
        dispatch(getAllPlayers());
    },[])
    useEffect(()=>{
        if(allTeams.length>0){
            setAllAvailableTeams(allTeams.map(team=>team.teamname));
            let id=allTeams[0].teamid;
            setTeam(allTeams[0].teamname);
            setTeamId(id);
        }
    },[allTeams])
    useEffect(()=>{
        if(allPlayers.length>0){
            //remove players already registered as wicket keepers
            let players=allPlayers.filter(player=>!allWicketKeepers.find(wicketKeeper=>wicketKeeper.playerid==player.playerid));
            setAllPlayersForTeam(players.filter(player=>player.country.toLowerCase()===team.toLowerCase()));
            setTotalCatches(0);
            setTotalStumps(0);
            let player=players.filter(player=>player?.teamid===teamId)[0];
            setPlayerName(player?.playername||'');
            setPlayerId(player?.playerid||null);
            setPlayerRanks({battingrank:player?.battingrank||0,bowlingrank:player?.bowlingrank||0,allrounderrank:player?.allrounderrank||0});
        }else{
            setAllPlayersForTeam([]);
            setPlayerId(null);
            setPlayerName('');
            setPlayerRanks({battingrank:0,bowlingrank:0,allrounderrank:0});
        }
    },[teamId,allPlayers])
    const handleTeamChange=(e)=>{
        let team=e.target.value;
        setTeam(team);
        let id=allTeams.find(t=>t.teamname==team)?.teamid;
        setTeamId(id);
    }
    const handlePlayerChange=(e)=>{
        let playername=e.target.value;
        setPlayerName(playername);
        let player=allPlayers.find(player=>player.playername===playername);
        setPlayerId(player.playerid);
        setPlayerRanks({battingrank:player.battingrank||0,bowlingrank:player.bowlingrank||0,allrounderrank:player.allrounderrank||0});
    }
    const handleSave=()=>{
        if(!playerId || !teamId){
            toast.error('Please enter all the fields');
            return;
        }
        if(totalCatches<0 || totalStumps<0){
            toast.error('Total catches and total stumps cannot be negative');
            return;
        }
        setLoad(true);
        dispatch(createWicketKeeper({playerid:playerId,catches:totalCatches,stumpings:totalStumps}));
        if(isError){
            toast.error('Something went wrong');
            return;
        }
        toast.success('Registered successfully');
        setTimeout(()=>{
            setPlayerName('');
            setPlayerId(null);
            setPlayerRanks({battingrank:0,bowlingrank:0,allrounderrank:0});
            setTotalCatches(0);
            setTotalStumps(0);
            setLoad(false);
        },2000);
        
    }
    const handleCancel=()=>{
        setLoad(true);
        toast.info('Redirecting to wicket keepers page');
        setTimeout(()=>{
            setLoad(false);
            navigate("/wicketkeepers")
        },2000);

    }
  return (
    <Wrapper>
        {/* //place keeper image here covering 30% of the screen */}
         <HeroImage src={keeper}/>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Wicket Keeper</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                    <SelectInput label="Select Team" full required  value={team} onChange={handleTeamChange} options={allAvailableTeams} />
                    <SelectInput label="Select Player" full required value={playerName} onChange={handlePlayerChange} options={allPlayersForTeam.map(player=>player.playername)} />
                    <TextInput label="Total Stumps" value={totalStumps} onChange={e=>setTotalStumps(e.target.value)} type='number'/>
                    <TextInput label="Total Catches" value={totalCatches} onChange={e=>setTotalCatches(e.target.value)} type='number'/>
                    <TextInput label="Batting Rank" value={playerRanks.battingrank} onChange={e=>setPlayerRanks({...playerRanks,battingrank:e.target.value})} type='number' disabled/>
                    <TextInput label="Bowling Rank" value={playerRanks.bowlingrank} onChange={e=>setPlayerRanks({...playerRanks,bowlingrank:e.target.value})} type='number' disabled/>
                    <TextInput label="Allrounder Rank" value={playerRanks.allrounderrank} onChange={e=>setPlayerRanks({...playerRanks,allrounderrank:e.target.value})} type='number' disabled/>
                    <div></div>
                    <button className="btn btn-primary col-span-2" onClick={handleSave} disabled={load}>{load?"Please Wait...":"Register"}</button>
                     <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>
                  </div>
                </div>
              </div>
        </div>
    </Wrapper>
  )
}

export default AddWicketKeeper
const Wrapper=styled.div`
display: grid;
grid-template-rows: 45vh 1fr;
.img{
    object-position:bottom -630px right 0px ;
}
  
`