import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux';
import { removeCurrentTournament, setTournamentWinningPic, updateCurrentTournamet, updateTournament } from '../../features/tournamentReducer';
import SelectInput from '../inputs/SelectInput';
import TextInput from '../inputs/TextInput';
import { getAllTeams } from '../../features/teamReducer';
import dayjs from 'dayjs';
import PictureInput from '../inputs/PictureInput';
import { toast } from 'react-toastify';
import FileInput from '../inputs/FileInput';
const TournamentModal = ({open,onClose,loading,tournament}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {tournamentid,name,startdate,enddate,winning_team,teamname,teampicpath,tournamentlogo:winpic,winningpic}=tournament;
  const {allTeams}=useSelector(state=>state.team);
  const {isError,allTournaments}=useSelector(state=>state.tournament);
  const [startDate,setStartDate]=useState(dayjs(startdate).format('YYYY-MM-DD'));
  const [endDate,setEndDate]=useState(dayjs(enddate).format('YYYY-MM-DD'));
  const [winningTeamId,setWinningTeamId]=useState(winning_team);
  const [winningPic,setWinningPic]=useState(winpic);
  const [teamName,setTeamName]=useState(teamname);
  const [teamPic,setTeamPic]=useState(teampicpath);
  const [allTournamentTeams,setAllTournamentTeams]=useState([]);
  const [load,setLoad]=useState(false);
  const [winningPicture,setWinningPicture]=useState(winningpic);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllTeams());
  },[])
  useEffect(()=>{
    if(allTeams.length>0){
      //add all teams to the list
      let allTeamsForTournament=allTeams.map(team=>({teamid:team.teamid,teamname:team.teamname,teampicpath:team.teampicpath}));
      //remove current team from the list
      allTeamsForTournament=allTeamsForTournament.filter(team=>team.teamname!=teamName);
      //place current team at the top
      allTeamsForTournament.unshift({teamid:winning_team,teamname:teamName,teampicpath:teamPic});
      //set the state
      setAllTournamentTeams(allTeamsForTournament);
    }
  },[allTeams])
  const handleClose=()=>{
    dispatch(removeCurrentTournament());
    onClose();
  }
const handleSave=()=>{
  if(startDate>endDate){
    toast.error('Start date cannot be greater than end date');
    return;
  }
  if(startDate==endDate){
    toast.error('Start date cannot be equal to end date');
    return;
  }
  if(startDate===dayjs(startdate).format('YYYY-MM-DD') && endDate===dayjs(enddate).format('YYYY-MM-DD') && winningTeamId===winning_team && winningPic===winpic && teamName===teamname && winningPicture===winningpic){
    toast.info('No changes made');
    setLoad(true);
    setTimeout(() => {
        setLoad(false);
        onClose();
    }, 3000);

    return;
  }
  if(!startDate || !endDate || !winningTeamId || !winningPic || !teamName){
    toast.error('Please fill all the fields');
    return;
  }
  setLoad(true);
  if(winningPic===winpic){
    dispatch(setTournamentWinningPic({tournamentId:tournamentid,pic:winningPic}))
  }
  let winnerTeamId=allTournamentTeams.find(team=>team.teamname===teamName).teamid;
  if(!isError){
    let winningPicPath=allTournamentTeams.find(team=>team.teamname===teamName).teampicpath;
    setWinningPic(winningPicPath);
    dispatch(updateCurrentTournamet({tournamentId:tournamentid,name:name,startdate:startDate,enddate:endDate,teamname:teamName,teampicpath:winningPicPath,winning_team:winnerTeamId,winningpic:winningPic,winningpicture:winningPicture}));
    toast.success('Tournament Updated');
    dispatch(updateTournament({tournamentId:tournamentid,tournamentname:name,startdate:startDate,enddate:endDate,winningteam:winnerTeamId,winningpic:winningPic,winningpicture:winningPicture}))
    setTimeout(() => {
      setLoad(false);
      onClose();
    }, 3000);
  }
  else{
    toast.error('Something went wrong');
  }


}
  return (
       <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Edit Tournament</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center flex-col justify-center gap-2">
                    <PictureInput hoverLabel="Update Picture" picture={winningPic} setPicture={setWinningPic} />
                    <h3 className="text-2xl font-bold">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <SelectInput label="Winner" value={teamName} onChange={e=>setTeamName(e.target.value)} options={allTournamentTeams.map(t=>t.teamname)} />
                    <TextInput label="Start Date" value={startDate} onChange={e=>setStartDate(e.target.value)} type='date'  />
                    <TextInput label="End Date" value={endDate} onChange={e=>setEndDate(e.target.value)} type='date'  />
                    <FileInput label="Winning Picture" setPicture={setWinningPicture}/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Saving ...":"Save"}</button>
                </div>
              </div>
        </div>
    </Modal> 
  )
}

export default TournamentModal