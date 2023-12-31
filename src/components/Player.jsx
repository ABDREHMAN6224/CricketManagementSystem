import React from 'react'

const Player = ({player}) => {
  return (
    <p className="text-sm m-0 p-0">
        {player.playername}                              
    <span style={{fontSize:"10px"}} className='ml-2 text-gray-600'>{player.playertype.toLowerCase()=="batsman"?"Bat":player.playertype.toLowerCase()=="bowler"?"Bowl":"All Rounder"}</span>
                                      </p>
  )
}

export default Player