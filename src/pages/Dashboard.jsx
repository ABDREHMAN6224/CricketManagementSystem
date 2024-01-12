import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MainNav from '../components/MainNav'
import keeperImg from "../images/keeper.jpeg"
import playerImg from "../images/player.jpeg"
import umpireImg from "../images/umpire.jpeg"
import coachImg from "../images/coach.jpeg"
import captainImg from "../images/captain.jpeg"
import tournamentImg from "../images/tournament.jpeg"
import teamImg from "../images/team.jpeg"
import matchImg from "../images/match.jpeg"
import stadium from "../images/home.jpeg"
import country from "../images/background.jpeg"
import { useDispatch, useSelector } from 'react-redux'
import { backUpDb, getAllUsers, getNumberOfRecords } from '../features/authReducer'
import InfoCard from '../components/cards/InfoCard'
import PictureInput from '../components/inputs/PictureInput'
import AddStadiumModal from '../components/Modals/addModals/AddStadiumModal'
import AddCountryModal from '../components/Modals/addModals/AddCountryModal'
import UserTable from '../components/tables/UserTable'
import RegistrationForm from '../components/forms/RegistrationForm'
import { useNavigate } from 'react-router-dom'
import PlayerDashboard from './views/PlayerDashboard'
import TeamDashboard from './views/TeamDashboard'
import ERModal from '../components/Modals/ERModal'
import PasswordModal from '../components/Modals/PasswordModal'
import { toast } from 'react-toastify'
import Loader from '../components/Modals/Loader'

const Dashboard = () => {
  const {records,user,users,isBError,isBLoading}=useSelector(state=>state.auth);
  const [openAddLoactionModal,setOpenAddLocationModal]=useState(false);
  const [openAddCountryModal,setOpenAddCountryModal]=useState(false);
  const [openPlayer,setOpenPlayer]=useState(false);
  const [openHome,setOpenHome]=useState(true);
  const [openPasswordModal,setOpenPasswordModal]=useState(false);
  const [openErModal,setOpenErModal]=useState(false);
  const [password,setPassword]=useState("");
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/login")
    }
    else{
      if(user.userrole.toLowerCase()=="playermanager"){
        navigate("/playerdashboard")
      }
      else if(user.userrole.toLowerCase()=="teammanager"){
        navigate("/teamdashboard")
      }
      else if(user.userrole.toLowerCase()!="admin"){
        toast.error('You are not authorized to view this page');
        navigate("/");
      }

    }
  }, [user])
  const handleBackup=()=>{
    dispatch(backUpDb({password}))
    setPassword("");
    setLoading(true);
    if(isBError==false && isBLoading==false){
      setTimeout(() => {
        setLoading(false);
        setOpenPasswordModal(false);
    }, 2000);}
    else{
      if(isBLoading==false){
      setTimeout(() => {
        setLoading(false);
      }, 2000);}
    }
  }
  useEffect(()=>{
    dispatch(getNumberOfRecords());
    dispatch(getAllUsers());
  },[])
  return (
    <section className='w-screen h-screen max-h-screen'>
      {loading && <Loader/>}
      {openErModal && <ERModal open={openErModal} onClose={()=>setOpenErModal(false)}/>}
      {openPasswordModal && <PasswordModal open={openPasswordModal} onClose={()=>setOpenPasswordModal(false)} handleBackup={handleBackup} password={password} setPassword={setPassword}/>}
      <MainNav/>
      <Wrapper className=''>
        <div className="control-buttons flex flex-col items-center bg-gray-300 border-r-2 p-5 min-w-[350px] gap-12 pt-12 ">
          <div className="user-picture mx-auto flex flex-col items-center justify-center gap-6">
            <PictureInput picture={user?.userpicpath} disabled />
            <h3 className='mx-auto text-center mt-1 my-0 font-bold'>{user?.username}</h3>
            <h6 className='mx-auto text-center my-0 font-bold text-gray-500 capitalize'>{user?.userrole}</h6>
            
          <hr className='divider'/>
          </div>
          <div className="buttons flex flex-col gap-2 mt-0 w-full">
            
            {/* button for matches info */}
            {/* //download er Diagram button */}
              <button className='nav-link btn btn-outline'
                onClick={()=>{
                  setOpenHome(true)
                  setOpenPlayer(false)
                }}
              >Home</button>
              <button className='nav-link btn btn-outline'
                onClick={()=>{
                  setOpenHome(false)
                  setOpenPlayer(true)
                }}
              >Players</button>
               <button className='nav-link btn btn-outline'
            onClick={()=>{
              setOpenHome(false)
              setOpenPlayer(false)
            }}>Teams</button>
            <button className='nav-link btn btn-outline'
              onClick={()=>setOpenAddLocationModal(true)}
            >Add Stadium</button>
            <button className='nav-link btn btn-outline mb-0'

            onClick={()=>setOpenAddCountryModal(true)}
            >Add Country</button>


             <button className='nav-link btn btn-success mt-6'
            onClick={()=>setOpenPasswordModal(true)}
            >Backup Database</button>
            <button className='nav-link btn  btn-secondary'
            onClick={()=>setOpenErModal(true)}
            >View ER Diagram</button> 
          </div>

        </div>
        <div className="main-content py-8 bg-gray-300">
          {openHome?
        <div className=' ml-6'>
        <div className="records flex gap-4 flex-wrap">
        <InfoCard picture={playerImg} label="Registered Players" number={records?.players}/>
        <InfoCard picture={keeperImg} label="Registered WicketKeepers" number={records?.keepers}/>
        <InfoCard picture={umpireImg} label="Registered Umpires" number={records?.umpires}/>
        <InfoCard picture={coachImg} label="Registered Coaches" number={records?.coaches}/>
        <InfoCard picture={captainImg} label="Registered Captains" number={records?.captains}/>
        <InfoCard picture={tournamentImg} label="Registered Tournaments" number={records?.tournaments}/>
        <InfoCard picture={teamImg} label="Registered Teams" number={records?.teams}/>
        <InfoCard picture={matchImg} label="Registered Matches" number={records?.matches}/>
        <InfoCard picture={stadium} label="Registered Stadiums" number={records?.stadiums}/>
        <InfoCard picture={country} label="Registered Countries" number={records?.countries}/>
        </div>
        <div className="recent-activity h-full flex gap-4 mt-10">
          <UserTable users={users}/>
          <RegistrationForm/>
        </div>
        </div>:
          openPlayer?
          <PlayerDashboard/>:
          <TeamDashboard/>
        }
        </div>
      </Wrapper>
      {openAddCountryModal && <AddCountryModal open={openAddCountryModal} onClose={()=>setOpenAddCountryModal(false)}/>}
      {openAddLoactionModal && <AddStadiumModal open={openAddLoactionModal} onClose={()=>setOpenAddLocationModal(false)}/>}
    </section>
  )
}

export default Dashboard
const Wrapper=styled.div`
overflow: hidden;
  padding:0;
  display: grid;
  min-height: calc(100vh - 75px);
  max-height: calc(100vh - 75px);
  grid-template-columns: auto 1fr;
  .main-content{
    display: grid;
    grid-template-rows: auto 1fr;
  }
`