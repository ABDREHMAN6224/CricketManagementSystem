import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate, useParams } from 'react-router-dom'
import background from '../../images/background.jpeg'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { getTeamById, getTeamMatches, getTeamPlayers, getWonTournameents, removeCurrentTeam } from '../../features/teamReducer';
import TeamCard from '../../components/TeamCard';
import { getCaptainById } from '../../features/captainReducer';
import { getAllCoaches, setCurrentCoach } from '../../features/coachesReducer';
import { getAllWicketKeepers, getWicketKeeperById, setCurrentWicketKeeper } from '../../features/wicketKeeperReducers';
import WicketKeeperModal from '../../components/Modals/WicketKeeperModal';
import CaptainModal from '../../components/Modals/CaptainModal';
import CoachModal from '../../components/Modals/CoachModal';
import TournamentTable from '../../components/TournamentTable';
import TeamMatchesTable from '../../components/TeamMatchesTable';
import { toast } from 'react-toastify';
const ReadTeam = () => {
  const {id}=useParams();
  const {tournamentWins,currentTeamPlayers,currentTeam,TeamMatches}=useSelector(state=>state.team)
  const {currentCaptain}=useSelector(state=>state.captain);
  const {currentWicketKeeper}=useSelector(state=>state.wicketKeeper);
  const {currentCoach}=useSelector(state=>state.coach);
  const [openCoachModal, setOpenCoachModal] = useState(false)
  const [openCaptainModal, setOpenCaptainModal] = useState(false)
  const [openWicketKeeperModal, setOpenWicketKeeperModal] = useState(false)
  const navigate=useNavigate();
  const dispatch=useDispatch();
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()=='datamanager'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}
     dispatch(getAllCoaches())
    dispatch(getAllWicketKeepers())
    dispatch(getTeamById(id))
    dispatch(getWonTournameents(id))
    dispatch(getTeamPlayers(id))
    dispatch(getTeamMatches(id))
  }, [id])
  useEffect(() => {
    if(currentTeam.captainid){
      dispatch(getCaptainById(currentTeam.captainid))
      dispatch(setCurrentCoach(currentTeam.coachid))
      dispatch(setCurrentWicketKeeper(currentTeam.wicketkeeperid))
    }
  }, [currentTeam])
  const handleClick=()=>{
    dispatch(removeCurrentTeam());
    navigate(-1)
  }
  return (
    <Wrapper className='grid grid-cols-2 read w-full p-5'>
      <div className="back-image absolute inset-0 w-full h-full"></div>
      <div className="players flex flex-col items-center justify-center z-[2]"> 
          <TeamCard currentTeam={currentTeam} matches={TeamMatches} players={currentTeamPlayers}/>
          {/* button to see coach detils, captain details, wicketkeeper details */}
          <div className="flex flex-row items-center gap-6 mt-4 justify-between z-[2]">
            <h3 className='m-0 p-0 text-lg text-gray-900 font-semibold'>Coach: <span className='nav-link underline text-gray-400 cursor-pointer hover:text-gray-300 transition-all' onClick={()=>setOpenCoachModal(true)}>{currentTeam.coachname}</span></h3>
            <h3 className='m-0 p-0 text-lg text-gray-900 font-semibold'>Captain: <span className='nav-link underline text-gray-400 cursor-pointer hover:text-gray-300 transition-all' onClick={()=>setOpenCaptainModal(true)}>{currentTeam.captain}</span></h3>
            <h3 className='m-0 p-0 text-lg text-gray-900 font-semibold'>WicketKeeper: <span className='nav-link underline text-gray-400 cursor-pointer hover:text-gray-300 transition-all' onClick={()=>setOpenWicketKeeperModal(true)}>{currentTeam.keeper}</span></h3>
          </div>
          </div>
      <div className="stats flex flex-col p-10 gap-6">
        <div className="tournaments z-[2] mb-8">
          <h3 className="m-0 p-0 mx-auto text-center text-4xl text-gray-800 font-semibold underline mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Won Tournaments</h3>
        <TournamentTable tournaments={tournamentWins||[]} teamId={currentTeam.teamid}/>
        </div>
        <div className="matches z-[2]">
          <h3 className="m-0 p-0 mx-auto text-center text-4xl text-gray-800 font-semibold underline mb-2 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]">Matches</h3>
        <TeamMatchesTable matches={TeamMatches||[]} teamId={currentTeam.teamid}/>
        </div>
        <button onClick={handleClick} className='z-[3] btn btn-accent max-w-[300px]'>Back</button>
      </div>

      {openWicketKeeperModal && <WicketKeeperModal onClose={()=>setOpenWicketKeeperModal(false)} open={openWicketKeeperModal} keeper={currentWicketKeeper} loading={false} viewOnly/>}
      {openCaptainModal && <CaptainModal onClose={()=>setOpenCaptainModal(false)} open={openCaptainModal} captain={currentCaptain} loading={false} viewOnly/>}
      {openCoachModal && <CoachModal onClose={()=>setOpenCoachModal(false)} open={openCoachModal} coach={currentCoach} loading={false} viewOnly/>}
    </Wrapper>
  )
}

export default ReadTeam
const Wrapper=styled.div`
position: relative;
.back-image{

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(3px);
}
`