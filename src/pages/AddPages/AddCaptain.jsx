import React, { useEffect, useState } from 'react'
import SelectInput from '../../components/inputs/SelectInput';
import TextInput from '../../components/inputs/TextInput';
import { toast } from 'react-toastify';
import { createCaptain, getAllCaptains } from '../../features/captainReducer';
import { getAllTeams } from '../../features/teamReducer';
import { getAllPlayers } from '../../features/playerReducer';
import { useDispatch, useSelector } from 'react-redux';
import captainImage from "../../images/captain.jpeg"
import HeroImage from '../../components/HeroImage';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { getAllCountries } from '../../features/countryReducer';
const AddCaptain = () => {
 const [allAvailableTeams,setAllAvailableTeams]=useState([]);
    const {allTeams}=useSelector(state=>state.team);
    const {allPlayers}=useSelector(state=>state.player);
    const {allCountries}=useSelector(state=>state.country);
    const {isError,allCaptains}=useSelector(state=>state.captain);
    const [allPlayersForTeam,setAllPlayersForTeam]=useState([]);
    const [playerName,setPlayerName]=useState('');
    const [playerId,setPlayerId]=useState(null);
    const [playerRanks,setPlayerRanks]=useState({battingrank:0,bowlingrank:0,allrounderrank:0});
    const [team,setTeam]=useState('');
    const [teamId,setTeamId]=useState('');
    const [load,setLoad]=useState(false);
    const [totalMatchesAsCaptain,setTotalMatchesAsCaptain]=useState(0);
    const [totalWins,setTotalWins]=useState(0);
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
        }      dispatch(getAllCaptains());
        dispatch(getAllTeams());
        dispatch(getAllPlayers());
        dispatch(getAllCountries());
    },[])
    useEffect(()=>{
        if(allCountries.length>0){
            let all=allCountries.map(country=>country.country);
            setAllAvailableTeams(all);
            setTeam(all[0]);
        }
    },[allCountries])
    useEffect(()=>{
        if(allPlayers.length>0){
            //remove players already registered as captain
            let players=allPlayers.filter(player=>!allCaptains.find(captain=>captain.playerid==player.playerid));
            setAllPlayersForTeam(players.filter(player=>player.country?.toLowerCase()==team?.toLowerCase()));
            setTotalMatchesAsCaptain(0);
            setTotalWins(0);
            let player=players[0];
            setPlayerName(player?.playername||'');
            setPlayerId(player?.playerid||null);
            setPlayerRanks({battingrank:player?.battingrank||0,bowlingrank:player?.bowlingrank||0,allrounderrank:player?.allrounderrank||0});
        }else{
            setAllPlayersForTeam([]);
            setPlayerId(null);
            setPlayerName('');
            setPlayerRanks({battingrank:0,bowlingrank:0,allrounderrank:0});
        }
    },[team,allPlayers])
    const handleTeamChange=(e)=>{
        let team=e.target.value;
        setTeam(team);
        let all=allPlayers.filter(player=>!allCaptains.find(captain=>captain.playerid==player.playerid));
        all=allPlayers.filter(player=>player.country?.toLowerCase()===team.toLowerCase());
        setAllPlayersForTeam(all);
        setPlayerName(all[0]?.playername||'');
        setPlayerId(all[0]?.playerid||null);
    }
    const handlePlayerChange=(e)=>{
        let playername=e.target.value;
        setPlayerName(playername);
        let player=allPlayers.find(player=>player.playername===playername);
        setPlayerId(player.playerid);
        setPlayerRanks({battingrank:player.battingrank||0,bowlingrank:player.bowlingrank||0,allrounderrank:player.allrounderrank||0});
    }
    const handleSave=()=>{
        if(!playerId || !team){
            toast.error('Please enter all the fields');
            return;
        }
        if(totalMatchesAsCaptain<0 || totalWins<0){
            toast.error('Please enter valid values');
            return;
        }
        if(totalMatchesAsCaptain<totalWins){
            toast.error('Total wins cannot be greater than total matches as captain');
            return;
        }
        setLoad(true);
        dispatch(createCaptain({playerId,matchesascaptain:totalMatchesAsCaptain,totalwins:totalWins}));
        if(isError){
            toast.error('Something went wrong');
            return;
        }
        toast.success('Registered successfully');
        setTimeout(()=>{
            setLoad(false);
            navigate("/captains")
            
        },2000);
        
    }
    const handleCancel=()=>{
        setLoad(true);
        toast.info('Redirecting to captains page');
        setTimeout(()=>{
            setLoad(false);
            navigate("/captains")
        },2000);

    }
  return (
    <Wrapper>
      <HeroImage src={captainImage}/>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Captain</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-3 gap-x-8 gap-y-1">
                    <SelectInput label="Select Team" full required  value={team} onChange={handleTeamChange} options={allAvailableTeams} />
                    <SelectInput label="Select Player" full required value={playerName} onChange={handlePlayerChange} options={allPlayersForTeam.map(player=>player.playername)} />
                    <TextInput label="Matches As Captain" value={totalMatchesAsCaptain} onChange={e=>setTotalMatchesAsCaptain(e.target.value)} type='number'/>
                    <TextInput label="Total Wins" value={totalWins} onChange={e=>setTotalWins(e.target.value)} type='number'/>
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

export default AddCaptain
const Wrapper=styled.div`
display: grid;
grid-template-rows: 40vh 1fr;
.img{
    object-position:bottom -650px right 0px ;
}
    
`