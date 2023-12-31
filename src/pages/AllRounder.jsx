import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MainNav from '../components/MainNav'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { deleteAllRounder, getAllRounderById, getAllRounders, updateFilteredAllRounders } from '../features/allRounderReducer'
import AllRounderFilters from '../components/filters/AllRounderFilters'
import AllRounderModal from '../components/Modals/AllRounderModal'
import { deletePlayer } from '../features/playerReducer'
import { useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'
const AllRounder = () => {
    const dispatch=useDispatch();
    const {filteredAllRounders,allRounders,filters,isLoading,currentAllRounder }=useSelector(state=>state.allRounder);
    const [openAllRoundersModal,setOpenAllRoundersModal]=useState(false);
    const [disabled,setDisabled]=useState(false);
    const navigate=useNavigate();
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='playermanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }
      }
        dispatch(getAllRounders());
    },[])
    useEffect(()=>{
        dispatch(updateFilteredAllRounders())
    },[allRounders,filters])
    const handleOpenAllrounderModal=(id)=>{
        dispatch(getAllRounderById(id));
        setOpenAllRoundersModal(true);
    }
    const handleDelete=(playerid,type)=>{
        setDisabled(true);
        type=type.toLowerCase();
        const ok=confirm('Are you sure you want to delete this player? It would also delete any records associated with this player');
        if(!ok){
            setDisabled(false);
            return;
        }
        dispatch(deleteAllRounder({id:playerid}));
        setTimeout(() => {
            dispatch(deletePlayer({playerid,type:type}));
            setDisabled(false);
        }, 2000);
    }
  return (
    <>
        <Title text={"All Rounder"}/>
    
        <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
            <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
                <AllRounderFilters/>
            </div>
            <div className="table-section bg-base-100 overflow-y-auto">
                

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Player Pic
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Player Name
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Batting Avg
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Bowling Avg
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    ICC Ranking
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
                </div>}
            {!isLoading && filteredAllRounders.map((batsman,index)=>{
                const {playerid,country,playername,teamname,allrounderrank,playerpicpath,noruns,totalinningsbatted,oversbowled,runsconceded,playertype}=batsman;
                return(
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                <div className="inline-flex w-10 h-10">
                                    <img className="w-10 h-10 object-cover rounded-full" src={playerpicpath} alt="" />
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{playername}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{totalinningsbatted?(noruns/totalinningsbatted).toFixed(2):0.00}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{
                                            oversbowled?(runsconceded/oversbowled).toFixed(2):0.00
                                    }</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{allrounderrank}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{teamname}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{country}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
 <button disabled={disabled} className="text-blue-500 hover:text-blue-700 text-xl font-bold py-2 px-4 rounded"
                                         onClick={()=>navigate('/readPlayer/'+playertype+"/"+playerid)}
 >
                                            <TbListDetails />
                                        </button>
                                        <button disabled={disabled} className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleOpenAllrounderModal(playerid)}
                                        >
                                            <FaEdit/>
                                        </button>
                                        <button disabled={disabled} className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleDelete(playerid,'allrounder')}
                                        >
                                            <FaTrash/>
                                        </button>                            </div>
                        </td>
                    </tr> 

                )    
            })}
        </tbody>
    </table>
</div>

            </div>
        </Wrapper>
        {openAllRoundersModal && currentAllRounder && <AllRounderModal open={openAllRoundersModal} onClose={()=>setOpenAllRoundersModal(false)} allRounder={currentAllRounder} loading={isLoading}/>}
    </>
  )
}

export default AllRounder
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