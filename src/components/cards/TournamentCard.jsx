import React from 'react'
import PictureInput from '../inputs/PictureInput'
import TeamMatchesTable from '../TeamMatchesTable'

const TournamentCard = ({tournament,matches}) => {
  return (
<div className="card lg:card-side shadow-xl min-h-[40rem]  max-h-[40rem] image-full z-[1]">
        <div className="card-body flex flex-col items-center gap-8 z-[3]">
            <div className='flex items-center justify-between gap-10 w-full'>
            <PictureInput picture={tournament.winningpic} disabled={true}/>
            <h2 className="text-5xl uppercase font-extrabold m-0 p-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ">{tournament.teamname}</h2>
            <div className="flex flex-col items-start  gap-2">
                <PictureInput picture={tournament.teampicpath} disabled={true}/>
                </div>
            </div>
            <div className="h-[1px] w-full bg-base-200"></div>
            <div className="grid place-items-center gap-x-3 gap-y-1 opacity-80">
                <h2 className="text-2xl uppercase font-extrabold m-0 p-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-2 underline ">Matches</h2>
                <TeamMatchesTable matches={matches} onlyMatch={true}/>
            </div>
        </div>
      <figure><img src={tournament.tournamentlogo} className=' min-h-[40rem] max-h-[40rem]'  alt=""/></figure>
    </div>
         )
}

export default TournamentCard