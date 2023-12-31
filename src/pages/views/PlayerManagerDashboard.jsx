import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import {useSelector,useDispatch} from 'react-redux'
import { getTopPlayers, getTopTeams } from '../../features/authReducer';
import { useNavigate } from 'react-router-dom';
import InfoCard from '../../components/cards/InfoCard';
import RankingCard from '../../components/cards/RankingCard';
import MainNav from '../../components/MainNav';
import PictureInput from '../../components/inputs/PictureInput';
import PlayerDashboard from './PlayerDashboard';
import ERModal from '../../components/Modals/ERModal';
import { toast } from 'react-toastify';

const PlayerManagerDashboard = () => {
    const {isUserError,topPlayers,user}=useSelector(state=>state.auth);
    const [openErModal,setOpenErModal]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
useEffect(() => {
    if(!user){
      navigate("/login")
    }else{
      if(user.userrole.toLowerCase()!='playermanager'){
        toast.error('You are not authorized to view this page');
        navigate("/");
      }
    }
}, [user])
    useEffect(()=>{
        dispatch(getTopPlayers());
    },[])
  return (
     <section className='w-screen h-screen'>
      {openErModal && <ERModal open={openErModal} onClose={()=>setOpenErModal(false)}/>}
      <MainNav/>
      <Wrapper>
        <div className="control-buttons flex flex-col items-center bg-base-200 p-5 gap-12 pt-12">
          <div className="user-picture mx-auto flex flex-col items-center justify-center gap-6">
            <PictureInput picture={user?.userpicpath} disabled />

            <h3 className='mx-auto text-center mt-1 my-0 font-bold drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]'>{user?.username}</h3>
            <h6 className='mx-auto text-center my-0 font-bold text-gray-500 capitalize'>{user?.userrole}</h6>          <hr className='divider'/>
          </div>
          <button className='nav-link btn btn-outline btn-secondary mt-10'
            onClick={()=>setOpenErModal(true)}
            >View ER Diagram</button>
        </div>
        <div className="main-content p-5 w-full h-full bg-gray-300">
          <PlayerDashboard/>
        </div>
      </Wrapper>
    </section>
  )
}

export default PlayerManagerDashboard
const Wrapper=styled.div`
  padding:0;
  display: grid;
  min-height: calc(100vh - 75px);
  max-height: calc(100vh - 75px);
  grid-template-columns: 1fr 5fr;
  .main-content{
    display: grid;
    grid-template-rows: auto 1fr;
    gap: 1rem;
  }
`