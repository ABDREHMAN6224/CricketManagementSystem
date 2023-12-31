import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput'
import Sorting from '../inputs/Sorting'
import { useDispatch, useSelector } from 'react-redux'
import { resetTeamFilters, updateSearch, updateSort1, updateSort2, updateTeamSearch } from '../../features/teamReducer'
const sortingOptions=[
    {label:"No Of Wins High-Low",value:"no-of-wins-high-low"},
    {label:"No Of Wins Low-High",value:"no-of-wins-low-high"},
    {label:"No Of Losses Low-High",value:"no-of-losses-low-high"},
    {label:"No Of Losses High-Low",value:"no-of-losses-high-low"},
    {label:"No Of Draws Low-High",value:"no-of-draws-low-high"},
    {label:"No Of Draws High-Low",value:"no-of-draws-high-low"},
]
const sortingOptions2=[
    {label:"ICC T20 Ranking Low-High",value:"icc-t20-ranking-low-high"},
    {label:"ICC T20 Ranking High-Low",value:"icc-t20-ranking-high-low"},
    {label:"ICC ODI Ranking Low-High",value:"icc-odi-ranking-low-high"},
    {label:"ICC ODI Ranking High-Low",value:"icc-odi-ranking-high-low"},
    {label:"ICC Test Ranking Low-High",value:"icc-test-ranking-low-high"},
    {label:"ICC Test Ranking High-Low",value:"icc-test-ranking-high-low"}

]
const getUniqueTeams=(allTeams)=>{
    let uniqueTeams=["all"];
    allTeams.forEach((team)=>{
        if(!uniqueTeams.includes(team.teamname)){
            uniqueTeams.push(team.teamname);
        }
    })
    //remove any null values
    uniqueTeams=uniqueTeams.filter(team=>team);
    return uniqueTeams;
}
const TeamFilters = () => {
    const [search,setSearch]=useState('');
    const {allTeams}=useSelector(state=>state.team);
    const [teams,setTeams]=useState([]);
        const [team,setTeam]=useState('all');
    const [sort,setSort]=useState('no-of-wins-high-low');
    const [sort2,setSort2]=useState('icc-t20-ranking-low-high');
    const dispatch=useDispatch();
    const resetFilters=()=>{
        setSearch('');
        setSort('no-of-wins-high-low');
        setSort2('icc-t20-ranking-low-high');
        setTeam('all');
        dispatch(resetTeamFilters());

    }
    useEffect(()=>{
        setTeams(getUniqueTeams(allTeams))
    },[allTeams])
    
    useEffect(()=>{
        dispatch(updateSearch(search));
    },[search])
    useEffect(()=>{
        dispatch(updateSort1(sort));
    },[sort])
    useEffect(()=>{
        dispatch(updateSort2(sort2));
    },[sort2])
    useEffect(()=>{
        dispatch(updateTeamSearch(team));
    },[team])
    

  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)}/>
        <Sorting options={sortingOptions2} value={sort2} label="Ranks Filter" onChange={(e)=>setSort2(e.target.value)}/>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Teams"}/>
        <button className='btn btn-error' onClick={()=>resetFilters()}>Reset Filters</button>

    </Wrapper>  )
}

export default TeamFilters

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