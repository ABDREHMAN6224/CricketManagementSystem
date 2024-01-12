import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import PictureInput from '../../components/inputs/PictureInput';
import TextInput from '../../components/inputs/TextInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import coachimage from "../../images/coach.jpeg"
import { toast } from 'react-toastify';
import { createCoach, getAllCoaches } from '../../features/coachesReducer';
import HeroImage from '../../components/HeroImage';

const AddCoach = () => {
  const [name,setName]=useState('');
    const [picture,setPicture]=useState('');
    const navigate=useNavigate();
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const {allCoaches}=useSelector(state=>state.coach);
     const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='teammanager'&&user.userrole.toLowerCase()!="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }
        dispatch(getAllCoaches());
    },[])
    const handleSave=()=>{
        if(name.length==0){
            toast.error("Please enter coach name");
            return;
        }
        if(name.length<3){
            toast.error("Coach name must be atleast 3 characters long");
            return;
        }
        if(picture==""){
            toast.error("Please enter coach picture");
            return;
        }
        //check if coach name already exists
        let coachExists=false;
        allCoaches.forEach((coach)=>{
            if(coach.coachname.toLowerCase()==name.toLowerCase()){
                coachExists=true;
            }
        })
        if(coachExists){
            toast.error("Coach already exists");
            return;
        }
        setLoad(true);
        let n=name.charAt(0).toUpperCase()+name.slice(1);
        dispatch(createCoach({name:n,picture}));
        toast.success("Registered successfully");
        setTimeout(()=>{
            setName('');
            setPicture('');
            setLoad(false);
        },2000)
    }
    const handleCancel=()=>{
        setLoad(true);
        toast.info("Redirecting to coaches page")
        setTimeout(()=>{
            setLoad(false);
            navigate('/coaches');
        },2000)
    }
  return (
    <Wrapper>
        {/* //place coachimage here covering 30% of the screen */}
           <HeroImage src={coachimage}/>
          <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Coach</h3>
                <div className="flex items-center justify-center w-full gap-8">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className='flex items-start gap-5 flex-col'>
                    <TextInput label="Name" placeholder='Enter Name' value={name} onChange={(e)=>setName(e.target.value)} required/>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Please Wait ...":"Register"}</button>
                     <button className='btn btn-warning btn-block' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>
                </div>
                </div>
              </div>
        </div>
    </Wrapper>
     )
}

export default AddCoach
const Wrapper=styled.div`
display: grid;
grid-template-rows: 50vh 1fr;
.img{
    object-position:bottom -800px right 0px ;
}
    
`