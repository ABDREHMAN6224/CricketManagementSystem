import React, { useEffect, useState } from 'react'
import RankingCard from '../../components/cards/RankingCard'
import { useDispatch, useSelector } from 'react-redux';
import { getTopTeams } from '../../features/authReducer';
import { getAllTeams } from '../../features/teamReducer';
import AreaChartComp from '../../components/charts/AreaChart';
import Title from '../../components/Title';

const TeamDashboard = () => {
         const {isUserError,topTeams,user}=useSelector(state=>state.auth);
         const {allTeams}=useSelector(state=>state.team);
         const [matchesVsWins,setMatchesVsWins]=useState([]);
         const dispatch=useDispatch();
           useEffect(()=>{
            dispatch(getAllTeams());
        dispatch(getTopTeams());
    },[])
    useEffect(() => {
      if(allTeams.length>0){
        let data=[];
        allTeams.forEach((b)=>{
          data.push({matches:b.totalwins+b.draws+b.totallosses,wins:b.totalwins,name:b.teamname})
        })
        setMatchesVsWins(data);
      }
    }, [allTeams])
  return (
    <div className='flex flex-col gap-12'>
        <div className="records flex gap-8 justify-center p-5 flex-wrap">
            <RankingCard players={topTeams.map(p=>({...p,rank:p?.testrank}))} type={"Test"} teams/>
            <RankingCard players={topTeams.map(p=>({...p,rank:p?.odirank}))} type={"ODI"} teams/>
            <RankingCard players={topTeams.map(p=>({...p,rank:p?.t20irank}))} type={"T20"} teams/>
    </div>
          <div className='w-full flex gap-0 items-center justify-center py-1'>
            <AreaChartComp data={matchesVsWins?.sort((a,b)=>b.wins-a.wins).slice(0,15)} h={false} w={1350} x={"matches"} xdata={"name"} y={"wins"} name={"Matches vs Wins"} m={true} />
          </div>


    </div>
)
}

export default TeamDashboard