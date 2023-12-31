import React from 'react'
import Modal from './Modal'

const PasswordModal = ({open,onClose,handleBackup,setPassword,password}) => {
  return (
    <Modal open={open} onClose={onClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
            <div className="flex flex-col items-center justify-center gap-2">
            <h3 className='text-3xl font-bold pb-3'>
                Enter Database Password
            </h3>
            <div className="flex flex-col gap-3">
                <input type="password" placeholder="Enter Password" className="border border-gray-400 px-3 py-2 rounded-md focus:outline-none focus:border-blue-500 mb-8"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
            </div>
            <button className="bg-blue-500 text-white px-3 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            onClick={handleBackup}
            >Create Backup</button>
            </div>
        </div>
    </Modal>
    )
}

export default PasswordModal