import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import TextInput from '../../components/inputs/TextInput';
import PictureInput from '../../components/inputs/PictureInput';
import SelectInput from '../../components/inputs/SelectInput';
import { toast } from 'react-toastify';
import { createTournament } from '../../features/tournamentReducer';
import dayjs from 'dayjs';
import { getAllTeams } from '../../features/teamReducer';
import { useDispatch, useSelector } from 'react-redux';
import FileInput from '../../components/inputs/FileInput';
import tournamentImage from "../../images/tournament.jpeg"
import { useNavigate } from 'react-router-dom';
import HeroImage from '../../components/HeroImage';
const AddTournament = () => {
  const [picture,setPicture]=useState('');
    const [load,setLoad]=useState(false);
    const {allTeams}=useSelector(state=>state.team);
    const {isError,allTournaments}=useSelector(state=>state.tournament);
    const [tournamentName,setTournamentName]=useState('');
    const [startDate,setStartDate]=useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [endDate,setEndDate]=useState(dayjs(new Date()).format('YYYY-MM-DD'));
    const [winningTeam,setWinningTeam]=useState('');
    const [winningTeamId,setWinningTeamId]=useState('');
    const [winningPicture,setWinningPicture]=useState('');
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='tournamentmanager'&&user.userrole.toLowerCase()=="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }      // dispatch()
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
      //check if tournament name already exists
      let tournament=allTournaments.find(tournament=>tournament.name.toLowerCase()==tournamentName.toLowerCase());
      if(tournament){
          toast.error("Tournament name already exists");
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
        setEndDate(dayjs(new Date()).format('YYYY-MM-DD'));
        setStartDate(dayjs(new Date()).format('YYYY-MM-DD'));
        setTournamentName('');
        setPicture('');
        setWinningPicture('');
        setWinningTeam(allTeams[0].teamname);
        setWinningTeamId(allTeams[0].teamid);
        setLoad(false);
      },2000)

    }
    const handleCancel=()=>{
        setLoad(true);
        toast.info("Redirecting to tournament page")
        setTimeout(()=>{
            setLoad(false);
            navigate("/tournament")
        },2000)
    }
  return (
    <Wrapper>
        <HeroImage src={tournamentImage}/>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Tournament</h3>
                <div className="flex items-center justify-center gap-10">
                  <div>
                  <PictureInput hoverLabel='Tournament Logo' picture={picture} setPicture={setPicture}/>
                  </div>
                  <div className="grid grid-cols-3 gap-x-5">
                    <TextInput label="Tournament Name" placeholder='Enter Tournament Name' value={tournamentName} onChange={(e)=>setTournamentName(e.target.value)} required/>
                      <SelectInput label="Winner" options={allTeams.map(country=>country.teamname)} value={winningTeam} onChange={handleCountryChange} required/>
                    <TextInput label="Start Date" placeholder='Enter Start Date' value={startDate} onChange={(e)=>setStartDate(e.target.value)} required type='date'/>
                    <FileInput required label="Winning Picture" setPicture={setWinningPicture}/>
                    <TextInput label="End Date" placeholder='Enter End Date' value={endDate} onChange={(e)=>setEndDate(e.target.value)} required type='date'/>
                    <div></div>
                    <button className="btn col-span-2 mt-1 btn-primary" onClick={handleSave} disabled={load}>{load?"Please Wait...":"Register"}</button>
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

export default AddTournament
const Wrapper=styled.div`
display: grid;
grid-template-rows: 40vh 1fr;
.img{
    object-position:bottom -430px right 0px ;
}
    
`