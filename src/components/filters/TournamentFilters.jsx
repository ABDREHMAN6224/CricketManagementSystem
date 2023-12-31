import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SelectInput from '../inputs/SelectInput'
import SearchInput from '../inputs/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
import { resetTournamentFilters, updateTournamentFilter, updateWinningTeamFilter, updateYearFilter } from '../../features/tournamentReducer'

const TournamentFilters = () => {
  const [teams,setTeams]=useState([]);
  const [team,setTeam]=useState('all');
  const [tournaments,setTournaments]=useState([]);
  const [tournament,setTournament]=useState('all');
  const [years,setYears]=useState([]);
  const [year,setYear]=useState('all');
  const {allTournaments}=useSelector(state=>state.tournament);
  const dispatch=useDispatch();
  const getAllTeams=()=>{
    let uniqueTeams=['all'];
    let teams=allTournaments.map(tournament=>tournament.teamname);
    uniqueTeams=[...new Set([...uniqueTeams,...teams])];
    //remove any null values
    uniqueTeams=uniqueTeams.filter(team=>team);
    return uniqueTeams;
  }
  const getAllTournaments=()=>{
    let uniqueTournaments=['all'];
    let tournaments=allTournaments.map(tournament=>tournament.name);
    uniqueTournaments=[...new Set([...uniqueTournaments,...tournaments])];
    return uniqueTournaments;
  }
  const getUniqueYears=()=>{
    let uniqueYears=['all'];
    let years=allTournaments.map(tournament=>dayjs(tournament.enddate).format('YYYY'));
    uniqueYears=[...new Set([...uniqueYears,...years])];
    return uniqueYears;
  }
  const resetFilters=()=>{
    setTeam('all');
    setTournament('all');
    setYear('all');
    dispatch(resetTournamentFilters())
  }
  useEffect(()=>{
    setTeams(getAllTeams());
    setTournaments(getAllTournaments());
    setYears(getUniqueYears());
  },[allTournaments])
  useEffect(()=>{
    dispatch(updateWinningTeamFilter(team));
  },[team])
  useEffect(()=>{
    dispatch(updateTournamentFilter(tournament));
  },[tournament])
  useEffect(()=>{
    dispatch(updateYearFilter(year));
  },[year])

  return (
 <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Winning Teams"}/>
        <SelectInput value={tournament} onChange={(e)=>setTournament(e.target.value)} options={tournaments} label={"Tournament"}/>
        <SelectInput value={year} onChange={(e)=>setYear(e.target.value)} options={years} label={"Year"}/>
        <button className='btn btn-error' onClick={()=>resetFilters()}>Reset Filters</button>

    </Wrapper>  )
}

export default TournamentFilters
const Wrapper=styled.div`
padding-right: 2rem;
display: flex;
flex-direction: column;
gap: 2rem;
h3{
    position: relative;
    width: fit-content;
}
h3::after{
    content: '';
    display: block;
    width: 100%;
    height: 2px;
    background-color: #e5e7eb;
    position: absolute;
    bottom: -1px;
    left: 0;
}
`