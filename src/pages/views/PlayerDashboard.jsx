import React, { useEffect, useState } from 'react'
import RankingCard from '../../components/cards/RankingCard'
import { useDispatch, useSelector } from 'react-redux';
import { getTopPlayers } from '../../features/authReducer';
import ScatterChart from '../../components/charts/ScatterChart';
import { getAllBatsman } from '../../features/batsmanReducer';
import { getAllBowlers } from '../../features/bowlerReducer';
import { getAllRounders } from '../../features/allRounderReducer';
import AreaChartComp from '../../components/charts/AreaChart';
import ScatterChartComp from '../../components/charts/ScatterChart';
import BarChartComp from '../../components/charts/BarChart';

const PlayerDashboard = () => {
     const {isUserError,topPlayers,user}=useSelector(state=>state.auth);
     const {allBatsman}=useSelector(state=>state.batsman);
      const {allBowlers}=useSelector(state=>state.bowler);
      const {allRounders}=useSelector(state=>state.allRounder);
      const [matchesVsRuns,setMatchesVsRuns]=useState([]);
      const [matchesVsWickets,setMatchesVsWickets]=useState([]);
      const [matchesVsEconomy,setMatchesVsEconomy]=useState([]);
      // const [batsman]
     const dispatch=useDispatch();
      useEffect(()=>{
        dispatch(getAllBatsman());
        dispatch(getAllBowlers());
        dispatch(getAllRounders());
        dispatch(getTopPlayers());
    },[])
    useEffect(() => {
      if(allBatsman.length>0 || allRounders.length>0){
        let data=[];
        allBatsman.forEach((b)=>{
          data.push({innings:b.totalinningsbatted,runs:b.noruns,name:b.playername})
        })
        allRounders.forEach((b)=>{
          data.push({innings:b.totalinningsbatted,runs:b.noruns,name:b.playername})
        })
        setMatchesVsRuns(data);
      }
      //set array like data for area chart bweteen nomatches and wickets
      if(allBowlers.length>0 || allRounders.length>0){
        let data1=[];
        let data=[];
        allBowlers.forEach((b)=>{
          data.push({innings:b.totalinningsbowled,wickets:b.nowickets,name:b.playername})
          data1.push({innings:b.totalinningsbowled,economy:((b.runsconceded/(b.oversbowled||1)*10)).toFixed(2),name:b.playername})
        })
        allRounders.forEach((b)=>{
          data.push({innings:b.totalinningsbowled,wickets:b.nowickets,name:b.playername})
          console.log(b.runsconceded,b.oversbowled);
          data1.push({innings:b.totalinningsbowled,economy:((b.runsconceded/(b.oversbowled||1)*10)).toFixed(2),name:b.playername})
        })
        setMatchesVsEconomy(data1);
        setMatchesVsWickets(data);
      }
      //max innings from data1

    }, [allBatsman,allBowlers,allRounders])
  return (
    <div className='flex flex-col gap-12'>

        <div className="records flex gap-8 justify-center p-5 flex-wrap">
                <RankingCard players={topPlayers.map(p=>({...p,rank:p?.battingrank}))} type={"batsman"}/>
                <RankingCard players={topPlayers.map(p=>({...p,rank:p?.bowlingrank}))} type={"bowler"}/>
                <RankingCard players={topPlayers.map(p=>({...p,rank:p?.allrounderrank}))} type={"allrounder"}/>  
        </div>
      <div className='w-full flex gap-0 items-center py-1'>

        <AreaChartComp data={matchesVsRuns.sort((a,b)=>b.innings-a.innings)}/>
        <ScatterChartComp data={matchesVsWickets.sort((a,b)=>b.innings-a.innings).slice(0,35)}/>
        <BarChartComp data={matchesVsEconomy.sort((a,b)=>b.innings-a.innings).slice(0,35)}/>
      </div>
    </div>
)
}

export default PlayerDashboard