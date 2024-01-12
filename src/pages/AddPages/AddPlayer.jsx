import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import playerImage from "../../images/player.jpeg"
import HeroImage from '../../components/HeroImage'
import PictureInput from '../../components/inputs/PictureInput'
import TextInput from '../../components/inputs/TextInput'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCountries } from '../../features/countryReducer'
import { getAllTeams } from '../../features/teamReducer'
import SelectInput from '../../components/inputs/SelectInput'
import dayjs from 'dayjs'
import { toast } from 'react-toastify'
import AddBatsman from './AddBatsman'
import AddBowler from './AddBowler'
import { removeError } from '../../features/playerReducer'
const AddPlayer = () => {
    const [name,setName]=useState('');
    const [picture,setPicture]=useState('');
    const [countryId,setCountryId]=useState('');
    const [countryName,setCountryName]=useState('');
    const [availableTeams,setAvailableTeams]=useState([]);
    const [totalT20i,setTotalT20i]=useState(0);
    const [totalODI,setTotalODI]=useState(0);
    const [totalTest,setTotalTest]=useState(0);
    const [playerType,setPlayerType]=useState('Batsman');
    const [playerStatus,setPlayerStatus]=useState('active');
    const [dob,setDob]=useState(dayjs().subtract(16,'year').format('YYYY-MM-DD'));
    const [p,setP]=useState(true);
    const [b,setB]=useState(false);
    const [a,setA]=useState(false);
    const [bl,setBl]=useState(false);
    const [player,setPlayer]=useState({});//player object to be sent to backend
    const [done,setDone]=useState(false);//to check if player is added successfully
    const [completed,setCompleted]=useState(false);//to check if player is added successfully
    
    const {allCountries}=useSelector(state=>state.country);
    const {allTeams}=useSelector(state=>state.team);
    const {isError,isLoading}=useSelector(state=>state.player);
    
    const dispatch=useDispatch();
    const [load,setLoad]=useState(false);
    const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='playermanager'&&user.userrole.toLowerCase()!="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }        dispatch(removeError());
        dispatch(getAllCountries());
        dispatch(getAllTeams());
    },[])
    useEffect(()=>{
        if(allCountries.length>0){
            //set those countries to be available whose teams are available
            let temp=allCountries;
            // allCountries.forEach(country=>{
            //     let teams=allTeams.filter(team=>team.teamname.toLowerCase()==country.country.toLowerCase());
            //     if(teams.length>0){
            //         temp.push(country);
            //     }
            // })
            setAvailableTeams(temp);
            setCountryName(temp[0].country);
            setCountryId(temp[0].countryid);
        }
    },[allCountries,allTeams])
    const handleCountryChange=(e)=>{
        setCountryName(e.target.value);
        let country=availableTeams.find(c=>c.country.toLowerCase()==e.target.value.toLowerCase());
        setCountryId(country.countryid);
    }
    const handleSave=()=>{
        if(name.length==0){
            toast.error("Please enter player name");
            return;
        }
        if(name.length<3){
            toast.error("Player name must be atleast 3 characters long");
            return;
        }
        if(picture==""){
            toast.error("Please enter player picture");
            return;
        }
        if(countryName==""){
            toast.error("Please enter player country");
            return;
        }
        if(playerType==""){
            toast.error("Please enter player type");
            return;
        }
        if(dob==""){
            toast.error("Please enter player date of birth");
            return;
        }
        //check if player is atleast 16 years old
        let age=dayjs().diff(dob,'year');
        if(age<16){
            toast.error("Player must be atleast 16 years old");
            return;
        }
        //make sure that numeric fields are not negative
        if(totalT20i<0 || totalODI<0 || totalTest<0){
            toast.error("Number of Matches fields cannot be negative");
            return;
        }
        setLoad(true);
        if(isError){
            toast.error("Something went wrong");
            setLoad(false);
            return;
        }
        //create player object with all fields in dispatch
        setPlayer({playername:name, doB:dob, teamid:null,countryid:countryId, totalt20i:totalT20i, totalOdi:totalODI, totalTest:totalTest, type:playerType, status:'active', picturePath:picture});
        toast.success("Registered successfully");
        setTimeout(()=>{
            setLoad(false);
            setP(false);
            if(playerType=='Batsman'){
                setB(true);
                document.getElementById('btn1').click();
            }
            else if(playerType=='Bowler'){
                setBl(true);
                document.getElementById('btn2').click();
            }
            else{
                setA(true);
                document.getElementById('btn1').click();
            }
        },2000)


    }
    useEffect(()=>{
        if(done){
            setBl(true);
            document.getElementById('btn2').click();
        }
    },[done])
    const handleCancel=()=>{
        setLoad(true);
        toast.info("Redirecting to Batsmen page");
        setTimeout(()=>{
            setLoad(false);
            navigate('/batsmen');
        },1500)
    }
    useEffect(()=>{
        if(completed){
            setB(false);
            setBl(false);
            setA(false);
            setP(true);
            setCountryId(availableTeams[0].countryid);
            setCountryName(availableTeams[0].country);
            setName('');
            setDob(dayjs().subtract(16,'year').format('YYYY-MM-DD'));
            setTotalT20i(0);
            setTotalODI(0);
            setTotalTest(0);
            setPlayerType('Batsman');
            
            document.getElementById('btn').click();
        }
    },[completed])
  return (
    <Wrapper>
        <HeroImage src={playerImage}/> 
        <div className='carousel w-full overflow-hidden'>
        {p &&
        <div id='item1' className={'carousel-item w-full flex items-center justify-center'}>
         <div className='py-12 px-6 '>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Player</h3>
                <div className="flex items-center justify-center w-full gap-10">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className='grid items-center grid-cols-3 gap-4 gap-x-6'>
                    <TextInput label="Name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    <TextInput label="Date of Birth" placeholder='Enter Date of Birth' value={dob} onChange={(e)=>setDob(e.target.value)} required type='date'/>
                    <SelectInput label="Register For Team" placeholder='Enter Team' value={countryName} onChange={handleCountryChange} options={availableTeams.map(t=>t.country)} required/>
                    <SelectInput label="Player Type" placeholder='Enter Player Type' value={playerType} onChange={(e)=>setPlayerType(e.target.value)} options={['Batsman','Bowler','Allrounder']} required/>
                    <SelectInput label="Player Status" placeholder='Enter Player Status' value={playerStatus} onChange={(e)=>setPlayerStatus(e.target.value)} options={['active']} />
                        <TextInput label={"Total T20s"} placeholder='Enter Total T20s' value={totalT20i} onChange={(e)=>setTotalT20i(Number(e.target.value))}  type='number'/>
                        <TextInput label={"Total ODIs"} placeholder='Enter Total ODIs' value={totalODI} onChange={(e)=>setTotalODI(Number(e.target.value))}  type='number'/>                    
                        <TextInput label={"Total Tests"} placeholder='Enter Total Tests' value={totalTest} onChange={(e)=>setTotalTest(Number(e.target.value))}  type='number'/>
                    <div></div>
                    <button className={"btn btn-primary col-span-2"} onClick={handleSave} disabled={load}>{load?"Please Wait...":"Next"}</button>
                    {/* button to naviagte to next page */}
                    <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>

                </div>
                </div>
              </div>
        </div>
        </div>
        }
        {b &&
        <div id='item2' className={'carousel-item w-full flex items-center justify-center'}>
            <AddBatsman setCompleted={setCompleted} totalMatches={Number(totalODI)+Number(totalT20i)+Number(totalTest)} handleCancel={handleCancel} setPlayer={setPlayer} player={player} error={isError}/>
        </div>
        }
        {bl &&
        <div id='item3' className={'carousel-item w-full flex items-center justify-center'}>
            <AddBowler setCompleted={setCompleted} done={done} totalMatches={Number(totalODI)+Number(totalT20i)+Number(totalTest)} handleCancel={handleCancel} setPlayer={setPlayer} player={player} error={isError}/>
        </div>
        }
        {a &&
        <div id='item4' className={'carousel-item w-full flex items-center justify-center'}>
            <AddBatsman setCompleted={setCompleted} type='A' label='Add Batting Information' setDone={setDone} totalMatches={Number(totalODI)+Number(totalT20i)+Number(totalTest)} error={isError} handleCancel={handleCancel} player={player} setPlayer={setPlayer}/>
        </div>
        }

        </div>
<div className="hidden">
  <a href="#item1" id='btn' className="btn btn-xs">1</a> 
  <a href="#item2" id='btn1' className="btn btn-xs">2</a> 
  <a href="#item3" id='btn2' className="btn btn-xs">3</a> 
</div>
    </Wrapper>
  )
}

export default AddPlayer
const Wrapper=styled.div`
display: grid;
grid-template-rows: 40vh 1fr;
width: 100vw;
.img{
    object-position:bottom -520px right 0px;
}
    
`