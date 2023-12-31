import React, { useEffect, useState } from 'react'
import SelectInput from '../../components/inputs/SelectInput';
import TextInput from '../../components/inputs/TextInput';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { addPlayer } from '../../features/playerReducer';

const AddBowler = ({totalMatches,player,handleCancel,setPlayer,error,setCompleted}) => {
    const [nowickets,setNoWickets]=useState(0);
    const [bowlhand,setBowlHand]=useState('Right');
    const [bowltype,setBowlType]=useState('Leg-Spin');
    const [oversbowled,setOversBowled]=useState(0);
    const [maidenovers,setMaidens]=useState(0);
    const [runsconceeded,setRunsConceeded]=useState(0);
    const [noballs,setNoBalls]=useState(0);
    const [totalInnings,setTotalInnings]=useState(0);
    const [dotballs,setDotBalls]=useState(0);
    const [load,setLoad]=useState(false);
    const dispatch=useDispatch();
    const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='playermanager'&&user.userrole.toLowerCase()=="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }
        setCompleted(false);
    },[])
    const handleSave=()=>{
        const obj={
            noOfWickets:nowickets,
            bowlhand:bowlhand,
            bowltype:bowltype,
            oversbowled:oversbowled,
            maidenovers:maidenovers,
            runsconceded:runsconceeded,
            totalInnings:totalInnings,
            dotBalls:dotballs,
            noballs:noballs
        }
        if(bowlhand=='' || bowltype==''){
            toast.error('Please fill all the fields');
            return;
        }
        if(nowickets<0 || oversbowled<0 || maidenovers<0 || runsconceeded<0 || noballs<0 || dotballs<0 || totalInnings<0){
            toast.error('Please enter positive values');
            return;
        }
        if(nowickets/10>totalMatches){
            toast.error('No of wickets cannot be greater than 10% of total matches played');
            return;
        }
        if(oversbowled/totalMatches>10){
            toast.error('Overs bowled cannot be greater than 10 for each match');
            return;
        }
        if(maidenovers/totalMatches>10){
            toast.error('Maiden overs cannot be greater than 10 for each match');
            return;
        }
        if(runsconceeded/totalMatches>200){
            toast.error('Runs conceeded cannot be greater than 200 for each match');
            return;
        }
        if(noballs/totalMatches>10){
            toast.error('No balls cannot be greater than 10 for each match');
            return;
        }
        if(dotballs/totalMatches>50){
            toast.error('Dot balls cannot be greater than 50 for each match');
            return;
        }
        if(totalInnings>totalMatches){
            toast.error('Total innings cannot be greater than total matches');
            return;
        }
        //check runs conceeded against maiden overs and overs bowled
        if(runsconceeded/6>oversbowled){
            toast.error('Runs conceeded cannot be greater than overs bowled');
            return;
        }
        if(maidenovers>oversbowled){
            toast.error('Maiden overs cannot be greater than overs bowled');
            return;
        }
        if(nowickets&& oversbowled==0){
            toast.error('Overs bowled cannot be zero if wickets are greater than zero');
            return;
        }
        if(nowickets&& totalInnings==0){
            toast.error('Total innings cannot be zero if wickets are greater than zero');
            return;
        }
        setPlayer({...player,...obj});
        dispatch(addPlayer({...player,...obj}));
        if(error){
            toast.error('Something went wrong');
            return;
        }
        toast.success('Registered successfully');
        setTimeout(()=>{
            setLoad(false);
            setCompleted(true);
        },2000)



    }
  return (
  <div className='py-12 px-6'>
              <div className="flex flex-col items-center justify-center gap-2">
                  <h3 className='text-3xl font-bold pb-3'>Add Bowling Information</h3>
                <div className="flex items-center justify-center w-full gap-8">
                  <div className={totalMatches?'grid grid-cols-4 gap-5':'grid grid-cols-3 gap-5'}>
                    <SelectInput label="Bowling Hand" placeholder='Enter Bowling Hand' value={bowlhand} onChange={(e)=>setBowlHand(e.target.value)} options={['Right','Left']} required/>
                    <SelectInput label="Bowling Type" placeholder='Enter Bowling Type' value={bowltype} onChange={(e)=>setBowlType(e.target.value)} options={['Leg-Spin','Off-Spin','Medium-Fast','Fast']} required/>
                    {totalMatches?
                    <TextInput label="No of Wickets" placeholder='Enter No of Wickets' value={nowickets} onChange={(e)=>setNoWickets(Number(e.target.value))} type='number'/>:''}
                    
                    {totalMatches?
                    <TextInput label="Overs Bowled" placeholder='Enter Overs Bowled' value={oversbowled} onChange={(e)=>setOversBowled(Number(e.target.value))} type='number'/>:''}
                    
                    {totalMatches?
                    <TextInput label="Maiden Overs" placeholder='Enter Maiden Overs' value={maidenovers} onChange={(e)=>setMaidens(Number(e.target.value))} type='number'/>:''}                    
                    {totalMatches?
                    <TextInput label="Runs Conceeded" placeholder='Enter Runs Conceeded' value={runsconceeded} onChange={(e)=>setRunsConceeded(Number(e.target.value))} type='number'/>:''}
                    
                    {totalMatches?
                    <TextInput label="No Balls" placeholder='Enter No Balls' value={noballs} onChange={(e)=>setNoBalls(Number(e.target.value))} type='number'/>:''}
                    {totalMatches?
                    <TextInput label="Dot Balls" placeholder='Enter Dot Balls' value={dotballs} onChange={(e)=>setDotBalls(Number(e.target.value))} type='number'/>:''}
                    {totalMatches?
                    <TextInput label="Total Innings" placeholder='Enter Total Innings' value={totalInnings} onChange={(e)=>setTotalInnings(Number(e.target.value))} type='number'/>:''}
                    <TextInput label={"Total Matches"} placeholder='Enter Total Matches' value={totalMatches} type='number' disabled/>

                    {totalMatches?
                    <div></div>:''
                    }
                    <button className="btn btn-primary col-span-2" onClick={handleSave} disabled={load}>{load?"Registering ...":"Register"}</button>
                
                     <button className='btn btn-warning' onClick={handleCancel} disabled={load}>
                        Cancel
                    </button>

                </div>
                </div>
              </div>
        </div>
         )
}

export default AddBowler