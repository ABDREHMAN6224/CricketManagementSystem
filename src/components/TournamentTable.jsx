import dayjs from 'dayjs';
import React from 'react'
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const TournamentTable = ({tournaments=[],teamId}) => {
    const navigate=useNavigate();
  return (
 <div className="table-section bg-base-100 overflow-y-auto rounded-lg">
            <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[300px]">
                
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        Tournament Logo
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        Tournament Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        From
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        To
                                        </th>                                      
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                        </th>                                      
                                    </tr>
                                </thead>
                                <tbody>
                        
                                    {tournaments.map((tournament,index)=>{
                                        const {tournamentlogo,tournamentid,name,startdate,enddate}=tournament;
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
                                        <p className="m-0">{dayjs(startdate).format('DD-MMM-YYYY')}</p>
                                        </div>
                                        </td>
                                        <td className="px-6 py-4">
                                        <div className="flex items-center space-x-3">
                                        <p className="m-0">{dayjs(enddate).format('DD-MMM-YYYY')}</p>
                                        </div>
                                        </td>
                                         <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-red-500 text-xs cursor-pointer hover:scale-150 transition-all dark:text-white"><FaUpRightFromSquare
                                    onClick={()=>navigate('/readTournament/'+tournamentid)}
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

export default TournamentTable