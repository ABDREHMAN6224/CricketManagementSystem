import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Title from '../components/Title'
import { useDispatch, useSelector } from 'react-redux'
import { deleteCurrentMatch, deleteMatch, getAllMatches, getMatchById, removeCurrentMatch, updateFilteredMatches } from '../features/matchReducer'
import dayjs from 'dayjs'
import MatchesFilter from '../components/filters/MatchesFilter'
import MatchModal from '../components/Modals/MatchModal'
import { removeError } from '../features/playerReducer'
import { useNavigate } from 'react-router-dom'
import { TbListDetails } from 'react-icons/tb'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Matches = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [openMatchesModal,setOpenMatchesModal]=useState(false);
    const {filteredMatches,isError,isLoading,filters,allMatches,matchLoading,currentMatch }=useSelector(state=>state.match);
    const [disabled,setDisabled]=useState(false);
const {user}=useSelector(state=>state.auth);
  useEffect(()=>{
     if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='tournamentmanager' && user.userrole.toLowerCase()!='admin'){
              toast.error('You are not authorized to view this page');
                navigate('/');
            }}         dispatch(removeCurrentMatch());
        dispatch(removeError());
        dispatch(getAllMatches());
    },[])
    useEffect(()=>{
        dispatch(updateFilteredMatches());
    },[filters,allMatches])
    const handleOpenMatchesModal=(matchid)=>{
        dispatch(getMatchById(matchid));
        setOpenMatchesModal(true);
    }
    const handleDeleteMatch=(matchid)=>{
        const ok=confirm('Are you sure you want to delete this match? It would also delete any records associated with this match');
        if(!ok){
            return;
        }
        setDisabled(true);
        dispatch(deleteCurrentMatch(matchid));
           setTimeout(() => {
            dispatch(deleteMatch(matchid));
            setDisabled(false);
        }, 2000);
    
    }
  return (
    <>
        <Title text={"Matches"}/> 
        <Wrapper className='p-5 pl-[8rem] pr-[8rem] ' >
            <div className="filters-section border-0 border-r-[1px] border-slate-300 bg-base-100">
                <MatchesFilter/>
            </div>
            <div className="table-section bg-base-100 overflow-y-auto">
                <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                 
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                        <tr>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                Match
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                stadium
                                            </th>
                                            <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                                date
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
                                        {!isError && !isLoading && filteredMatches.map((match,index)=>{
                                        const {matchid,team1,team2,winner,team1id,team2id,winnerpic,team1pic,team2pic,location,date,winnerteam}=match;
                                        return(
                                        <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                            
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{`${team1} vs ${team2}`}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{location}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{dayjs(date).format('DD-MMM-YYYY')}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{winner}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        {winnerteam?
                                        <div className="inline-flex w-10 h-10">
                                            
                                        <img className="w-10 h-10 object-cover rounded-full" src={winnerteam?winnerteam==team1id?team1pic:team2pic:""} alt="Drawn" />
                                        </div>
                                        :
                                            <p className="m-0 font-semibold">Drawn</p>
                                        }
                                        </div>
                                        </td>
                                        
                        <td className="px-6 py-4">
                            <div className="flex items-center space-x-3">
 <button disabled={disabled} className="text-blue-500 hover:text-blue-700 text-xl font-bold py-2 px-4 rounded"
  onClick={()=>navigate('/readMatch/'+matchid)}

 >
                                            <TbListDetails/>
                                        </button>
                                        <button disabled={disabled} className="text-green-500 hover:text-green-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleOpenMatchesModal(matchid)}
                                        >
                                            <FaEdit/>
                                        </button>
                                        <button disabled={disabled} className="text-red-500 hover:text-red-700 text-xl font-bold py-2 px-4 rounded"
                                        onClick={()=>handleDeleteMatch(matchid)}
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
    {openMatchesModal && currentMatch && <MatchModal open={openMatchesModal} onClose={()=>setOpenMatchesModal(false)} match={currentMatch} loading={matchLoading}/>}
    </>
  )
}

export default Matches
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