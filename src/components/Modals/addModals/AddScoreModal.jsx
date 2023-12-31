import React, { useState } from 'react'
import Modal from '../Modal'
import TextInput from '../../inputs/TextInput';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

const AddScoreModal = ({open,onClose,player,match_id,type,setDone,setTeamPlayersInfo}) => {
    const [runs,setRuns]=useState(player?.runs||0);
    const [sixes,setSixes]=useState(player?.sixes||0);
    const [fours,setFours]=useState(player?.fours||0);
    const [balls,setBalls]=useState(player?.balls||0);
    const [wickets,setWickets]=useState(player?.wickets||0);
    const [overs,setOvers]=useState(player?.overs||0);
    const [maidenOvers,setMaidenOvers]=useState(player?.maidenovers||0);
    const [runsGiven,setRunsGiven]=useState(player?.runsgiven||0);
    const [extras,setExtras]=useState(player?.extras||0);
    const [catches,setCatches]=useState(player?.catches||0);
    const [stumps,setStumps]=useState(player?.stumps||0);
    const [isKeeper,setIsKeeper]=useState(player?.isKeeper||false);
    const [noballs,setNoballs]=useState(player?.noballs||0);    
    const [load,setLoad]=useState(false);
    const [addBattingInfo,setAddBattingInfo]=useState(player.playertype=='Batsman'||player.playertype=="Allrounder"?true:false);
    const [addBowlingInfo,setAddBowlingInfo]=useState(player.playertype=='Bowler'||player.playertype=="Allrounder"?true:false);
    
    const [addKeeperInfo,setAddKeeperInfo]=useState(player.isKeeper?true:false);
    const handleSave=()=>{
        if(addBattingInfo){
            // if(runs==0 && sixes==0 && fours==0 && balls==0){
            //     toast.error('Please fill batting info');
            //     return;
            // }
            if(runs>0 && balls==0){
                toast.error('Please fill balls faced');
                return;
            }
            //check if boudary score is less than total runs
            if(fours*4+sixes*6>runs){
                toast.error('Boundary score is greater than total runs');
                return;
            }
            //check if atmost 6 runs are scored in a ball
            if(runs/balls>6){
                toast.error('Atmost 6 runs can be scored on a ball');
                return;
            }
            if(type=='T20' && balls>100){
                toast.error('Balls faced cannot be greater than 120 in T20');
                return;
            }
            if(type=='ODI' && balls>260){
                toast.error('Balls faced cannot be greater than 300 in ODI');
                return;
            }
            if(type=='TEST' && balls>600){
                toast.error('Balls faced cannot be greater than 600 in TEST');
                return;
            }
        }
        if(addBowlingInfo){
            // if(wickets==0 && overs==0 && maidenOvers==0 && runsGiven==0 && extras==0){
            //     toast.error('Please fill bowling info');
            //     return;
            // }
            if(wickets>0 && overs==0){
                toast.error('Please fill overs');
                return;
            }
            
            //check if maiden overs are less than overs
            if(maidenOvers>overs){
                toast.error('Maiden overs are greater than overs');
                return;
            }
            //check if runs given are less than 36 in over
            if(runsGiven/overs>36){
                toast.error('Runs given are greater than 36 in an over');
                return;
            } 
            //check if extras are less than runs given
            if(extras>runsGiven){
                toast.error('Extras are greater than runs given');
                return;
            }      
            //check wickets are at most 10
            if(wickets>10){
                toast.error('Wickets cannot be greater than 10');
                return;
            }
            if(noballs>3){
                toast.error('No balls cannot be greater than 3');
                return;
            }
            if(type=='T20' && overs>4){
                toast.error('Overs cannot be greater than 4 in T20');
                return;
            }
            if(type=='ODI' && overs>10){
                toast.error('Overs cannot be greater than 10 in ODI');
                return;
            }
            if(type=='TEST' && overs>100){
                toast.error('Overs cannot be greater than 100 in TEST');
                return;
            }
            if(noballs+extras>runsGiven){
                toast.error('No balls and extras cannot be greater than runs given');
                return;
            }

        }
        if(isKeeper){
            // if(catches==0 && stumps==0){
            //     toast.error('Please fill fielding info');
            //     return;
            // }
            if(Number(catches)+Number(stumps)>10){
                toast.error('Catches and Stumps cannot be greater than 10');
                return;
            }
        }
        localStorage.removeItem(`player_${player.playerid}`);
        let p={
            ...player,
            player_id:player.playerid,
            runs,
            sixes,
            fours,
            balls,
            match_id,
            type,
            teamid:player.teamid,
            catches,
            stumps,
            isKeeper,
            noballs,
            wickets,
            runs_given:runsGiven,
            overs,
            maiden_overs:maidenOvers,
            extras
        }
        localStorage.setItem(`player_${player.playerid}`,JSON.stringify(p));
        //set players info first by removing the player and then adding it again
        setTeamPlayersInfo(prev=>prev.filter((p)=>p.playerid!=player.playerid));
        setTeamPlayersInfo(prev=>[...prev,p])
        setDone(true);
        onClose();
    };
  return (
    <Modal open={open} onClose={onClose} width="800px" height='auto' autoClose={false}>
          <div className='py-12 px-6 opacity-100'>
              <div className={addBattingInfo||addBowlingInfo||addKeeperInfo?"grid player-grid justify-between gap-12":"grid justify-between gap-12"}>
                <div className='flex items-start flex-col justify-start'>
                  <div className='my-2 mt-2 w-40 h-40 rounded-full border-gray-500 '>
                    <img src={player?.playerpicpath} className='w-full h-full rounded-full border-3 shadow-lg  object-cover' alt="" />
                    <h3 className='text-3xl font-bold mt-2'>{player?.playername}</h3>
                </div>
                <div className='mt-12 pt-6'>
                    <div class="flex items-center mb-4">
                        <input id="default-checkbox"  className=' checkbox-info checkbox-md' type="checkbox" checked={addBattingInfo} onChange={(e)=>setAddBattingInfo(e.target.checked)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="default-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Batting Info</label>
                    </div>
                    {isKeeper?
                    <div class="flex items-center">
                        <input id="checked-checkbox"  className=' checkbox-info checkbox-md' type="checkbox" checked={addKeeperInfo} onChange={(e)=>setAddKeeperInfo(e.target.checked)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Keeper Info</label>
                    </div>
                    :
                    <div class="flex items-center">
                        <input id="checked-checkbox"  className=' checkbox-info checkbox-md' type="checkbox" checked={addBowlingInfo} onChange={(e)=>setAddBowlingInfo(e.target.checked)} class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label for="checked-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Bowling Info</label>
                    </div>
                    }
                </div>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="grid grid-cols-3 gap-x-10 gap-y-1">
                    {
                        addBattingInfo && 
                    <TextInput label='Runs' value={runs} onChange={(e)=>setRuns(Number(e.target.value))} type='number' />
                    }
                    {
                        addBattingInfo &&
                    <TextInput label='Sixes' value={sixes} onChange={(e)=>setSixes(Number(e.target.value))} type='number' />
                    }
                    {
                        addBattingInfo &&
                    <TextInput label='Fours' value={fours} onChange={(e)=>setFours(Number(e.target.value))} type='number' />
                    }
                    {
                        addBattingInfo &&
                        <TextInput label='Balls Faced' value={balls} onChange={(e)=>setBalls(Number(e.target.value))} type='number' />
                    }
                    {
                        addBowlingInfo && !isKeeper &&
                    <TextInput label='Wickets' value={wickets} onChange={(e)=>setWickets(Number(e.target.value))} type='number' />
                    }
                    {
                        addBowlingInfo && !isKeeper &&
                    <TextInput label='Overs' value={overs} onChange={(e)=>setOvers(Number(e.target.value))} type='number' />
                    }
                    {
                        addBowlingInfo && !isKeeper &&
                    <TextInput label='Maiden Overs' value={maidenOvers} onChange={(e)=>setMaidenOvers(Number(e.target.value))} type='number' />
                    }
                    {
                        addBowlingInfo && !isKeeper &&
                    <TextInput label='Runs Given' value={runsGiven} onChange={(e)=>setRunsGiven(Number(e.target.value))} type='number' />
                    }
                    {
                        addBowlingInfo && !isKeeper &&
                    <TextInput label='No Balls' value={noballs} onChange={(e)=>setNoballs(Number(e.target.value))} type='number' />
                    }
                    {addBowlingInfo && !isKeeper && <TextInput label='Extras' value={extras} onChange={(e)=>setExtras(Number(e.target.value))} type='number' />}
                    {addKeeperInfo && isKeeper && <TextInput label='Catches' value={catches} onChange={(e)=>setCatches(Number(e.target.value))} type='number' />}
                    {addKeeperInfo && isKeeper && <TextInput label='Stumps' value={stumps} onChange={(e)=>setStumps(Number(e.target.value))} type='number' />}
                  </div>
                  {addBattingInfo || addBowlingInfo|| addKeeperInfo?
                    <button className="btn btn-primary btn-block" onClick={handleSave} disabled={load}>{load?"Please Wait ...":"Save"}</button>:''
                }
                </div>
              </div>
        </div>
    </Modal>
  )
}

export default AddScoreModal