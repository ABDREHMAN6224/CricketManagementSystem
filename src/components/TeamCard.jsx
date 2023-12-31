import React from 'react'
import { GiCaptainHatProfile,GiWinterGloves,GiCricketBat } from "react-icons/gi";
import { BiSolidCricketBall } from "react-icons/bi";
import { MdSportsCricket } from "react-icons/md";
import PictureInput from './inputs/PictureInput';
import { useNavigate } from 'react-router-dom';
const TeamCard = ({currentTeam,players,matches}) => {
    const navigate=useNavigate()
  return (
 <div className="card lg:card-side shadow-xl max-h-[43rem] image-full z-[1]">
        <div className="card-body flex flex-col items-center gap-8 z-[3]">
            <div className='flex items-center gap-10 z-[3]  w-full'>
            <PictureInput picture={currentTeam.teampicpath} disabled={true}/>
            <h2 className="text-5xl uppercase font-extrabold m-0 p-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ">{currentTeam.teamname}</h2>
            <div className="flex flex-col items-start ml-auto gap-2">
                <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>T20 Rank: <span className='text-gray-200'>{currentTeam.t20irank}</span></h4>
                <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>ODI Rank: <span className='text-gray-200'>{currentTeam.odirank}</span></h4>
                <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>Test Rank: <span className='text-gray-200'>{currentTeam.testrank}</span></h4>
                {/* //won and lost matches and drawn matches */}
                    <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>Matches Won: <span className='text-gray-200'>{matches.filter((match)=>match.winnerteam==currentTeam.teamid).length}</span></h4>
                    <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>Matches Lost: <span className='text-gray-200'>{matches.filter((match)=>match.winnerteam!=currentTeam.teamid).length}</span></h4>
                    <h4 className='m-0 p-0 text-xl font-semibold text-gray-400'>Matches Drawn: <span className='text-gray-200'>{matches.filter((match)=>match.winnerteam==null).length}</span></h4>
            </div>
            </div>
            <div className="h-[1px] w-full bg-base-200"></div>
            <div className="grid grid-rows-8 grid-cols-2 grid-flow-row-dense justify-start self-start flex-col gap-x-3 gap-y-1">
                {players.map((player)=>{
                    return <div key={player.playerid} className=" opacity-90 flex flex-row justify-between items-center gap-x-3 gap-y-1 bg-gray-600 transition-all hover:bg-gray-500 cursor-pointer p-3 rounded-md max-w-[340px] w-[340px]"
                    onClick={()=>navigate("/readPlayer/"+player.playertype+"/"+player.playerid)}
                    >
                        <div className='flex items-center gap-2'>
                            <h5 className="text-2xl font-semi m-0 p-0">{player.playername}</h5>
                            {player.playerid==currentTeam.captainid && <GiCaptainHatProfile className="text-2xl font-bold mr-2"/>}
                            {player.playerid==currentTeam.wicketkeeperid && <GiWinterGloves className="text-2xl font-bold"/>}
                        </div>
                            {player.playertype=="Batsman" && <GiCricketBat className="text-2xl rotate-[180deg]"/>}
                            {player.playertype=="Bowler" && <BiSolidCricketBall className="text-2xl"/>}
                            {player.playertype=="Allrounder" && <MdSportsCricket className="text-2xl rotate-[-90deg]"/>}
                    </div>
                })}
            </div>
        </div>
      <figure><img src={currentTeam.captainpic} className='max-h-[43rem]'  alt=""/></figure>
    </div>  )
}

export default TeamCard