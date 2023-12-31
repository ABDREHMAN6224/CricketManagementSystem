import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import teamImg from "../../images/team.jpeg"
import HeroImage from '../../components/HeroImage'
import { useDispatch, useSelector } from 'react-redux'
import { createTeam, getAllTeams } from '../../features/teamReducer'
import { getAllCoaches } from '../../features/coachesReducer'
import { getAllCountries } from '../../features/countryReducer'
import PictureInput from '../../components/inputs/PictureInput'
import TextInput from '../../components/inputs/TextInput'
import SelectInput from '../../components/inputs/SelectInput'
import { getAllCaptains } from '../../features/captainReducer'
import { getAllWicketKeepers } from '../../features/wicketKeeperReducers'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import SelectTeamModal from '../../components/Modals/SelectTeamModal'
const Addteam = () => {
  const [availableTeams,setAvailableTeams]=useState([]);
  const [picture,setPicture]=useState('');
  const [allThingsCompleted,setAllThingsCompleted]=useState(false);
  const [load,setLoad]=useState(false);
  const [availableCoaches,setAvailableCoaches]=useState([]);
  const [coach,setCoach]=useState('');
  const [country,setCountry]=useState('');
  const [availableWicketKeepers,setAvailableWicketKeepers]=useState([]);
  const [availableCaptains,setAvailableCaptains]=useState([]);
  const [wickKeeper,setWickKeeper]=useState('');
  const [coachId,setCoachId]=useState('');
  const [captainId,setCaptainId]=useState('');
  const [captain,setCaptain]=useState('');
  const [wicketKeeperId,setWicketKeeperId]=useState('');
  const [noCaptain,setNoCaptain]=useState(false);
  const [noWicketKeeper,setNoWicketKeeper]=useState(false);
  const [noCoach,setNoCoach]=useState(false);
  const [error,setError]=useState(false);
  const [team,setTeam]=useState({});
  const [selectTeamModal,setSelectTeamModal]=useState(false);
  const {allTeams,isError}=useSelector(state=>state.team);
  const {allCoaches}=useSelector(state=>state.coach);
  const {allCountries}=useSelector(state=>state.country);
  const {allWicketKeepers}=useSelector(state=>state.wicketKeeper);
  const {allCaptains}=useSelector(state=>state.captain);

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
        }    dispatch(getAllTeams());
    dispatch(getAllCoaches());
    dispatch(getAllCountries());
    dispatch(getAllCaptains());
    dispatch(getAllWicketKeepers());

    setAllThingsCompleted(false);
  },[])
  useEffect(()=>{
    if(allTeams.length<1){
      setAvailableTeams(allCountries);
      setAvailableCoaches(allCoaches);
      setCoach(allCoaches[0]?.coachname);
      setCountry(allCountries[0]?.country);
      setCoachId(allCoaches[0]?.coachid);
    }
    else if(allTeams.length>0 && allCountries.length>0){
      //set avaialble teams which are in allCountries but not in allTeams
      let temp=allCountries.filter(country=>!allTeams.some(team=>team.teamname==country.country)); 
      setCountry(temp[0]?.country);
      setAvailableTeams(temp);
    }
    if(allCoaches.length>0 && allTeams.length>0){
      //set available coaches which are not in allTeams
      let temp=allCoaches.filter(coach=>!allTeams.some(team=>team.coachid==coach.coachid));
      setCoach(temp[0]?.coachname);
      setCoachId(temp[0]?.coachid);
      setAvailableCoaches(temp);
    }
  },[allTeams,allCoaches,allCountries])
  useEffect(()=>{
    if(allCaptains.length>0 && country){
      let temp=allCaptains.filter(captain=>captain?.country.toLowerCase()==country.toLowerCase());
      setCaptain(temp[0]?.playername);
      setCaptainId(temp[0]?.playerid);
      setAvailableCaptains(temp);
    }
  },[allCaptains,country])    
  useEffect(()=>{
    if(allWicketKeepers.length && country){
      let temp=allWicketKeepers.filter(wicketKeeper=>wicketKeeper.country.toLowerCase()==country.toLowerCase());
      //remove wicket keepers already registered
      temp=temp.filter(wicketKeeper=>!allTeams.some(team=>team.wicketkeeperid==wicketKeeper.playerid));
      setWicketKeeperId(temp[0]?.playerid||null);
      setWickKeeper(temp[0]?.playername||"");
      setAvailableWicketKeepers(temp);
    }
  },[allWicketKeepers,country])
  useEffect(()=>{
    if(availableCaptains.length<1){
      setNoCaptain(true);
      setError(true);
    }
    else{
      setNoCaptain(false);
      setError(false);
    }
  },[availableCaptains])
  useEffect(()=>{
    if(availableWicketKeepers.length<1){
      setNoWicketKeeper(true);
      setError(true);
    }
    else{
      setNoWicketKeeper(false);
      setError(false);
    }
  },[availableWicketKeepers])
  useEffect(()=>{
    if(availableCoaches.length<1){
      setNoCoach(true);
      setError(true);
    }
    else{
      setNoCoach(false);
      setError(false);
    }
  },[availableCoaches])
  const handleSave=()=>{
    if(country.length==0){
      toast.error("Please enter country");
      return;
    }
    if(coach.length==0){
      toast.error("Please enter coach");
      return;
    }
    if(captain.length==0){
      toast.error("Please enter captain");
      return;
    }
    if(wickKeeper.length==0){
      toast.error("Please enter wicket keeper");
      return;
    }
    if(picture.length==0){
      toast.error("Please enter team picture");
      return;
    }
    if(allCaptains.length<1){
      toast.error("Please register captain");
      return;
    }
    if(allWicketKeepers.length<1){
      toast.error("Please register wicket keeper");
      return;
    }
    if(allCoaches.length<1){
      toast.error("Please register coach");
      return;
    }
    let createdTeam={
      teamName:country,
      coachId:coachId,
      captainId:captainId,
      wicketKeeperId:wicketKeeperId,
      teamLogo:picture,
      auto:true,
      coachname:coach,
      captain:captain,
      wicketkeeper:wickKeeper
    }
    setLoad(true);
    setTeam(createdTeam);
    dispatch(createTeam(createdTeam));
    if(isError){
      toast.error("Something went wrong");
      setLoad(false);
      return;
    }
    toast.success("Please Wait while we register your team");
    setTimeout(()=>{
      setLoad(false);
      setSelectTeamModal(true);
    },2000)
  }
  const handleCancel=()=>{
    setLoad(true);
    toast.info("Redirecting to teams page");
    setTimeout(()=>{
      setLoad(false);
      navigate('/teams');
    },2000)
  }
  useEffect(()=>{
    //set coach id from coach name using available coaches
    if(coach){
      let cch=availableCoaches.find(ch=>ch.coachname.toLowerCase()==coach.toLowerCase());
      setCoachId(cch?.coachid);
      setCoach(cch?.coachname);
    }
  
  },[coach,coachId,availableCoaches])
  useEffect(()=>{
    //set captain id from captain name using available captains
    if(captain){
      let cap=allCaptains.find(capt=>capt.playername==captain);
      setCaptainId(cap?.playerid);
    }
  },[captain])
  useEffect(()=>{
    //set wicket keeper id from wicket keeper name using available wicket keepers
    if(wickKeeper){

      let wicketKeeper=allWicketKeepers.find(wicketKeeper=>wicketKeeper.playername==wickKeeper);
      setWicketKeeperId(wicketKeeper?.playerid);
    }
  },[wickKeeper])
  useEffect(()=>{
    if(allThingsCompleted){}
  },[allThingsCompleted])
  return (
    <Wrapper>
      <HeroImage src={teamImg}/>
 <div className='py-12 px-6 '>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Team</h3>
                <div className="flex items-center justify-center w-full gap-10">
                  <PictureInput hoverLabel='Team Picture' picture={picture} setPicture={setPicture}/>
                  <div className='grid items-center grid-cols-3 gap-4 gap-x-6'>
                    <SelectInput label="Team Name" placeholder='Enter Country' value={country} onChange={(e)=>setCountry(e.target.value)} options={availableTeams.map(t=>t.country)} required/>
                    
                    <SelectInput label="Coach Name" placeholder='Enter Coach' value={coach} onChange={(e)=>setCoach(e.target.value)} options={availableCoaches.map(c=>c.coachname)} required/>
                    
                    <SelectInput label="Captain Name" placeholder='Enter Captain' value={captain} onChange={(e)=>setCaptain(e.target.value)} options={availableCaptains.map(c=>c.playername)} required/>
                  
                    <SelectInput label="Wicket Keeper Name" placeholder='Enter Wicket Keeper' value={wickKeeper} onChange={(e)=>setWickKeeper(e.target.value)} options={availableWicketKeepers.map(w=>w.playername)} required/>
                  
                    <div></div>
                    <button className={"btn btn-primary col-span-2"} disabled={error||load} onClick={handleSave}>{error?"Not enough players registered":load?"Please Wait...":"Next"}</button>
                    {/* button to naviagte to next page */}
                    <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>

                </div>
                </div>
              </div>
        </div>
        {selectTeamModal&& <SelectTeamModal open={selectTeamModal} onClose={()=>setSelectTeamModal(false)} team={team}/>}
        </Wrapper>
  )

                  }
export default Addteam
const Wrapper=styled.div`
display: grid;
grid-template-rows: 39vh 1fr;
.img{
    object-position:bottom -330px right 0px ;
}
    
`