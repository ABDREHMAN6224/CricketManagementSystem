import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { deleteCoach, deleteCurrentCoach, getAllCoaches, setCurrentCoach, updateFilteredCoaches } from '../features/coachesReducer';
import Title from '../components/Title';
import CoachesFilter from '../components/filters/CoachesFilter';
import CoachModal from '../components/Modals/CoachModal';
import AddCoachModal from '../components/Modals/addModals/AddCoachModal';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Coaches = () => {
  const dispatch=useDispatch();
  const [openCoachesModal,setOpenCoachesModal]=useState(false);
  const {filteredCoaches,isError,isLoading,filters,allCoaches,currentCoach }=useSelector(state=>state.coach);
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}       dispatch(getAllCoaches());
  },[])
  useEffect(()=>{
      dispatch(updateFilteredCoaches());
  },[allCoaches,filters])
  const handleOpenModal=(coachid)=>{
    dispatch(setCurrentCoach(coachid));
    setOpenCoachesModal(true);
  }
  const handleDeleteCoach=(coachid)=>{
    let ok=confirm('Are you sure you want to delete this coach?');
    if(!ok) return;
    dispatch(deleteCurrentCoach(coachid));
    dispatch(deleteCoach(coachid));
  }
  return (
    <>
    <Title text={"Coaches"}/>
    <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
        <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
            <CoachesFilter/>
        </div>
        <div className="table-section bg-base-100 overflow-y-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                
                 <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Coach Pic
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Coach Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Team
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Action
                                        </th>
                                        
                                    </tr>
                                </thead>
                                <tbody>

            {isLoading && <div className="fixed w-full h-full inset-0 flex items-center justify-center">
                    <div className="loading"></div>
                </div>}                                        {isError && <div className="text-center m-auto">Something went wrong...</div>}
                                    {!isError && !isLoading && filteredCoaches.map((coach,index)=>{
                                    const {coachid,coachname,teamname,picture}=coach;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <div className="inline-flex w-10 h-10">
                                        <img className="w-10 h-10 object-cover rounded-full" src={picture || ""} alt="" />
                                    </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{coachname}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{teamname||"-"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                        <button className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleOpenModal(coachid)}
                                        >
                                            <FaEdit/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleDeleteCoach(coachid)}
                                        >
                                            <FaTrash/>
                                        </button>
                                    </div>
                                    </td>
                                    </tr>
                                    )
                                    }
                                    )}
                                </tbody>
                            </table>
                        </div>
        </div>
    </Wrapper>
    {openCoachesModal && currentCoach && <CoachModal open={openCoachesModal} onClose={()=>setOpenCoachesModal(false)} coach={currentCoach} loading={isLoading}/>}
    </>
  )
}

export default Coaches

const Wrapper=styled.div`
       display: grid;
    grid-template-columns: 1fr 5fr;
    gap: 1.25rem;
    min-height: 100%;
    .filters-section{
        min-height: 100%;
        width: 100%;
    }
`