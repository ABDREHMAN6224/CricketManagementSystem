import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { deleteCurrentWicketKeeper, deleteWicketKeeper, getAllWicketKeepers, setCurrentWicketKeeper, updateFilteredWicketKeepers } from '../features/wicketKeeperReducers';
import { useDispatch, useSelector } from 'react-redux';
import Title from '../components/Title';
import WicketkeeperFilters from '../components/filters/WicketkeeperFilters';
import WicketKeeperModal from '../components/Modals/WicketKeeperModal';
import AddWicketKeeperModal from '../components/Modals/addModals/AddWicketKeeperModal';
import { NavLink } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { toast } from 'react-toastify';

const WicketKeepers = () => {
  const dispatch=useDispatch();
  const [openWicketKeepersModal,setOpenWicketKeepersModal]=useState(false);
  const [openAddWicketKeeperModal,setOpenAddWicketKeeperModal]=useState(false);
  const {filteredWicketKeepers,isError,isLoading,filters,allWicketKeepers,currentWicketKeeper }=useSelector(state=>state.wicketKeeper);
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}       dispatch(getAllWicketKeepers());
  },[])
  useEffect(()=>{
      dispatch(updateFilteredWicketKeepers());
  },[filters,allWicketKeepers])
  const handleOpenWicketKeepersModal=(playerid)=>{
    dispatch(setCurrentWicketKeeper(playerid));
    setOpenWicketKeepersModal(true);
  }
const handleDeleteWicketKeeper=(playerid)=>{
    let ok=confirm("Are you sure you want to delete this wicket keeper?");
    if(!ok){
        return;
    }
    dispatch(deleteCurrentWicketKeeper(playerid));
    dispatch(deleteWicketKeeper(playerid));
}
  return (
    <>
    
    <Title text={"Wicket Keepers"}/>
    <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
        <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
            <WicketkeeperFilters/>
        </div>
        <div className="table-section bg-base-100 overflow-y-auto">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Wicket Keeper Pic
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Wicket Keeper Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            No Of Dismissals
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
                                    {!isError && !isLoading && filteredWicketKeepers.map((wicketKeeper,index)=>{
                                    const {playerid,playername,country,teamname,playerpicpath,totalstumps,totalcatches}=wicketKeeper;
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
                                    <p className="m-0 text-gray-900 dark:text-white">{Number(totalcatches)+Number(totalstumps)}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{teamname}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{country}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <button className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                    onClick={()=>handleOpenWicketKeepersModal(playerid)}
                                    >
                                        <FaEdit/>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                    onClick={()=>handleDeleteWicketKeeper(playerid)}
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
    {openAddWicketKeeperModal && <AddWicketKeeperModal openWicketKeepersModal={openAddWicketKeeperModal} onClose={()=>setOpenAddWicketKeeperModal(false)}/> }
{openWicketKeepersModal && currentWicketKeeper && <WicketKeeperModal openWicketKeepersModal={openWicketKeepersModal} onClose={()=>setOpenWicketKeepersModal(false)} loading={isLoading} keeper={currentWicketKeeper}/> }
    </>
  )
}

export default WicketKeepers
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