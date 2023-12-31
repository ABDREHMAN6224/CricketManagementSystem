import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux';
import { getAllLocations } from '../../features/locationReducer';
import { getAllTournaments } from '../../features/tournamentReducer';
import { getAllUmpires } from '../../features/umpiresReducer';
import { toast } from 'react-toastify';
import { removeCurrentMatch,updateCurrentMatch, updateMatch } from '../../features/matchReducer';
import SelectInput from '../inputs/SelectInput';

const MatchModal = ({open,onClose,match,loading}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {matchid,team1,team2,team1id,team2id,location,winner,team1pic,team2pic,tournamentname,date,umpirename,winnerteam,tournamentid}=match;
  const {allLocations}=useSelector(state=>state.location);
  const {allTournaments}=useSelector(state=>state.tournament);
  const {allUmpires}=useSelector(state=>state.umpire);
  const {matchLoading,isError}=useSelector(state=>state.match);
  const [load,setLoad]=useState(false);
  const [teamOne,setTeamOne]=useState(team1);
  const [teamTwo,setTeamTwo]=useState(team2);
  const [matchLocation,setMatchLocation]=useState(location);
  const [matchWinner,setMatchWinner]=useState(winner);
  const [matchTournament,setMatchTournament]=useState(tournamentname);
  const [matchUmpire,setMatchUmpire]=useState(umpirename);
  const [allTournamentsForMatch,setAllTournamentsForMatch]=useState([]);
  const [allLocationsForMatch,setAllLocationsForMatch]=useState([]);
  const [allUmpiresMatch,setAllUmpires]=useState([])
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getAllLocations());
    dispatch(getAllTournaments());
    dispatch(getAllUmpires());
  },[])
  useEffect(()=>{
    if(allLocations.length>0){
      //add all locations locations to the list
      let allLocationsForMatch=allLocations.map(location=>({locationid:location.locationid,location:location.location}));
      //remove current location from the list
      allLocationsForMatch=allLocationsForMatch.filter(location=>location.location!=matchLocation);
      //place current location at the top
      allLocationsForMatch.unshift({locationid:matchLocation,location:matchLocation});
      //set the state
      setAllLocationsForMatch(allLocationsForMatch);

    }
    if(allTournaments.length>0){
      //add all tournaments to the list
      let allTournamentsForMatch=allTournaments.map(tournament=>({tournamentid:tournament.tournamentid,tournamentname:tournament.name}));
      //remove current tournament from the list
      allTournamentsForMatch=allTournamentsForMatch.filter(tournament=>tournament.tournamentname!=matchTournament);
      //place current tournament at the top
      allTournamentsForMatch.unshift({tournamentid:matchTournament,tournamentname:matchTournament});
      //set the state
      setAllTournamentsForMatch(allTournamentsForMatch);
    }
    if(allUmpires.length>0){
      //add all umpires to the list
      let allUmpiresMatch=allUmpires.map(umpire=>({umpireid:umpire.umpireid,umpirename:umpire.umpirename}));
      //remove current umpire from the list
      allUmpiresMatch=allUmpiresMatch.filter(umpire=>umpire.umpirename!=matchUmpire);
      //place current umpire at the top
      allUmpiresMatch.unshift({umpireid:matchUmpire,umpirename:matchUmpire});
      //set the state
      setAllUmpires(allUmpiresMatch);
    }
  },[allLocations,allTournaments,allUmpires])
  const handleClose=()=>{
    dispatch(removeCurrentMatch());
    onClose();
  }
  const handleSave=()=>{
    if(matchLocation==location && matchWinner==winner && matchTournament==tournamentname && matchUmpire==umpirename){
      toast.info('No changes made');
      setLoad(true);
      setTimeout(() => {
        setLoad(false);
        onClose();
      }, 3000);
      return;
    }
    if(!matchWinner || !matchLocation || !matchTournament || !matchUmpire){
      toast.error('Please fill all the fields');
      return;
    }
    setLoad(true);
    // matchLocation, matchTournament, matchWinner, matchUmpire,matchUmpireId,winnerId 
    //get umpire id
    let matchUmpireId=allUmpires.find(umpire=>umpire.umpirename==matchUmpire).umpireid;
    //get winner id
    let winnerId;
    let winningteampic;
    if(matchWinner==team1){
      winnerId=team1id;
      winningteampic=team1pic;
    }else{
      winnerId=team2id;
      winningteampic=team2pic;
    }
    let tournamentId=allTournaments.find(tournament=>tournament.name==matchTournament).tournamentid;
    let locationid=allLocations.find(location=>location.location==matchLocation).locationid;
    dispatch(updateCurrentMatch({matchid,matchLocation,matchTournament,matchWinner,matchUmpire,matchUmpireId,winnerId,tournamentId:tournamentid,winningteampic}));
        if(!isError){
      toast.success('Team Updated Successfully');
      //  { date, location, tournamentId, team1id, team2id, winner, umpire }
      dispatch(updateMatch({date:date,matchid,location:locationid,tournamentId,team1id,team2id,winner:winnerId,umpire:matchUmpireId}))
      setLoad(true);
      setTimeout(() => {
      setLoad(false);
        dispatch(removeCurrentMatch());
        onClose();
      }, 3000);
    }else{
      toast.error('Something went wrong');
    }

  }
  return (
    <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-4">
                  <h3 className='text-3xl font-bold pb-3'>Edit Match</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  {/* Match Title with nice background */}
                  {/* give div a nice background */}
                  <div className="flex items-center justify-center gap-x-4">
                    <img className="w-12 h-12 object-cover rounded-full" src={team1pic} alt="" />
                    <h3 className="text-2xl font-bold m-0 p-0">{team1} vs {team2}</h3>
                    <img className="w-12 h-12 object-cover rounded-full" src={team2pic} alt="" />
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    {/* <TextInput label='Team 1' placeholder="Team 1" value={teamOne} onChange={(e)=>setTeamOne(e.target.value)} disabled={true} />
                    <TextInput label='Team 2' placeholder="Team 2" value={teamTwo} onChange={(e)=>setTeamTwo(e.target.value)} disabled={true} /> */}
                    {matchWinner &&
                    <SelectInput label='Winner' value={matchWinner} onChange={(e)=>setMatchWinner(e.target.value)} options={matchWinner==team1?[team1,team2]:[team1,team2]}/>
                    }
                    {/* locations */}
                    <SelectInput label='Location' value={matchLocation} onChange={(e)=>setMatchLocation(e.target.value)} options={allLocationsForMatch.map(l=>l.location)}/>
                    {/* tournaments */}
                    <SelectInput label='Tournament' value={matchTournament} onChange={(e)=>setMatchTournament(e.target.value)} options={allTournamentsForMatch.map(t=>t.tournamentname)}/>
                    {/* umpires */}
                    <SelectInput label='Umpire' value={matchUmpire} onChange={(e)=>setMatchUmpire(e.target.value)} options={allUmpiresMatch.map(u=>u.umpirename)}/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={matchLoading||load}>{matchLoading||load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal> 
  )
}

export default MatchModal