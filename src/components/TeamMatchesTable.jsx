import dayjs from 'dayjs';
import React from 'react'
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const TeamMatchesTable = ({matches,teamId,onlyMatch=false}) => {
    const navigate=useNavigate();
  return (
<div className="table-section bg-base-100 overflow-y-auto opacity-inherit rounded-lg">
            <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[300px]">
                
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        {onlyMatch &&<th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        Team1
                                        </th>}
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        {onlyMatch?"Team2":"Opponent"}
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        Match Location
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        Match Date
                                        </th>                                    
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        {onlyMatch?"Winner":"Result"}
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        </th>                                    
                                    </tr>
                                </thead>
                                <tbody>
                        
                                    {matches.map((match,index)=>{
                                        const {team1,team2,team1id,matchid,winner,winnerteam,location,date}=match;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                        {onlyMatch &&<td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{team1}</p>
                                        </div>
                                        </td>}
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{onlyMatch?team2:team1id==teamId?team2:team1}</p>
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
                                        {onlyMatch? 
                                        <td className="px-6 py-4">
                                        <div className={"flex items-center space-x-3 text-green-500 font-extrabold"}>
                                        <p className="m-0">{winner}</p>
                                        </div>
                                        </td>
                                            :
                                        <td className="px-6 py-4">
                                        <div className={winnerteam==teamId?"flex items-center space-x-3 text-green-500 font-extrabold":"flex items-center space-x-3 text-red-500 font-extrabold"}>
                                        <p className="m-0">{winnerteam==teamId?"W":"L"}</p>
                                        </div>
                                        </td>
                                        
                                        }
                                     <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-red-500 text-xs cursor-pointer hover:scale-150 transition-all dark:text-white"><FaUpRightFromSquare
                                    onClick={()=>navigate('/readMatch/'+matchid)}
                                    /></p>
                                    </div>
                                    </td>
                                    </tr>
                                    )
                                    }
                                    )}
                                 
                                </tbody>
                            </table>
                        </div>
        </div>    )
}

export default TeamMatchesTable