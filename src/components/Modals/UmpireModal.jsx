import React, { useEffect, useState } from 'react'
import Modal from './Modal'
import { useDispatch, useSelector } from 'react-redux';
import { getAllCountries } from '../../features/countryReducer';
import PictureInput from '../inputs/PictureInput';
import SelectInput from '../inputs/SelectInput';
import TextInput from '../inputs/TextInput';
import { toast } from 'react-toastify';
import { updateCurrentUmpire, updateUmpire } from '../../features/umpiresReducer';

const UmpireModal = ({open,onClose,loading,umpire,viewOnly=false}) => {
  if(loading){
    return(
    <Modal open={open} onClose={onClose} >
        <div className="loading"></div>
    </Modal>

    )
  }
  const {umpireid,umpirename,country,umpirepicpath,countryid}=umpire;
  const [picture,setPicture]=useState(umpirepicpath);
  const [name,setName]=useState(umpirename);
  const [umpireCountry,setCountry]=useState(country);
  const [load,setLoad]=useState(false);
  const [allcountries,setAllCountries]=useState([]);
  const {allCountries}=useSelector(state=>state.country);
  const dispatch=useDispatch();
  useEffect(()=>{
    dispatch(getAllCountries());
  },[])
  useEffect(()=>{
    if(allCountries.length>0){
      //bring the current country to the top
      let currentCountry=allCountries.find(country=>country.countryid===countryid);
      let otherCountries=allCountries.filter(country=>country.countryid!==countryid);
      otherCountries.unshift(currentCountry);
      setAllCountries(otherCountries);
    }
  },[allCountries])
  const handleClose=()=>{
    onClose();
  }
  const handleSave=()=>{
    if(name.trim()===''){
      toast.error('Please enter umpire name');
      return;
    }
    if(name.trim().length<3){
      toast.error('Umpire name should be atleast 3 characters long');
      return;
    }
    if(name.toLowerCase().trim().includes('umpire')){
      toast.error('Umpire name cannot contain umpire');
      return;
    }
    if(name.toLowerCase().trim()===umpirename && umpireCountry===country){
      toast.info('No changes made');
      return;
    }
    setLoad(true);
                // const { umpireid, umpirename, countryid,country,umpirepicpath } = action.payload;
    dispatch(updateCurrentUmpire({umpireid,umpirename:name,countryid:allcountries.find(c=>c.country===umpireCountry).countryid,country:umpireCountry,umpirepicpath:picture}));
    dispatch(updateUmpire({umpireid,picpath:picture,umpirename:name,countryid:allcountries.find(c=>c.country===umpireCountry).countryid}));
    toast.success('Umpire updated successfully');
    setTimeout(() => {
        setLoad(false);
        handleClose();
    }
    , 2000);

  }
  return (     
  <Modal open={open} onClose={handleClose} width={"600px"} height={"auto"}>
        <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>{viewOnly?"View Umpire":"Edit umpire"}</h3>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="flex items-center flex-col justify-center gap-2">
                    <PictureInput disabled={viewOnly} hoverLabel="Update Picture" picture={picture} setPicture={setPicture} />
                    <h3 className="text-2xl font-bold">{name}</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-x-16 gap-y-1">
                    <TextInput disabled={viewOnly} label="Umpire Name" value={name} onChange={e=>setName(e.target.value)} />
                    <SelectInput disabled={viewOnly} label="Country" value={umpireCountry} onChange={e=>setCountry(e.target.value)} options={allcountries.map(c=>c.country)} />
                    {viewOnly &&
                    <TextInput disabled={viewOnly} label="Matches" value={umpire?.nomatches}/>
                    }
                  </div>
                  {!viewOnly &&
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load||viewOnly}>{load?"Saving ...":"Save"}</button>
                  }
                </div>
              </div>
        </div>
    </Modal> 
  )
}

export default UmpireModal