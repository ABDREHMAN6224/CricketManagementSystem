import React, { useEffect, useState } from 'react'
import FormInput from '../components/FormInput'
import SubmitBtn from '../components/SubmitBtn'
import { Form, useNavigate } from 'react-router-dom'
import Loader from '../components/Modals/Loader'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser } from '../features/authReducer'
import { toast } from 'react-toastify'

const LoginPage = () => {
  const [username,setUsername]=useState("");
  const [password,setPassword]=useState("");
  const {user,isUserLoading,isUserError,errorMessage}=useSelector(state=>state.auth);
  const [loading,setLoading]=useState(false);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    e.preventDefault();
    dispatch(loginUser({username,password}));
    if(isUserError){
      toast.error(errorMessage);
    }
  }
  useEffect(() => {
    if(user){
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        navigate("/")
      }, 1000);
    }
  }, [user])
  return (
    <section className='h-screen grid place-items-center'>
      {(isUserLoading||loading) && <Loader/>}
        <form method='post'  className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4">
            <h4 className='text-center text-3xl font-bold'>Login</h4>
            <FormInput required type={'text'} label={"username"} name={"username"} value={username}  onChange={(e)=>setUsername(e.target.value)}/>
            <FormInput required type={'Password'} label={"password"} name={"password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <SubmitBtn text={"Login"} onClick={handleSubmit}/>
        </form>
    </section>
  )
}

export default LoginPage