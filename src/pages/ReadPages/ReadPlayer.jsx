import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getBatsmanById, getBatsmanInnings } from '../../features/batsmanReducer';
import { getBowlerById } from '../../features/bowlerReducer';
import { getAllRounderById } from '../../features/allRounderReducer';
import styled from 'styled-components';
import SinglePlayerCard from '../../components/cards/SinglePlayerCard';
import InningsTable from '../../components/InningsTable';
import background from '../../images/background.jpeg';
import { toast } from 'react-toastify';

const ReadPlayer = () => {
  const {type,id}=useParams();
  const dispatch=useDispatch();
  const {currentBatsman,currentBatsmanInnings}=useSelector(state=>state.batsman);
  const {currentBowler,currentBowlerPerformances}=useSelector(state=>state.bowler);
  const {currentAllRounder,allRounderPerformance}=useSelector(state=>state.allRounder);
  const [highestScore,setHighestScore]=useState(0);
  const [bestbowling,setBestBowling]=useState(0);
  const [fifers,setFifers]=useState(0);
  const [fifties,setFifties]=useState(0);
  const [hundreds,setHundreds]=useState(0);
  const {user}=useSelector(state=>state.auth);
  const navigate=useNavigate();
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()=='datamanager'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }
      }
    if(type=="Batsman"){
      dispatch(getBatsmanById(id));
    }
    else if(type=="Bowler"){
      dispatch(getBowlerById(id));
    }
    else if(type=="Allrounder"){
      dispatch(getAllRounderById(id));
    }
  },[])
  useEffect(()=>{
    if(currentBatsmanInnings.length>0){
      setHighestScore(Math.max(...currentBatsmanInnings.map(inning=>Number(inning.noruns))));
      setFifties(currentBatsmanInnings.filter(inning=>Number(inning.noruns)>=50 && Number(inning.noruns)<100).length);
      setHundreds(currentBatsmanInnings.filter(inning=>Number(inning.noruns)>=100).length);
    }
  },[currentBatsmanInnings])
  useEffect(()=>{
    if(currentBowlerPerformances.length>0){
      setBestBowling(Math.max(...currentBowlerPerformances.map(performance=>Number(performance.nowickets))));
      setFifers(currentBowlerPerformances.filter(performance=>Number(performance.nowickets)>=5).length);
    }
  },[currentBowlerPerformances])
  useEffect(()=>{
    if(allRounderPerformance.length>0){
      setBestBowling(Math.max(...allRounderPerformance.map(performance=>Number(performance.nowickets))));
      setFifers(allRounderPerformance.filter(performance=>Number(performance.nowickets)>=5).length);
      setHighestScore(Math.max(...allRounderPerformance.map(inning=>Number(inning.noruns))));
      setFifties(allRounderPerformance.filter(inning=>Number(inning.noruns)>=50 && Number(inning.noruns)<100).length);
      setHundreds(allRounderPerformance.filter(inning=>Number(inning.noruns)>=100).length);
    }
  },[allRounderPerformance])
  return (
    <Wrapper className='grid place-items-center read w-full'>
          <div className="image absolute inset-0 w-full h-full"></div>
          <div className="">
          <SinglePlayerCard player={type?.toLowerCase()=="batsman"?currentBatsman:type?.toLowerCase()=="bowler"?currentBowler:currentAllRounder} fifers={fifers} fifties={fifties}
          hundreds={hundreds} highestScore={highestScore} bestBowlingFigures={bestbowling}
          playerInnings={type?.toLowerCase()=="batsman"?currentBatsmanInnings:type?.toLowerCase()=="bowler"?currentBowlerPerformances:allRounderPerformance}
          />
          </div>
    </Wrapper>
  )
}

export default ReadPlayer
const Wrapper=styled.div`
position: relative;
.image{

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(3px);
}
  .player-card{
    min-height: 100%;
  }
`