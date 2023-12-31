import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import matchImage from "../../images/match.jpeg"
import HeroImage from '../../components/HeroImage'
import { useDispatch, useSelector } from 'react-redux'
import { getAllLocations } from '../../features/locationReducer'
import { getAllTeams, getTeam2Players, getTeamPlayers, getTeamPlayersSquad } from '../../features/teamReducer'
import { getAllUmpires } from '../../features/umpiresReducer'
import { getAllTournaments } from '../../features/tournamentReducer'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { createMatch, getAllMatches, removeCurrentMatch } from '../../features/matchReducer'
import TextInput from '../../components/inputs/TextInput'
import SelectInput from '../../components/inputs/SelectInput'
import dayjs from 'dayjs'
const AddMatch = () => {
  const [date,setDate]=useState(dayjs(new Date()).format('YYYY-MM-DD'));
  const [location,setLocation]=useState('');
  const [team1,setTeam1]=useState('');
  const [team1id,setTeam1id]=useState('');
  const [team2,setTeam2]=useState('');
  const [team2id,setTeam2id]=useState('');
  const [winner,setWinner]=useState('');
  const [umpire,setUmpire]=useState('');
  const [type,setType]=useState('ODI');
  const [tournament,setTournament]=useState('');
  const [team1Options,setTeam1Options]=useState([]);
  const [team2Options,setTeam2Options]=useState([]);
  const [load,setLoad]=useState(false);
  const [error,setError]=useState(false);
  const [hasMound,setHasMound]=useState(false);


  const {allLocations}=useSelector(state=>state.location);
  const {allTournaments}=useSelector(state=>state.tournament);
  const {allTeams,currentTeamPlayersSquad,currentTeam2Players}=useSelector(state=>state.team);
  const {allUmpires}=useSelector(state=>state.umpire);
  const {allMatches,createdMatch,isLoading}=useSelector(state=>state.match);

  const navigate=useNavigate();
  const dispatch=useDispatch();

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
        }    dispatch(removeCurrentMatch());
    dispatch(getAllLocations());
    dispatch(getAllTeams());
    dispatch(getAllUmpires());
    dispatch(getAllTournaments());
    dispatch(getAllMatches());

  },[])
  useEffect(()=>{
    if(!hasMound){
      setHasMound(true);
      return;
    }
    if(allTeams.length>1){
      setError(false);
      setTeam1(allTeams[0].teamname);
      setTeam2(allTeams[1].teamname);
      setTeam1id(allTeams[0].teamid);
      setTeam2id(allTeams[1].teamid);
      dispatch(getTeam2Players(allTeams[1].teamname));
      dispatch(getTeamPlayersSquad(allTeams[0].teamname));
      let options1=allTeams;
      let options2=allTeams;
      //remove team1 from options2 and team2 from options1
      options1=options1.filter(team=>team.teamid!=team2id);
      options2=options2.filter(team=>team.teamid!=team1id);
      setTeam1Options(options1);
      setTeam2Options(options2);
      setWinner(allTeams[0].teamname);
    }else{
      setError(true);
    }
  },[allTeams])
  const handleTeamChange1=(e)=>{
    setTeam1(e.target.value);
    let t1=e.target.value;
    let t1id=allTeams.find(team=>team.teamname==t1).teamid;
    setTeam1id(t1id);
      let options1=allTeams;
      let options2=allTeams;
      //remove team1 from options2 and team2 from options1
      options1=options1.filter(team=>team.teamid!=team2id);
      options2=options2.filter(team=>team.teamid!=t1id);
      setTeam1Options(options1);
      setTeam2Options(options2);
      setWinner(t1);    
  }
  const handleTeamChange2=(e)=>{
    setTeam2(e.target.value);
    let t2=e.target.value;
    let t2id=allTeams.find(team=>team.teamname==t2).teamid;
    setTeam2id(t2id);
      let options1=allTeams;
      let options2=allTeams;
      //remove team1 from options2 and team2 from options1
      options1=options1.filter(team=>team.teamid!=t2id);
      options2=options2.filter(team=>team.teamid!=team1id);
      setTeam1Options(options1);
      setTeam2Options(options2);
      setWinner(t2);    
    }
  useEffect(()=>{
    if(allLocations.length>0){
      setLocation(allLocations[0].location);
    }
  },[allLocations])
  useEffect(()=>{
    if(allUmpires.length>0){
      setUmpire(allUmpires[0].umpirename);
    }
  },[allUmpires])
  useEffect(()=>{
    if(allTournaments.length>0){
      setTournament(allTournaments[0].name);
    }
  },[allTournaments])

  useEffect(()=>{
    if(error){
      toast.error("Please add atleast 2 teams to register a match");
      setTimeout(()=>{
        navigate('/addTeam');
      },2000)
    }
  },[error])

  const handleSave=()=>{

    if(date.length==0){
      toast.error("Please enter match date");
      return;
    }
    if(location.length==0){
      toast.error("Please enter match location");
      return;
    }
    if(team1.length==0){
      toast.error("Please enter team1");
      return;
    }
    if(team2.length==0){
      toast.error("Please enter team2");
      return;
    }
    if(umpire.length==0){
      toast.error("Please enter umpire");
      return;
    }
    if(winner.length==0){
      toast.error("Please enter winner");
      return;
    }
    if(type.length==0){
      toast.error("Please enter match type");
      return;
    }
    //check if date is in future
    if(dayjs(date).format('YYYY-MM-DD')>dayjs(new Date()).format('YYYY-MM-DD')){
      toast.error("Match date cannot be in future");
      return;
    }
    
    //find winner id,umpire id,location id,team1 id,team2 id
    let team1id=allTeams.find(team=>team.teamname==team1).teamid;
    let team2id=allTeams.find(team=>team.teamname==team2).teamid;
    let umpireid=allUmpires.find(ump=>ump.umpirename==umpire).umpireid;
    let locationid=allLocations.find(loc=>loc.location==location).locationid;
    let winnerTeamid;
    if(winner=="none"){
      winnerTeamid=null;
    }
    else{
      winnerTeamid=allTeams.find(team=>team.teamname.toLowerCase()==winner.toLowerCase()).teamid;
    }
    let tournamentid=allTournaments.find(tour=>tour.name==tournament).tournamentid;
    dispatch(getTeam2Players(team2));
    dispatch(getTeamPlayersSquad(team1));
    if(currentTeamPlayersSquad.length<11 && currentTeam2Players.length<11){
      toast.error("Teams donot have 11 players");
      return;
    }
    if(currentTeamPlayersSquad.length<11){
      toast.error(`${team1} doesnot have 11 players`);
      return;
    }
    if(currentTeam2Players.length<11){
      toast.error(`${team2} doesnot have 11 players`);
      return;
    }
    // date, location, tournamentId, team1id, team2id, winner, umpire,type
    let matchObj={
      date,
      location:locationid,
      tournamentId:tournamentid,
      team1id,
      team2id,
      winner:winnerTeamid,
      umpire:umpireid,
      type
    }
    //check if match between team1 and team2 already exists on that date
    let matchExists=allMatches.find(match=>(match.team1id==team1id || match.team1id==team2id) && (match.team2id==team2id || match.team2id==team1id) && dayjs(match.date).format('YYYY-MM-DD')==dayjs(date).format('YYYY-MM-DD'));
    if(matchExists){
      toast.error(`${team1} vs ${team2} match already exists on this date`);
      return;
    }
    setLoad(true);
    if(!isLoading){

      dispatch(createMatch(matchObj));
      toast.success("Registered successfully");
      setTimeout(()=>{
        localStorage.setItem('match',JSON.stringify({...matchObj,match_id:createdMatch.matchid}));
        navigate(`/addMatch/${matchObj.team1id}/${matchObj.team2id}`);
        setLoad(false);
      },2000)
    }
  }
  useEffect(()=>{
    setLoad(true);
    setTimeout(()=>{
      setLoad(false);
    },2000)
  },[])
  const handleCancel=()=>{
    setLoad(true);
    toast.info("Redirecting to matches page")
    setTimeout(()=>{
      setLoad(false);
      navigate('/matches');
    },2000)
  }
  return (
 <Wrapper>
           <HeroImage src={matchImage}/>
          <div className='py-12 px-6 w-full'>
              <div className="flex flex-col items-center justify-center w-full gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Match</h3>
                  <div className='grid grid-cols-3 gap-5 gap-y-2 flex-col'>
                    <SelectInput label="Team1" full placeholder='Enter Team1' value={team1} onChange={handleTeamChange1} required options={team1Options.map(t=>t.teamname)}/>
                    <SelectInput label="Team2" full placeholder='Enter Team2' value={team2} onChange={handleTeamChange2} required options={team2Options.map(t=>t.teamname)}/>
                    <SelectInput label="Winner" full placeholder='Enter Winner' value={winner} onChange={(e)=>setWinner(e.target.value)} required options={[team1,team2,"none"]}/>
                    <TextInput label="Date" type='date' placeholder='Enter Date' value={date} onChange={(e)=>setDate(e.target.value)} required/>
                    <SelectInput label="Umpire" full placeholder='Enter Umpire' value={umpire} onChange={(e)=>setUmpire(e.target.value)} required options={allUmpires.map(u=>u.umpirename)}/>
                    <SelectInput label="Location" full placeholder='Enter Location' value={location} onChange={(e)=>setLocation(e.target.value)} required options={allLocations.map(l=>l.location)}/>
                    <SelectInput label="Tournament" full placeholder='Enter Tournament' value={tournament} onChange={(e)=>setTournament(e.target.value)} required options={allTournaments.map(t=>t.name)}/>
                    <SelectInput label="Type" full placeholder='Enter Type' value={type} onChange={(e)=>setType(e.target.value)} required options={['ODI','T20','Test']}/>
                    <div></div>
                    <button className="btn btn-primary btn-block col-span-2" onClick={handleSave} disabled={load}>{load?"Please Wait ...":"Register"}</button>
                     <button className='btn btn-warning btn-block' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>
                </div>
              </div>
        </div>
    </Wrapper>
      )
}

export default AddMatch
const Wrapper=styled.div`
display: grid;
grid-template-rows: 43vh 1fr;
.img{
    object-position:bottom -150px right 0px ;
}
    
`