import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux';
import { getAllTeams } from '../../../features/teamReducer';
import { getAllPlayers } from '../../../features/playerReducer';
import { createCaptain, getAllCaptains } from '../../../features/captainReducer';
import SelectInput from '../../inputs/SelectInput';
import TextInput from '../../inputs/TextInput';
import { toast } from 'react-toastify';
import { getAllCountries } from '../../../features/countryReducer';

const AddCaptainModal = ({open,onClose,viewOnly=false}) => {
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
    useEffect(()=>{
        dispatch(getAllTeams());
        dispatch(getAllPlayers());
        dispatch(getAllCountries());
        dispatch(getAllCaptains());
    },[])
    useEffect(()=>{
        if(allTeams.length>0){
            setAllAvailableTeams(allCountries.map(team=>team.country));
            let id=allTeams[0].teamid;
            setTeam(allTeams[0].teamname);
            setTeamId(id);
        }
    },[allTeams])
    useEffect(()=>{
        if(allPlayers.length>0){
            //remove players already registered as captain
            let players=allPlayers.filter(player=>!allCaptains.find(captain=>captain.playerid==player.playerid));
            setAllPlayersForTeam(players.filter(player=>player.teamid===teamId));
            setTotalMatchesAsCaptain(0);
            setTotalWins(0);
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
            onClose();
        },2000);
        
    }
  return (
    <Modal open={open} onClose={onClose} width="700px" height='auto'>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>{viewOnly?"Captain Details":"Register Captain"}</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <SelectInput disabled={viewOnly} label="Select Team" full required  value={team} onChange={handleTeamChange} options={allAvailableTeams} />
                    <SelectInput disabled={viewOnly} label="Select Player" full required value={playerName} onChange={handlePlayerChange} options={allPlayersForTeam.map(player=>player.playername)} />
                    <TextInput disabled={viewOnly} label="Matches As Captain" value={totalMatchesAsCaptain} onChange={e=>setTotalMatchesAsCaptain(e.target.value)} type='number'/>
                    <TextInput disabled={viewOnly} label="Total Wins" value={totalWins} onChange={e=>setTotalWins(e.target.value)} type='number'/>
                    <TextInput  label="Batting Rank" value={playerRanks.battingrank} onChange={e=>setPlayerRanks({...playerRanks,battingrank:e.target.value})} type='number' disabled/>
                    <TextInput  label="Bowling Rank" value={playerRanks.bowlingrank} onChange={e=>setPlayerRanks({...playerRanks,bowlingrank:e.target.value})} type='number' disabled/>
                    <TextInput  label="Allrounder Rank" value={playerRanks.allrounderrank} onChange={e=>setPlayerRanks({...playerRanks,allrounderrank:e.target.value})} type='number' disabled/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                </div>
              </div>
        </div>
    </Modal>
  )
}

export default AddCaptainModal