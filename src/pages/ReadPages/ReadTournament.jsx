import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate, useParams } from 'react-router-dom'
import { getTournamentById } from '../../features/tournamentReducer';
import background from '../../images/tournament.jpeg'
import styled from 'styled-components';
import TournamentCard from '../../components/cards/TournamentCard';
import { toast } from 'react-toastify';

const ReadTournament = () => {
  const {id}= useParams();
  const {currentTournament,currentTournamentMatches}=useSelector(state=>state.tournament);
  //name,startdate,enddate,winningpic,tournamentlogo,teamname,

  const navigate=useNavigate();
  const dispatch = useDispatch();


const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()=='datamanager'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}    dispatch(getTournamentById(id))    
  }, [])
  return (
    <Wrapper>
      <div className="image absolute inset-0 h-screen w-screen z-[-1]" style={{backgroundImage:`url(${background})`}}></div>
      <div className="container w-screen flex flex-col gap-12">
      <h3 className='text-5xl text-gray-800 m-0 p-0 pt-10 mx-auto font-extrabold text-center drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{currentTournament.name}</h3>
      <div className="content">
        <TournamentCard tournament={currentTournament} matches={currentTournamentMatches}/>
      </div>
      </div>
    </Wrapper>
  )
}

export default ReadTournament
const Wrapper=styled.div`
position: relative;
.image{
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(2px);
}

`