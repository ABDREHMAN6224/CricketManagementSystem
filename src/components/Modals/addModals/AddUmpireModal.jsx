import React, { useEffect, useState } from 'react'
import Modal from '../Modal'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../../features/countryReducer';
import PictureInput from '../../inputs/PictureInput';
import TextInput from '../../inputs/TextInput';
import SelectInput from '../../inputs/SelectInput';
import { createUmpire } from '../../../features/umpiresReducer';
import { toast } from 'react-toastify';

const AddUmpireModal = ({open,onClose}) => {
    const [umpirename,setUmpirename]=useState('');
    const [nomatches,setNomatches]=useState(0);
    const [picture,setPicture]=useState('');
    const [country,setCountry]=useState('');
    const [countryid,setCountryid]=useState('');
    const {allCountries}=useSelector(state=>state.country);
    const {isError}=useSelector(state=>state.umpire);
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllCountries());
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
            setLoad(false);
            onClose();
        },2000)
    }
    const handleCountryChange=(e)=>{
        setCountry(e.target.value);
        let country=allCountries.find(country=>country.country==e.target.value);
        setCountryid(country.countryid);
    }
  return (
    <Modal open={open} onClose={onClose} width="600px" height="auto">
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Register Umpire</h3>
                <div className="flex flex-col items-center justify-center gap-8">
                  <PictureInput hoverLabel='Update Picture' picture={picture} setPicture={setPicture}/>
                  <div className="grid grid-cols-2 gap-x-16">
                    <TextInput label="Umpire Name" placeholder='Enter Umpire Name' value={umpirename} onChange={(e)=>setUmpirename(e.target.value)} required/>
                    <SelectInput label="Country" options={allCountries.map(country=>country.country)} value={country} onChange={handleCountryChange} required/>
                    <TextInput label="No of Matches" placeholder='Enter No of Matches' value={nomatches} onChange={(e)=>setNomatches(e.target.value)} type="number"/>
                  </div>
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                </div>
              </div>
        </div>

    </Modal>
  )
}

export default AddUmpireModal