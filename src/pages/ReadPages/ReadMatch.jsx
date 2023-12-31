import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { getMatchById, getMatchScoreCard } from '../../features/matchReducer';
import { useDispatch, useSelector } from 'react-redux';
import MatchBowlingScoreCard from '../../components/MatchBowlingScoreCard';
import MatchBattingScoreCard from '../../components/MatchBattingScoreCard';
import PictureInput from '../../components/inputs/PictureInput';
import background from '../../images/tournament.jpeg'
import {FaCrown,FaChevronCircleRight,FaChevronCircleLeft} from "react-icons/fa";
import UmpireModal from '../../components/Modals/UmpireModal';
import { getAllUmpires, setCurrentUmpire } from '../../features/umpiresReducer';
import { toast } from 'react-toastify';
const ReadMatch = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const {currentMatch,team1ScoreCard,team2ScoreCard}=useSelector(state=>state.match);
  const [team1totalruns,setTeam1TotalRuns]=useState(0);
  const [team1totalwickets,setTeam1TotalWickets]=useState(0);
  const [team2totalruns,setTeam2TotalRuns]=useState(0);
  const [team2totalwickets,setTeam2TotalWickets]=useState(0);
  const [team1extras,setTeam1Extras]=useState(0);
  const [team2extras,setTeam2Extras]=useState(0);
  const {currentUmpire}=useSelector(state=>state.umpire);
  const [openUmpireModal, setOpenUmpireModal] = useState(false)
  const [index,setIndex]=useState(0);
  const navigate=useNavigate();
  useEffect(()=>{
    setTeam1TotalRuns(team1ScoreCard.reduce((acc,cur)=>acc+Number(cur.noruns),0));
    setTeam1TotalWickets(team2ScoreCard.reduce((acc,cur)=>acc+Number(cur.nowickets),0));
    setTeam2TotalRuns(team2ScoreCard.reduce((acc,cur)=>acc+Number(cur.noruns),0));
    setTeam2TotalWickets(team1ScoreCard.reduce((acc,cur)=>acc+Number(cur.nowickets),0));
    setTeam1Extras(team2ScoreCard.reduce((acc,cur)=>(acc+Number(cur.extras||0)+Number(cur.noballs||0)),0));
    setTeam2Extras(team1ScoreCard.reduce((acc,cur)=>(acc+Number(cur.extras||0)+Number(cur.noballs||0)),0));
  },[team1ScoreCard,team2ScoreCard])
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()=='datamanager'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }
      }    dispatch(getAllUmpires());
    dispatch(getMatchById(id));
    dispatch(getMatchScoreCard(id));
  },[])
  useEffect(()=>{
        dispatch(setCurrentUmpire(currentMatch?.umpire))
  },[currentMatch])
  useEffect(()=>{
    switch(index){
      case 0:
        document.getElementById('tbat1').click();
        break;
      case 1:
        document.getElementById('tbowl1').click();
        break;
      case 2:
        document.getElementById('tbat2').click();
        break;
      case 3:
        document.getElementById('tbowl2').click();
        break;
      default:
        break;
    }
  },[index])
  return (
    <Wrapper>
      <div className="image absolute inset-0 h-[100%] top-0 bottom-[-20px] z-[-10]" style={{backgroundImage:`url(${background})`}}></div>
      <div className="details relative px-12">
        {index!=0 &&
        <FaChevronCircleLeft className='absolute top-[50%] left-[10px] text-base-100 hover:text-base-300 cursor-pointer text-4xl' onClick={()=>setIndex(index==0?3:index-1)}/>
        }
        {index<3 &&
        <FaChevronCircleRight className='absolute top-[50%] right-[10px] text-base-100 hover:text-base-300 cursor-pointer text-4xl ' onClick={()=>setIndex(index==3?0:index+1)}/>
        }
      <div className="w-[950px] carousel rounded-box">
        <div id="bat1" className="carousel-item w-full flex gap-1 flex-col items-center justify-center">
            <div className="team grid grid-cols-3 w-full items-center p-2 bg-base-300 shadow-2xl opacity-90">
                <div className='flex-1 mr-auto'>
                  {currentMatch?.winnerteam==currentMatch.team1id?<p className="m-0 p-0 text-5xl font-bold text-center text-red-500 pl-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><FaCrown/></p>:null}
                </div>
                <h1 className="m-0 p-0 text-3xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentMatch.team1} Batting</h1>
                <div className="slef-end ml-auto">
                <PictureInput picture={currentMatch?.team1pic} setPicture={()=>{}} disabled={true} small/>
                </div>
            </div>
            <MatchBattingScoreCard scorecard={team1ScoreCard||[]} match={true}/>
            <div className="totals w-full flex justify-between items-center p-2 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-lg font-semibold text-center text-gray-800 '>Extras</h1>
                <h1 className="m-0 p-0 text-lg font-semibold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team1extras}</h1>
            </div>
            <div className="totals w-full flex justify-between items-center p-2 py-4 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-2xl font-bold text-center text-gray-800 '>Total</h1>
                <h1 className="m-0 p-0 text-2xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team1totalruns}-{team1totalwickets}</h1>
            </div>
        </div> 
        <div id='bowl1' className="carousel-item w-full flex gap-1 flex-col items-center justify-center">
          <div className="team grid grid-cols-3 w-full items-center p-2 bg-base-300 shadow-2xl opacity-90">
                <div className='flex-1 mr-auto'>
                  {currentMatch?.winnerteam==currentMatch.team1id?<p className="m-0 p-0 text-5xl font-bold text-center text-red-500 pl-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><FaCrown/></p>:null}
                </div>
                <h1 className="m-0 p-0 text-3xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentMatch.team1} Bowling</h1>
                <div className="slef-end ml-auto">
                <PictureInput picture={currentMatch?.team1pic} setPicture={()=>{}} disabled={true} small/>
                </div>
            </div>
            <MatchBowlingScoreCard scorecard={team1ScoreCard.filter(p=>p.oversbowled)||[]} match={true}/>
            <div className="totals w-full flex justify-between items-center p-2 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-lg font-semibold text-center text-gray-800 '>Extras</h1>
                <h1 className="m-0 p-0 text-lg font-semibold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team1extras}</h1>
            </div>
            <div className="totals w-full flex justify-between items-center p-2 py-4 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-2xl font-bold text-center text-gray-800 '>Total</h1>
                <h1 className="m-0 p-0 text-2xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team1totalruns}-{team1totalwickets}</h1>
            </div>
        </div> 
        <div id='bat2' className="carousel-item w-full flex gap-1 flex-col items-center justify-center">
          <div className="team grid grid-cols-3 w-full items-center p-2 bg-base-300 shadow-2xl opacity-90">
                <div className='flex-1 mr-auto'>
                  {currentMatch?.winnerteam==currentMatch.team2id?<p className="m-0 p-0 text-5xl font-bold text-center text-red-500 pl-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><FaCrown/></p>:null}
                </div>
                <h1 className="m-0 p-0 text-3xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentMatch.team2} Batting</h1>
                <div className="slef-end ml-auto">
                <PictureInput picture={currentMatch?.team2pic} setPicture={()=>{}} disabled={true} small/>
                </div>
            </div>
            <MatchBattingScoreCard scorecard={team2ScoreCard||[]} match={true}/>
            <div className="totals w-full flex justify-between items-center p-2 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-lg font-semibold text-center text-gray-800 '>Extras</h1>
                <h1 className="m-0 p-0 text-lg font-semibold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team2extras}</h1>
            </div>
            <div className="totals w-full flex justify-between items-center p-2 py-4 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-2xl font-bold text-center text-gray-800 '>Total</h1>
                <h1 className="m-0 p-0 text-2xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team2totalruns}-{team2totalwickets}</h1>
            </div>
        </div> 
        <div id='bowl2' className="carousel-item w-full flex gap-1 flex-col items-center justify-center">
          <div className="team grid grid-cols-3 w-full items-center p-2 bg-base-300 shadow-2xl opacity-90">
                <div className='flex-1 mr-auto'>
                  {currentMatch?.winnerteam==currentMatch.team2id?<p className="m-0 p-0 text-5xl font-bold text-center text-red-500 pl-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"><FaCrown/></p>:null}
                </div>
                <h1 className="m-0 p-0 text-3xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{currentMatch.team2} Bowling</h1>
                <div className="slef-end ml-auto">
                <PictureInput picture={currentMatch?.team2pic} setPicture={()=>{}} disabled={true} small/>
                </div>
            </div>
            <MatchBowlingScoreCard scorecard={team2ScoreCard.filter(p=>p.oversbowled)||[]} match={true}/>
            <div className="totals w-full flex justify-between items-center p-2 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-lg font-semibold text-center text-gray-800 '>Extras</h1>
                <h1 className="m-0 p-0 text-lg font-semibold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team1extras}</h1>
            </div>
            <div className="totals w-full flex justify-between items-center p-2 py-4 bg-base-300 shadow-2xl">
                <h1 className='m-0 p-0 text-2xl font-bold text-center text-gray-800 '>Total</h1>
                <h1 className="m-0 p-0 text-2xl font-bold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">{team2totalruns}-{team2totalwickets}</h1>
            </div>
        </div> 
        </div>
        <h2 className='mx-auto w-full text-gray-300 text-center text-lg font-bold mt-2'>
          Umpire: <span className='text-gray-200 underline cursor-pointer hover:text-white'
          onClick={()=>setOpenUmpireModal(true)}
          > {currentMatch?.umpirename}</span>
        </h2>
      <div className="hidden">
      <a href="#bat1" id='tbat1'></a>
      <a href="#bowl1" id='tbowl1'></a>
      <a href="#bat2" id='tbat2'></a>
      <a href="#bowl2" id='tbowl2'></a>
        </div>
      </div>
      {openUmpireModal &&
      <UmpireModal onClose={()=>setOpenUmpireModal(false)} open={openUmpireModal} umpire={currentUmpire} loading={false} viewOnly/>
      }
    </Wrapper>
  )
}

export default ReadMatch
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
width: 100%;
min-height:calc(100vh - 70px) ;
position: relative;
.image{
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(2px);
}
`