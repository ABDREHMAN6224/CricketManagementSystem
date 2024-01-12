import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import styled from 'styled-components';
import TextInput from '../../components/inputs/TextInput';
import SelectInput from '../../components/inputs/SelectInput';
import PictureInput from '../../components/inputs/PictureInput';
import { getAllCountries } from '../../features/countryReducer';
import { useDispatch, useSelector } from 'react-redux';
import umpireImage from "../../images/umpire.jpeg"
import HeroImage from '../../components/HeroImage';
import { useNavigate } from 'react-router-dom';
import { createUmpire } from '../../features/umpiresReducer';
const AddUmpire = () => {
  const [umpirename,setUmpirename]=useState('');
    const [nomatches,setNomatches]=useState(0);
    const [picture,setPicture]=useState('');
    const [country,setCountry]=useState('');
    const [countryid,setCountryid]=useState('');
    const {allCountries}=useSelector(state=>state.country);
    const {isError}=useSelector(state=>state.umpire);
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='tournamentmanager'&&user.userrole.toLowerCase()!="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }        dispatch(getAllCountries());
    },[])
    useEffect(()=>{
        if(allCountries.length>0){
            setCountry(allCountries[0].country);
            setCountryid(allCountries[0].countryid);
        }
    },[allCountries])
    const handleSave=()=>{
        if(umpirename.length==0){
            toast.error("Please enter umpire name");
            return;
        }
        if(umpirename.length<3){
            toast.error("Umpire name must be atleast 3 characters long");
            return;
        }
        if(picture==""){
            toast.error("Please enter umpire picture");
            return;
        }
        if(country.length==0){
            toast.error("Please select country");
            return;
        }
        if(nomatches<0){
            toast.error("No of matches cannot be negative");
            return;
        }
        setLoad(true);
        dispatch(createUmpire({umpirename,noofmatches:nomatches, countryid,umpirepicpath:picture}));
        if(isError){
            toast.error("Something went wrong");
            setLoad(false);
            return;
        }
        toast.success("Registered successfully");
        setTimeout(()=>{
          setCountry(allCountries[0].country);
          setCountryid(allCountries[0].countryid);
          setUmpirename('');
          setNomatches(0);
          setPicture('');
          
            setLoad(false);
        },2000)
    }
    const handleCancel=()=>{
        setLoad(true);
        toast.info("Redirecting to umpires page")
        setTimeout(()=>{
            setLoad(false);
            navigate("/umpires")
        },2000)
    }
    const handleCountryChange=(e)=>{
        setCountry(e.target.value);
        let country=allCountries.find(country=>country.country==e.target.value);
        setCountryid(country.countryid);
    }
  return (
    <Wrapper>
      <HeroImage src={umpireImage}/>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Umpire</h3>
                <div className="flex  items-center justify-center gap-10">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-8 gap-y-1">
                    <TextInput label="Umpire Name" placeholder='Enter Umpire Name' value={umpirename} onChange={(e)=>setUmpirename(e.target.value)} required/>
                    <TextInput label="No of Matches" placeholder='Enter No of Matches' value={nomatches} onChange={(e)=>setNomatches(e.target.value)} type="number"/>
                    <SelectInput label="Country" options={allCountries.map(country=>country.country)} value={country} onChange={handleCountryChange} required/>
                    <div></div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Please Wait...":"Register"}</button>
                     <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>
                  </div>
                </div>
              </div>
        </div>
    </Wrapper>

  )
}

export default AddUmpire
const Wrapper=styled.div`
display: grid;
grid-template-rows: 50vh 1fr;
.img{
    object-position:bottom -500px right 0px ;
}
`