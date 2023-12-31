import dayjs from 'dayjs';
import React, { useEffect } from 'react'
import PictureInput from '../inputs/PictureInput';
import InningsTable from '../InningsTable';
import { useSelector } from 'react-redux';

const SinglePlayerCard = ({player,highestScore,bestBowlingFigures,fifers,fifties,hundreds,playerInnings}) => {
    const {playerpicpath,playertype,playername,country,playerstatus,dob,totalt20i,totalodi,totaltest,teampicpath,bowlingrank,battingrank,allrounderrank}=player;
    
  const {currentBatsman,currentBatsmanInnings}=useSelector(state=>state.batsman);
  const {currentBowler,currentBowlerPerformances}=useSelector(state=>state.bowler);
  const {currentAllRounder,allRounderPerformance}=useSelector(state=>state.allRounder);
  return (
    <>
    <div className="card lg:card-side shadow-xl min-h-[50rem] m-0 overflow-hidden mx-auto max-h-[50rem] image-full z-[1]">
        <div className="card-body flex flex-col items-center gap-8 z-[3]">
            <div className='flex items-center justify-between gap-10 w-full'>
            <PictureInput picture={playerpicpath} disabled={true}/>
            <h2 className="text-5xl uppercase font-extrabold m-0 p-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]  ">
            <p className='m-0 p-0'> {playername}</p>
            <p className='m-0 p-0 mt-1 text-xs text-gray-400'>{dayjs().diff(dob,'year')} years old</p>

            </h2>
            <div className="flex flex-col items-start  gap-2">
                <PictureInput picture={teampicpath} disabled={true}/>
                </div>
            </div>
            <div className="h-[1px] w-full bg-base-200"></div>
            <div className="grid place-items-center grid-cols-1 gap-x-3 gap-y-1 opacity-80">
                <h2 className="text-2xl uppercase font-extrabold m-0 p-0 drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)] mb-2 underline ">Stats And Performances</h2>
                <div className="figures flex  gap-3 justify-between">
                    <div className="card-body bg-gray-100 pr-[3rem] rounded-lg gap-1 opacity-90">
                    {/* find age */}
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Type: <span className='text-gray-600'>{playertype}</span></p>
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Team: <span className='text-gray-600'>{country}</span></p>
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Rank: <span className='text-gray-600'>{playertype=="Batsman"?battingrank||0:playertype=="Bowler"?bowlingrank||0:allrounderrank||0}</span></p>
                    {(playertype=="Batsman" || playertype=="Allrounder")&&
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Average: <span className='text-gray-600'>{player.totalinningsbatted?(player.noruns/player.totalinningsbatted).toFixed(2):0.00}</span></p>
                    }
                    {(playertype=="Bowler" || playertype=="Allrounder")&&
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Economy: <span className='text-gray-600'>{(player.runsconceded/(player.oversbowled||1)).toFixed||0}</span></p>
                    }
                    {(playertype=="Bowler" || playertype=="Allrounder")&&
                        <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>5 wickets: <span className='text-gray-600'>{fifers}</span></p>
                    }
                    {(playertype=="Bowler" || playertype=="Allrounder")&&
                        <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Highest Wickets In Match: <span className='text-gray-600'>{bestBowlingFigures}</span></p>
                    }
                    {(playertype=="Batsman" || playertype=="Allrounder")&&
                        <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>50s: <span className='text-gray-600'>{fifties}</span></p>
                    }
                    {(playertype=="Batsman" || playertype=="Allrounder")&&
                        <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>100s: <span className='text-gray-600'>{hundreds}</span></p>
                    }
                    {(playertype=="Batsman" || playertype=="Allrounder")&&
                        <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Highest Score: <span className='text-gray-600'>{highestScore}</span></p>
                    }
                    {/* //similary display noruns for batsman and runsconceded for bowler */}
                    {(playertype=="Batsman"|| playertype=="Allrounder")&&
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Total Runs: <span className='text-gray-600'>{player.noruns}</span></p>
                    }
                    {(playertype=="Bowler"|| playertype=="Allrounder")&&
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Total Wickets: <span className='text-gray-600'>{player.nowickets}</span></p>
                    }
                    <p className='m-0 p-0 px-8 shadow-sm  font-semibold text-gray-500'>Total Matches: <span className='text-gray-600'>{Number(totalt20i)+Number(totalodi)+Number(totaltest)||0}</span></p>
                    {/* <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p>
                    <p>Click the button to listen on Spotiwhy app.</p> */

                    }
                    </div>
                    <InningsTable playerInnings={playertype=="Batsman"?currentBatsmanInnings:playertype=="Bowler"?currentBowlerPerformances:allRounderPerformance}/>
                </div>
            </div>
        </div>
      <figure><img src={playerpicpath} className=' min-h-[50rem] max-h-[50rem]'  alt=""/></figure>
    </div>

</>  
)
}

export default SinglePlayerCard