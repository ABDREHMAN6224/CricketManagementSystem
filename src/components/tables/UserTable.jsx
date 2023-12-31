import React from 'react'
import { FaTrash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteUser } from '../../features/authReducer';
import dayjs from 'dayjs';
const UserTable = ({users}) => {
    const dispatch=useDispatch();
    const handleDeleteUser=(username)=>{
        if(confirm("Are you sure you want to delete this user?")){
            console.log("delete user");
            dispatch(deleteUser(username));
        }
    }
  return (
      <div className="table-section bg-base-100 shadow-lg overflow-y-auto rounded-2xl opacity-90 min-h-[230px] max-h-[420px] min-w-[450px] max-w-3xl">
            <div className="relative overflow-auto shadow-md sm:rounded-lg min-h-full max-h-[100%]">
                
            <table className="w-full table text-sm text-left rtl:text-right text-gray-500 min-h-full dark:text-gray-400  table-pin-rows table-pin-cols">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                    <tr>
                                        <th scope="col" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            User Picture
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            User Name
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Role Assigned
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            Joined
                                        </th>
                                        <th scope="col" className="px-6 py-4 font-extrabold text-gray-900 whitespace-nowrap dark:text-white">
                                            
                                            
                                        </th>
                                                                               
                                    </tr>
                                </thead>
                                <tbody>
                        
                                    {users.map((user,index)=>{
                                        const {username,userrole,userpicpath,datejoined}=user;
                                    return(
                                    <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                                    <td className="px-6 py-2">
                                    <div className="flex items-center space-x-3">
                                    <div className="inline-flex w-12 h-12">
                            <img className="w-12 h-12 object-cover rounded-full hover:scale-110 cursor-pointer transition-all" src={userpicpath || ""} alt="" />
                            </div>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{username}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{userrole}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="flex items-center space-x-3">
                                    <p className="m-0 text-gray-900 dark:text-white">{dayjs(datejoined||"").format('DD-MMM-YY')}</p>
                                    </div>
                                    </td>
                                    <td className="px-6 py-4">
                                    <div className="text-red-500 cursor-pointer hover:text-red-700 transition-all flex items-center space-x-3"
                                    onClick={()=>handleDeleteUser(username)}
                                    >
                                        <FaTrash/>
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
  )
}

export default UserTable