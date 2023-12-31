import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import Sorting from '../inputs/Sorting'
import SelectInput from '../inputs/SelectInput'
import { useDispatch, useSelector } from 'react-redux'
import { resetMatchFilters, updateStadiumFilter, updateStatusFilter, updateTeam1Filter, updateTeam2Filter, updateTeamFilter, updateTournamentFilter } from '../../features/matchReducer'

const MatchesFilter = () => {
    const [team1,setTeam1]=useState('all');
    const [team2,setTeam2]=useState('all');
    const [teams1,setTeams1]=useState([]);
    const [teams2,setTeams2]=useState([]);
    const [teams,setTeams]=useState([]);
    const [team,setTeam]=useState('all');
    const [stadium,setStadium]=useState('all');
    const [stadiums,setStadiums]=useState([]);
    const [tournament,setTournament]=useState('all');
    const [tournaments,setTournaments]=useState([]);
    const [status,setStatus]=useState('all');
    const {allMatches}=useSelector(state=>state.match);
    const dispatch=useDispatch();
    const getUniqueTeams=(teams)=>{
        let uniqueTeams=['all'];
        let teams1=teams.map(team=>team.team1);
        let teams2=teams.map(team=>team.team2);
        uniqueTeams=[...new Set([...uniqueTeams,...teams1,...teams2])];
        //remove any null values
        uniqueTeams=uniqueTeams.filter(team=>team);
        return uniqueTeams;
    }
    const teams1Options=()=>{
        if(team2==='all'){
            setTeams1(teams);
        }
        else{
            setTeams1(teams.filter(team=>team!==team2));
        }
    }
    const teams2Options=()=>{
        if(team==='all'){
            setTeams2(teams);
        }
        else{
            setTeams2(teams.filter(t=>t!==team));
        }
    }
    const getUniqueTournaments=()=>{
        let uniqueTournaments=['all'];
        let tournament=allMatches.map(match=>match.tournamentname);
        uniqueTournaments=[...new Set([...uniqueTournaments,...tournament])];   
        setTournaments(uniqueTournaments);
    }
    const getUniqueStadiums=()=>{
        let uniqueStadiums=['all'];
        let stadium=allMatches.map(match=>match.location);
        uniqueStadiums=[...new Set([...uniqueStadiums,...stadium])];
        setStadiums(uniqueStadiums);
    }
    const resetFilters=()=>{
        setTeam1('all');
        setTeam2('all');
        setTeam('all');
        setStadium('all');
        setTournament('all');
        dispatch(resetMatchFilters());
    }
    useEffect(()=>{
        const uniqueTeams=getUniqueTeams(allMatches);
        setTeams(uniqueTeams);
        getUniqueTournaments();
        getUniqueStadiums();
    },[allMatches])
    useEffect(()=>{
        teams1Options();
    },[team2,allMatches])
    useEffect(()=>{
        teams2Options();
    },[team,allMatches])


    useEffect(()=>{
        dispatch(updateStatusFilter(status));
    },[status])
    useEffect(()=>{
        dispatch(updateTeam2Filter(team2));
    },[team2])
    useEffect(()=>{
        dispatch(updateStadiumFilter(stadium))
    },[stadium])
    useEffect(()=>{
        dispatch(updateTeamFilter(team));
        setStatus('all');
        dispatch(updateStatusFilter('all'))
    },[team])
    useEffect(()=>{
        dispatch(updateTournamentFilter(tournament))
    },[tournament])

  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Team"}/>
        {team!=='all' &&
            <SelectInput value={team2} onChange={(e)=>setTeam2(e.target.value)} options={teams2} label={"Team 2"}/>
        }
        {team!=='all' &&
            <SelectInput value={status} onChange={(e)=>setStatus(e.target.value)} options={["All","Won","Lost"]} label={"Sort By Matches"}/>
        }
        <SelectInput value={tournament} onChange={(e)=>setTournament(e.target.value)} options={tournaments} label={"Tournament"}/>
        <SelectInput value={stadium} onChange={(e)=>setStadium(e.target.value)} options={stadiums} label={"Stadiums"}/>
        <button className='btn btn-error' onClick={()=>resetFilters()}>Reset Filters</button>

    </Wrapper>  )
}

export default MatchesFilter

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