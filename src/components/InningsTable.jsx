import React from 'react'
import { FaUpRightFromSquare } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';

const InningsTable = ({playerInnings,match=false}) => {
    const navigate=useNavigate();
  return (
        <div className="table-section bg-base-100 overflow-y-auto rounded-lg opacity-90 min-h-[200px] max-h-[450px]">
            <div className="relative overflow-auto shadow-md sm:rounded-lg max-h-[100%]">
                
    <table className="w-full table text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Opponent Team
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Runs
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Wickets
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Boundaries
                                        </th>                                        
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            Bowling
                                        </th>                                        
                                        <th scope="col" className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap dark:text-white">
                                            
                                        </th>                                        
                                    </tr>
                                </thead>
                                <tbody>
                        
                                    {playerInnings.map((coach,index)=>{
                                    const {op1,op2,teamname,nowickets,noruns,nosixes,nofours,runsconceded,matchid}=coach;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{op1.toLowerCase()==teamname.toLowerCase()?op2:op1}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{noruns||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{nowickets||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{(Number(nosixes)+Number(nofours))||"0"}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{`${runsconceded}-${nowickets}`||"0-0"}</p>
                                    </div>
                                    </td>
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
        </div>  )
}

export default InningsTable