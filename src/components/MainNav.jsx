import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import  {NavLink}  from "react-router-dom";
import { logoutUser } from '../features/authReducer';


const MainNav = () => {
  const {user}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if(!user){
      return;
    }
    else{
      if(user.userrole.toLowerCase()=="admin"){
        return;
      }
      if(user.userrole.toLowerCase()=="playermanager"){
        document.querySelectorAll('.team-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.tournament-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.team-data-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.tournament-data-grp').forEach((el)=>{
          el.style.display='none';
        })
      }
      else if(user.userrole.toLowerCase()=="teammanager"){
        document.querySelectorAll('.player-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.tournament-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.player-data-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.tournament-data-grp').forEach((el)=>{
          el.style.display='none';
        })
      }
      else if(user.userrole.toLowerCase()=="tournamentmanager"){
        document.querySelectorAll('.player-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.team-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.player-data-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.team-data-grp').forEach((el)=>{
          el.style.display='none';
        })
      }
      else if(user.userrole.toLowerCase()=="datamanager"){
        document.querySelectorAll('.player-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.team-grp').forEach((el)=>{
          el.style.display='none';
        })
        document.querySelectorAll('.tournament-grp').forEach((el)=>{
          el.style.display='none';
        })
      }

    }
  }, [user])
  return (
    <div className="navbar bg-base-200 shadow-inner">
  <div className="navbar-start">
    <div className="drawer z-10">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        <label htmlFor='my-drawer' className='btn drawer-button'>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
      </div>
      {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"> */}
    <div className="drawer-side">
    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content z-4">  
      <li className='font-semibold text-3xl mb-4 border-b-2 '>Navigator</li>    
      <li className='mb-1'><NavLink to={"/"} className="nav-link" >Home </NavLink></li>
      <div className='player-grp'>
      <li className='mb-1'><NavLink to={"/batsmen"} className="nav-link" >Batsman </NavLink></li>
      <li className='mb-1'><NavLink to={"/bowler"} className="nav-link">Bowler </NavLink></li>
      <li className='mb-1'><NavLink to={"/allrounder"} className="nav-link">Allrounder </NavLink></li>
      </div>
      <div className="team-grp">
      <li className='mb-1'><NavLink to={"/teams"} className="nav-link">Teams </NavLink></li>
      <li className='mb-1'><NavLink to={"/captains"} className="nav-link">Captains</NavLink></li>
      <li className='mb-1'><NavLink to={"/wicketkeepers"} className="nav-link">WicketKeepers</NavLink></li>
      <li className='mb-1'><NavLink to={"/coaches"} className="nav-link">Coaches</NavLink></li>
      </div>
      <div className="tournament-grp">
      <li className='mb-1'><NavLink to={"/matches"} className="nav-link">Matches </NavLink></li>
      <li className='mb-1'><NavLink to={"/tournament"} className="nav-link">Tournament </NavLink></li>
      <li className='mb-1'><NavLink to={"/umpires"} className="nav-link">Umpires</NavLink></li>
      </div>
        <li className='font-semibold text-3xl mb-4 mt-9 border-b-2 '>Controls</li> 
        <div className="player-data-grp">
        <li className='mb-1'><NavLink className="nav-link" to={"/addPlayer"}>Create Player</NavLink></li>
          </div>
          <div className="team-data-grp">
        <li className='mb-1'><NavLink className="nav-link" to={"/addCoach"}>Create Coach</NavLink></li>
        <li className='mb-1'><NavLink className="nav-link" to={"/addCaptain"}>Create Captain</NavLink></li>
        <li className='mb-1'><NavLink className="nav-link" to={"/addWicketKeeper"}>Create WicketKeeper</NavLink></li>
        <li className='mb-1'><NavLink className="nav-link" to={"/addTeam"}>Create Team</NavLink></li>
            </div>
            <div className="tournament-data-grp">
        <li className='mb-1'><NavLink className="nav-link" to={"/addTournament"}>Create Tournament</NavLink></li>
        <li className='mb-1'><NavLink className="nav-link" to={"/addUmpire"}>Create Umpire</NavLink></li>
        <li className='mb-1'><NavLink className="nav-link" to={"/addMatch"}>Create Match</NavLink></li>
              </div>   

    </ul>
  </div>
        
      {/* </ul> */}
    </div>
  </div>
  <div className="navbar-center">
    <a className="text-2xl from-accent-content font-bold">Cricket Management System</a>
  </div>
  <div className="navbar-end">
    <div className="navbar-item flex items-center gap-4">
      <p className='m-0 p-0 mr-4 font-bold text-gray-600 capitalize'>
        {user?.userrole}
      </p>
      {user?.userrole.toLowerCase()=="admin"||user?.userrole.toLowerCase()=="playermanager"||user?.userrole.toLowerCase()=="teammanager"?
        <button className='btn btn-md btn-outline mr-3'
        >
          <NavLink to={"/dashboard"} className="nav-link">Dashboard</NavLink>  
        </button>      
          :""
        }
    </div>
     <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-13 rounded-full">
          <img alt="Tailwind CSS Navbar component" src={user?.userpicpath} />
        </div>
      </div>
      <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[3] p-2 shadow bg-base-100 rounded-box w-44">
        
        <li><NavLink to={"/"} className="nav-link" >Home </NavLink></li>
                <li><a className="nav-link text-red-500"
                onClick={()=>dispatch(logoutUser())}
                >Logout</a></li>

      </ul>
    </div>
  </div>
</div>
  )
}

export default MainNav
