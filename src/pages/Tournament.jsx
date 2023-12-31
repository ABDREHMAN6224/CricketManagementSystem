import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentTournament, deleteTournament, getAllTournaments, getTournamentById, removeCurrentTournament, updateFilteredTournaments } from '../features/tournamentReducer'
import dayjs from 'dayjs'
import TournamentFilters from '../components/filters/TournamentFilters'
import TournamentModal from '../components/Modals/TournamentModal'
import { NavLink, useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Tournament = () => {
    const dispatch=useDispatch();
    const [openTournamentsModal,setOpenTournamentsModal]=useState(false);
    const navigate=useNavigate();
    const {filteredTournaments,isError,isLoading,filters,allTournaments,currentTournament,singleTournamentLoading }=useSelector(state=>state.tournament);
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='tournamentmanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}   
        dispatch(removeCurrentTournament());
        dispatch(getAllTournaments());
    },[])
    useEffect(()=>{
        dispatch(updateFilteredTournaments())
    },[filters,allTournaments])
    const handleOpenTournamentModal=(tournamentid)=>{
        dispatch(getTournamentById(tournamentid));
        setOpenTournamentsModal(true);
    }
    const handleDleteTournament=(tournamentid)=>{
        let ok=confirm('Are you sure you want to delete this tournament? All the matches associated with this tournament will also be deleted.');
        if(!ok){
            return;
        }
        dispatch(deleteCurrentTournament(tournamentid));
        dispatch(deleteTournament(tournamentid));
    }
  return (
    <>
    <Title text='Tournament'/>
      <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
            <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
                <TournamentFilters/>
            </div>
            <div className="table-section bg-base-100 overflow-y-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                  
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Tournament Logo
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Tournament
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Start Date
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                End Date
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Winning Team
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Winning Team Pic
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

            {isLoading && <div className="fixed w-full h-full inset-0 flex items-center justify-center">
                    <div className="loading"></div>
                </div>}                                            {isError && <div className="text-center m-auto">Something went wrong...</div>}
                                        {!isError && !isLoading && filteredTournaments.map((tournament,index)=>{
                                        const {tournamentid,tournamentlogo,name,startdate,enddate,teamname,teampicpath}=tournament;
                                        return(
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            
                                        
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <div className="inline-flex w-10 h-10">
                                        <img className="w-10 h-10 object-cover rounded-full" src={tournamentlogo || ""} alt="" />
                                        </div>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{name}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{dayjs(startdate).format('DD-MM-YYYY')}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{dayjs(enddate).format('DD-MM-YYYY')}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{teamname}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <div className="inline-flex w-10 h-10">
                                        <img className="w-10 h-10 object-cover rounded-full" src={teampicpath || ""} alt="" />
                                        </div>
                                        </div>
                                        </td>
                                        
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
 <button className="text-blue-500 hover:text-blue-700 text-xl font-bold py-2 px-4 rounded"
  onClick={()=>navigate('/readTournament/'+tournamentid)}

 >
                                            <TbListDetails/>
                                        </button>
                                        <button className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleOpenTournamentModal(tournamentid)}
                                        >
                                            <FaEdit/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleDleteTournament(tournamentid)}
                                        >
                                            <FaTrash/>
                                        </button>                            </div>
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
    {openTournamentsModal && currentTournament && <TournamentModal open={openTournamentsModal} onClose={()=>setOpenTournamentsModal(false)} tournament={currentTournament} loading={singleTournamentLoading}/>}
    </>
  )
}

export default Tournament
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