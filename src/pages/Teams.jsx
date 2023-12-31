import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import MainNav from '../components/MainNav'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentTeam, deleteTeam, getAllTeams, getTeamById, updateFilteredTeams } from '../features/teamReducer'
import TeamFilters from '../components/filters/TeamFilters'
import TeamModal from '../components/Modals/TeamModal'
import { useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Teams = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [openTeamsModal,setOpenTeamsModal]=useState(false);
    const {filteredTeams,currentTeam,isLoading,filters,allTeams,teamLoading }=useSelector(state=>state.team);
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}         dispatch(getAllTeams());
    },[])
    useEffect(()=>{
        dispatch(updateFilteredTeams());
    },[filters])
    const handleOpenTeamModal=(id)=>{
        dispatch(getTeamById(id));
        setOpenTeamsModal(true);
    }
    const handleDelete=(teamid)=>{
        const ok=confirm('Are you sure you want to delete this team? It would also delete any records associated with this team');
        if(!ok){
            return;
        }
        dispatch(deleteCurrentTeam({id:teamid}));
        setTimeout(() => {
            dispatch(deleteTeam(teamid));
        }, 2000);
    }
  return (
    <>
        <Title text={"Teams"}/>
        <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
            <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
                <TeamFilters/>
            </div>
            <div className="table-section bg-base-100 overflow-y-auto">
                

<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
    
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Team Logo
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Team Name
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Coach 
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Captain
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    T20i Rank
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    ODI Rank
                </th>
                <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                    Test Rank
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
                {!isLoading && filteredTeams.map((team,index)=>{
                const {teamid,teampicpath,teamname,coachname,captain,t20irank,odirank,testrank}=team;
                return(
                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                <div className="inline-flex w-10 h-10">
                                    <img className="w-10 h-10 object-cover rounded-full" src={teampicpath} alt="" />
                                </div>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{teamname}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{coachname}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{captain}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{t20irank}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{odirank}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
                                    <p className="m-0">{testrank}</p>
                            </div>
                        </td>
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
 <button className="text-blue-500 hover:text-blue-700 text-xl font-bold py-2 px-4 rounded"
  onClick={()=>navigate('/readTeam/'+teamid)}

 >
                                            <TbListDetails/>
                                        </button>
                                        <button className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleOpenTeamModal(teamid)}
                                        >
                                            <FaEdit/>
                                        </button>
                                        <button className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleDelete(teamid)}
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
        {openTeamsModal && currentTeam && <TeamModal open={openTeamsModal} onClose={()=>setOpenTeamsModal(false)} team={currentTeam} loading={teamLoading}/>}
    </>
  )
}

export default Teams
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