import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import { useDispatch, useSelector } from 'react-redux'
import SelectInput from '../inputs/SelectInput'
import { resetFilters, updateSearch, updateTeam } from '../../features/coachesReducer'

const CoachesFilter = () => {
    const [search,setSearch]=useState('');
    const [team,setTeam]=useState('all');
    const [teams,setTeams]=useState([]);
    const {allCoaches}=useSelector(state=>state.coach);
    const dispatch=useDispatch();
    const getAllCountries=()=>{
        let uniqueCountries=['all'];
        let countries=allCoaches.map(coach=>coach.teamname);
        uniqueCountries=[...new Set([...uniqueCountries,...countries])];
        return uniqueCountries;
    }
    const reset=()=>{
        setSearch('');
        setTeam('all');
        dispatch(resetFilters());
    }
    useEffect(()=>{
        setTeams(getAllCountries());
    },[allCoaches])
    useEffect(()=>{   
        dispatch(updateSearch(search));    
    },[search])
    useEffect(()=>{
        dispatch(updateTeam(team));
    },[team])
  return (
<Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Team"}/>
        <button className='btn btn-error' onClick={()=>reset()}>Reset Filters</button>

    </Wrapper>   )
}

export default CoachesFilter
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