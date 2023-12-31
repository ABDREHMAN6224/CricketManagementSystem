import React from 'react'
import styled from 'styled-components';

const RankingCard = ({players=[],type,teams=false}) => {
    const highestScorer=()=>{
        let max=1000;
        let player;
        if(type==='batsman'){
            players.forEach((p)=>{
                if(p.battingrank<max){
                    max=p.battingrank;
                    player=p;
                }
            })
        }
        if(type==='bowler'){
            players.forEach((p)=>{
                if(p.bowlingrank<max){
                    max=p.bowlingrank;
                    player=p;
                }
            })
        }
        if(type==='allrounder'){
            players.forEach((p)=>{
                if(p.allrounderrank<max){
                    max=p.allrounderrank;
                    player=p;
                }
            })
        }
        if(type=="ODI"){
            players.forEach((p)=>{
                if(p.odirank<max){
                    max=p.odirank;
                    player=p;
                }
            })
        }
        if(type=="T20"){
            players.forEach((p)=>{
                if(p.t20irank<max){
                    max=p.t20irank;
                    player=p;
                }
            })
        }
        if(type=="Test"){
            players.forEach((p)=>{
                if(p.testrank<max){
                    max=p.testrank;
                    player=p;
                }
            })
        }
        if(type=="Test"||type=="ODI"||type=="T20"){
            return player?.teamid;
        }else{
            return player?.playerid;
        }
        
    }
    if(teams){
        return (
            <Wrapper className="flex items-center flex-col gap-0 bg-gray-200 rounded-lg shadow-lg w-[400px] h-auto p-0">
        <h3 className='m-0 font-bold p-6 text-center rounded-lg rounded-b-none text-xl text-gray-100 w-full bg-blue-700'>{type} Rankings</h3>
                 {players.sort((a,b)=>a.rank-b.rank).slice(0,3).map((player,index)=>{
                    return <div key={index} className={index==0?"flex items-center justify-between shadow-lg gap-12  bg-blue-900 gap-y-0 special":"flex w-full p-[1rem]  items-center justify-between shadow-md gap-12 gap-y-4"}>
                            <h1 className="text-2xl font-semibold  rank">{player.rank}</h1>
                            <div className="flex items-center space-x-3 flex-1">
                            <div className="inline-flex w-12 h-12 mr-6">
                            <img className="w-12 h-12 object-cover rounded-fu" src={player?.teampicpath || ""} alt="" />
                            </div>
                            <h1 className="text-xl font-semibold">{player.teamname}</h1>
                            </div>
                            <div></div>
            </div>
        })}
            </Wrapper>
        )
    }
  return (
    <Wrapper className="flex items-center flex-col gap-0 bg-gray-200 rounded-lg shadow-lg w-[400px] h-auto p-0">
        <h3 className='m-0 font-bold p-6 text-center rounded-lg rounded-b-none text-xl text-gray-100 w-full bg-blue-700'>{type} Rankings</h3>
        {players.sort((a,b)=>a.rank-b.rank).slice(0,3).map((player,index)=>{
            return <div key={index} className={index==0?"flex items-center justify-between shadow-lg  gap-4 gap-y-0 bg-blue-900 special":"flex w-full p-[1rem] gap-y-0 shadow-md items-center justify-between gap-4"}>
                            <h1 className="text-3xl font-semibold  rank">{player?.rank}</h1>
                            <div className="flex items-center space-x-3 flex-1">
                            <div className="inline-flex w-12 h-12">
                            <img className="w-12 h-12 object-cover rounded-full  border-2" src={player?.playerpicpath || ""} alt="" />
                            </div>
                            <h1 className="text-xl font-semibold">{player.playername}</h1>
                            </div>
                            <h1 className="text-xl font-semibold text-green-700">{player.teamname.slice(0,3)}</h1>
                            
            </div>
        })}
    </Wrapper>
  )
}

export default RankingCard
const Wrapper=styled.div`
h1{
    margin: 0;
    padding: 0;
    color: #5b5656;
}
    .special{
        max-width: 400px;
        min-width: 400px;
        padding:1.5rem 1rem;
        h1{
            color: #fff !important;
        }
        img{
            width: 3rem !important;
            height: 3rem !important;
        }
        h1{
            font-size: 1.4rem !important;
        }
        .rank{
            font-size: 3rem !important;
        }
        .team{
            color: wheat !important;
        }
    }
`