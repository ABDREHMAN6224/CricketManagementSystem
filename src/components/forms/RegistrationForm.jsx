import React, { useState } from 'react'
import FormInput from '../FormInput'
import Sorting from '../inputs/Sorting';
import SubmitBtn from '../SubmitBtn';
import PictureInput from '../inputs/PictureInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { registerUser } from '../../features/authReducer';
import Loader from '../Modals/Loader';

const RegistrationForm = () => {
    const roleOptions=[
        {label:"Admin",value:"admin"},
        {label:"Player Manager",value:"playermanager"},
        {label:"Team Manager",value:"teammanager"},
        {label:"Tournament Manager",value:"tournamentmanager"},
        {label:"Data Manager",value:"datamanager"}
    ]
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [role,setRole]=useState("admin");
    const [userpicpath,setUserpicpath]=useState("");
    const {isUserLoading:loading,isUserError}=useSelector(state=>state.auth);
    const dispatch=useDispatch();

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(!username || !password || !role || !userpicpath){
            toast.error("Please fill all the fields");
            return;
        }
        dispatch(registerUser({username,password,role,userpicpath}));
        if(!isUserError && !loading){
            toast.success("User Registered Successfully");
            setTimeout(()=>{
                setUsername("");
                setPassword("");
                setRole("admin");
                setUserpicpath("");
            },1000)
        }
    }

  return (
 <section className='ml-12'>
      {loading && <Loader/>}
        <form method='post'  className="card w-auto p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
            <h4 className='text-center text-3xl font-bold m-0 p-0'>Register New User</h4>
            <div className="flex items-center justify-between gap-12 w-full">
                <div className="flex-1">
                <PictureInput picture={userpicpath} setPicture={setUserpicpath} hoverLabel={"User Pic"}/>
                </div>
            <div className='w-full'>
            <FormInput required type={'text'} label={"username"} name={"username"} value={username}  onChange={(e)=>setUsername(e.target.value)}/>
            <FormInput required type={'Password'} minLength={8} label={"password"} name={"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <Sorting value={role} onChange={(e)=>setRole(e.target.value)} options={roleOptions} label={"Select Role"} required/>
            </div>
            </div>
            <SubmitBtn disabled={loading || isUserError} text={"Register"} onClick={handleSubmit}/>
        </form>
    </section>  
)
}

export default RegistrationForm