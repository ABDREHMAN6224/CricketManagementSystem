import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux';
import { deleteCaptain, deleteCurrentCaptain, getAllCaptains, getCaptainById, updateFilteredCaptains } from '../features/captainReducer';
import CaptainFilters from '../components/filters/CaptainFilters';
import CaptainModal from '../components/Modals/CaptainModal';
import AddCaptainModal from '../components/Modals/addModals/AddCaptainModal';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const Captains = () => {
  const dispatch=useDispatch();
  const {filteredCaptains,isError,isLoading,filters,allCaptains,currentCaptain,captainLoading}=useSelector(state=>state.captain);
  const [openCaptainsModal,setOpenCaptainsModal]=useState(false);

const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}      dispatch(getAllCaptains());
  },[])
  useEffect(()=>{
      dispatch(updateFilteredCaptains());
  },[allCaptains,filters])
  const handleOpenCaptainsModal=(captainid)=>{
    dispatch(getCaptainById(captainid));
    setOpenCaptainsModal(true);
  }
  const handleDeleteCaptain=(captainid)=>{
    let ok=confirm('Are you sure you want to delete this captain?');
    if(!ok){
        return;
    }
    dispatch(deleteCurrentCaptain(captainid));
    dispatch(deleteCaptain(captainid));
  }
  return (
    <>
    <Title text={"Captains"}/>
    <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
        <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
            <CaptainFilters/>
        </div>
        <div className="table-section bg-base-100 overflow-y-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Captain Pic
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Captain Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            No Of Matches
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Team
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Registered Team
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
                                    {!isError && !isLoading && filteredCaptains?.map((captain,index)=>{
                                    const {playerid,playername,country,teamname,playerpicpath,matchesascaptain}=captain;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <div className="inline-flex w-10 h-10">
                                        <img className="w-10 h-10 object-cover rounded-full" src={playerpicpath || ""} alt="" />
                                    </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{playername}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{matchesascaptain}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{teamname||"-"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{country||"-"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">

                                    <button className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                    onClick={()=>handleOpenCaptainsModal(playerid)}
                                    >
                                        <FaEdit/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                    onClick={()=>handleDeleteCaptain(playerid)}
                                    >
                                        <FaTrash/>
                                    </button>
                                    </div>
                                    </td>
                                    </tr>
                                    )
                                    })}

                                </tbody>
                    </table>
            </div>
        </div>
    </Wrapper>
{openCaptainsModal && currentCaptain && <CaptainModal open={openCaptainsModal} onClose={()=>setOpenCaptainsModal(false)} loading={captainLoading} captain={currentCaptain}/>}
    </>
  )
}

export default Captains
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