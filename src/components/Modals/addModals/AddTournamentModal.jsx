import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import PictureInput from '../../inputs/PictureInput'
import TextInput from '../../inputs/TextInput'
import SelectInput from '../../inputs/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../../features/countryReducer'
import { getAllTeams } from '../../../features/teamReducer'
import FileInput from '../../inputs/FileInput'
import dayjs from 'dayjs'
import { createTournament } from '../../../features/tournamentReducer'
import { toast } from 'react-toastify'
const AddTournamentModal = ({open,onClose}) => {
    const [picture,setPicture]=useState('');
    const [load,setLoad]=useState(false);
    const {allTeams}=useSelector(state=>state.team);
    const {isError}=useSelector(state=>state.tournament);
    const [tournamentName,setTournamentName]=useState('');
    const [startDate,setStartDate]=useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [winningTeam,setWinningTeam]=useState('');
    const [winningTeamId,setWinningTeamId]=useState('');
    const [winningPicture,setWinningPicture]=useState('');
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllTeams());
    },[])
    useEffect(()=>{
        if(allTeams.length>0){
            setWinningTeam(allTeams[0].teamname);
            setWinningTeamId(allTeams[0].teamid);
        }
    },[allTeams])
    const handleCountryChange=(e)=>{
        setWinningTeam(e.target.value);
        let country=allTeams.find(country=>country.teamname==e.target.value);
        setWinningTeamId(country.teamid);
    }
    const handleSave=()=>{
      if(tournamentName.length==0){
          toast.error("Please enter tournament name");
          return;
      }
      if(tournamentName.length<3){
          toast.error("Tournament name must be atleast 3 characters long");
          return;
      }
      if(picture==""){
          toast.error("Please enter tournament picture");
          return;
      }
      if(winningTeam.length==0){
          toast.error("Please select winning team");
          return;
      }
      if(winningPicture==""){
          toast.error("Please enter winning picture");
          return;
      }
      if(startDate==endDate){
          toast.error("Start date and end date cannot be same");
          return;
      }
      if(dayjs(startDate).isAfter(dayjs(endDate))){
          toast.error("Start date cannot be after end date");
          return;
      }
      //see if differnece between start date and end date is less than 7 days
      if(dayjs(endDate).diff(dayjs(startDate),'day')<7){
          toast.error("Tournament must be atleast 7 days long");
          return;
      }
      
      //check if end date is not greater than current date
      if(dayjs(endDate).isAfter(dayjs(new Date()))){
          toast.error("End date cannot be greater than current date");
          return;
      }
      setLoad(true);
      dispatch(createTournament({tournamentname:tournamentName, startdate:startDate, enddate:endDate, winningteam:winningTeamId, winningpic:winningPicture,logo:picture}));
      if(isError){
          toast.error("Something went wrong");
          setLoad(false);
          return;
      }
      toast.success("Registered successfully");
      setTimeout(()=>{
          setLoad(false);
          onClose();
      },2000)

    }
  return (
    <Modal open={open} onClose={onClose} width="700px" height='auto'>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Tournament</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <PictureInput hoverLabel='Tournament Logo' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-16">
                    <TextInput label="Tournament Name" placeholder='Enter Tournament Name' value={tournamentName} onChange={(e)=>setTournamentName(e.target.value)} required/>
                      <SelectInput label="Winner" options={allTeams.map(country=>country.teamname)} value={winningTeam} onChange={handleCountryChange} required/>
                    <TextInput label="Start Date" placeholder='Enter Start Date' value={startDate} onChange={(e)=>setStartDate(e.target.value)} required type='date'/>
                    <TextInput label="End Date" placeholder='Enter End Date' value={endDate} onChange={(e)=>setEndDate(e.target.value)} required type='date'/>
                    <FileInput required label="Winning Picture" setPicture={setWinningPicture}/>
                    
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                </div>
              </div>
        </div>
    </Modal>
  )
}

export default AddTournamentModal