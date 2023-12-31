import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import homeImg from '../images/home.jpeg'
import { useNavigate } from 'react-router-dom'
const HomePage = () => {
  const {user}=useSelector(state=>state.auth);
  const navigate=useNavigate();
  return (
    <Wrapper className='relative w-screen'>
      <div className="image absolute inset-0 h-[100%] top-0 " style={{backgroundImage:`url(${homeImg})`}}></div>
      <div className="text absolute inset-0 flex flex-col items-center justify-center z-[2]">
        <h1 className='text-7xl text-gray-300 font-bold mb-10'> Welcome To </h1>
        <h1 className='text-8xl text-base-200 font-extrabold mb-1'>
         Cricket Data
        </h1>
        <h1 className='text-8xl text-base-100 font-extrabold mb-12'>
          Management System
        </h1>
        <div className='flex items-center gap-3 mt-4'>

          {(user?.userrole.toLowerCase()=="admin" || user?.userrole.toLowerCase()=="playermanager")?
        <button className='bg-gray-800 text-gray-100 text-xl font-semibold px-10 py-4 rounded-lg hover:bg-gray-700 transition-all' onClick={()=>navigate("/allrounder")}>Players</button>
   :""   }
          {(user?.userrole.toLowerCase()=="admin" || user?.userrole.toLowerCase()=="teammanager")?
        <button className='bg-gray-800 text-gray-100 text-xl font-semibold px-10 py-4 rounded-lg hover:bg-gray-700 transition-all' onClick={()=>navigate("/teams")}>Teams</button>
        
      :""}
          {(user?.userrole.toLowerCase()=="admin" || user?.userrole.toLowerCase()=="tournamentmanager")?
        <button className='bg-gray-800 text-gray-100 text-xl font-semibold px-10 py-4 rounded-lg hover:bg-gray-700 transition-all' onClick={()=>navigate("/matches")}>Matches</button>
        :"" 
      }
  
      {(user?.userrole.toLowerCase()=="admin" || user?.userrole.toLowerCase()=="tournamentmanager")?
        <button className='bg-gray-800 text-gray-100 text-xl font-semibold px-10 py-4 rounded-lg hover:bg-gray-700 transition-all' onClick={()=>navigate("/tournament")}>Tournaments</button>
        :""
      }
        </div>
      </div>
    </Wrapper>
  )
}

export default HomePage
const Wrapper = styled.div`
height: calc(100vh - 70px);
.image{
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: brightness(0.8) blur(2px);
}

`