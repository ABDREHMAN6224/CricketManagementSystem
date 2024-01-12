import React, { useEffect, useState } from 'react'
import TextInput from '../../components/inputs/TextInput';
import SelectInput from '../../components/inputs/SelectInput';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../../features/playerReducer';
import { useNavigate } from 'react-router-dom';

const AddBatsman = ({totalMatches,setCompleted,player,handleCancel,label="Add Batting Information",type='b',setDone,setPlayer,error}) => {
    const [sixes,setSixes]=useState(0);
    const [fours,setFours]=useState(0);
    const [runs,setRuns]=useState(0);
    const [batHand,setBatHand]=useState('Right');
    const [ballsFaced,setBallsFaced]=useState(0);
    const [totalInnings,setTotalInnings]=useState(0);
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {user}=useSelector(state=>state.auth);
    useEffect(()=>{ 
        if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='playermanager'&&user.userrole.toLowerCase()!="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }
        setCompleted(false);
    },[])
    const handleSave=()=>{
        if(sixes<0 || fours<0 || runs<0 || ballsFaced<0 || totalInnings<0){
            toast.error('Negative values are not allowed');
            return;
        }
        if(sixes*6+fours*4>runs){
            toast.error('Total runs should be greater than or equal to the runs scored by boundaries');
            return;
        }
        if(totalInnings>totalMatches){
            toast.error('Total innings cannot be greater than total matches');
            return;
        }
        if(runs/(ballsFaced?ballsFaced:1)>6){
            toast.error('Strike rate cannot be greater than 600');
            return;
        }
        if(runs>20000){
            toast.error('Runs cannot be greater than 20000');
            return;
        }
        if(ballsFaced>20000){
            toast.error('Balls faced cannot be greater than 20000');
            return;
        }
        if(sixes>1000){
            toast.error('Sixes cannot be greater than 1000');
            return;
        }
        if(fours>1000){
            toast.error('Fours cannot be greater than 1000');
            return;
        }
        if(totalInnings>1000){
            toast.error('Total innings cannot be greater than 1000');
            return;
        }
        if(totalMatches>1000){
            toast.error('Total matches cannot be greater than 1000');
            return;
        }
        if(runs && totalInnings!=0){
            if(runs/totalInnings>300){
                toast.error('Batting average cannot be greater than 300');
                return;
            }
        }
        if(runs && totalInnings==0){
            toast.error('Total innings cannot be zero if runs are greater than zero');
            return;
        }

        setPlayer({...player, sixes, fours, totalRuns:runs, bathand:batHand, ballsfaced:ballsFaced, totalInnings:totalInnings });
        if(type=='b'){
            dispatch(addPlayer({...player, sixes, fours, totalRuns:runs, bathand:batHand, ballsfaced:ballsFaced, totalInnings:totalInnings }))
        }
        if(error){
            toast.error('Something went wrong');
            return;
        }
        toast.success('Batsman information added successfully');
        setLoad(true);
        setTimeout(() => {
            setLoad(false);
            if(type=='b'){
                setCompleted(true)
            }else{
                setDone(true);
            }
        }, 2000);
    }
  return (
      <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>{label}</h3>
                <div className="flex items-center justify-center w-full gap-8">
                  <div className='grid grid-cols-3 gap-5'>
                    <SelectInput label="Batting Hand" placeholder='Enter Batting Hand' value={batHand} onChange={(e)=>setBatHand(e.target.value)} options={['Right','Left']} required/>
                    {totalMatches?
                    <TextInput label="Runs" placeholder='Enter Runs' value={runs} onChange={(e)=>setRuns(Number(e.target.value))} type='number'/>:''
                    }
                    {totalMatches?
                    <TextInput label="Balls Faced" placeholder='Enter Balls Faced' value={ballsFaced} onChange={(e)=>setBallsFaced(Number(e.target.value))} type='number'/>:''
                    }
                    {totalMatches?
                    <TextInput label="Fours" placeholder='Enter Fours' value={fours} onChange={(e)=>setFours(Number(e.target.value))} type='number'/>:''
                    }
                    {totalMatches?
                    <TextInput label="Sixes" placeholder='Enter Sixes' value={sixes} onChange={(e)=>setSixes(Number(e.target.value))} type='number'/>:''
                    }
                    {totalMatches?
                    <TextInput label="Total Innings" placeholder='Enter Total Innings' value={totalInnings} onChange={(e)=>setTotalInnings(Number(e.target.value))} type='number'/>:''
                    }
                    <TextInput label={"Total Matches"} placeholder='Enter Total Matches' value={totalMatches} type='number' disabled/>
                    {totalMatches?
                    <div></div>:''
                    }
                    {type=='b'?
                    <button className="btn btn-primary col-span-2" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>:
                    <button className="btn btn-primary col-span-2" onClick={handleSave} disabled={load}>{load?"Updating ...":"Next"}</button>
                }
                     <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>

                </div>
                </div>
              </div>
        </div>
  )
}

export default AddBatsman