import React from 'react'
import { useNavigate } from 'react-router-dom';
import {FaUpRightFromSquare} from 'react-icons/fa6';
const MatchBowlingScoreCard = ({scorecard,match=false}) => {
    const navigate=useNavigate();
  return (
        <div className="table-section bg-base-100 overflow-y-auto min-h-[50%] w-full opacity-90 ">
            <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[100%]">
                
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Player Name
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Overs
                                        </th>
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Maiden
                                        </th>                                        
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Wickets
                                        </th>
                                        
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Runs Conceeded
                                        </th>                                        
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Extras
                                        </th>                                        
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Economy
                                        </th>                                        
                                        <th scope="col" className="px-6 py-3 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                        </th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                                    {scorecard.map((card,index)=>{
                                        const {nowickets,playerid,playertype,runsconceded,oversbowled,maidenovers,noballs,extras,playername}=card;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{playername}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{oversbowled}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{maidenovers}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{nowickets||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{runsconceded||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{(Number(extras)+Number(noballs))||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{`${(Number(runsconceded)/Number(oversbowled)).toFixed(2)}`||"0.00"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-red-500 text-xs cursor-pointer hover:scale-150 transition-all dark:text-white"><FaUpRightFromSquare
                                    onClick={()=>navigate('/readPlayer/'+playertype+"/"+playerid)}
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
        </div>  )
}

export default MatchBowlingScoreCard