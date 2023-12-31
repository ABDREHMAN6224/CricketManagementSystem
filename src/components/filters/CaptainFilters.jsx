import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput'
import Sorting from '../inputs/Sorting'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilters, updateMatches, updateSearch, updateStats, updateTeam } from '../../features/captainReducer'
const sortingOptions=[
    {label:"All",value:"all"},
    {label:'No Of Matches High to Low',value:'nomatches-desc'},
    {label:'No Of Matches Low to High',value:'nomatches-asc'},
]
const sortingOptions2=[
    {label:"All",value:"all"},
    {label:'Wins High to Low',value:'wins-desc'},
    {label:'Wins Low to High',value:'wins-asc'},
    {label:'Losses High to Low',value:'losses-desc'},
    {label:'Losses Low to High',value:'losses-asc'},
    {label:'Ties High to Low',value:'ties-desc'},
    {label:'Ties Low to High',value:'ties-asc'},

]
const CaptainFilters = () => {
    const [search,setSearch]=useState('');
    const [team,setTeam]=useState('all');
    const [teams,setTeams]=useState([]);
    const [sort,setSort]=useState('all');
    const [sort2,setSort2]=useState('all');
    const {allCaptains}=useSelector(state=>state.captain);
    const dispatch=useDispatch();
    const getAllCountries=()=>{
        let uniqueCountries=['all'];
        let countries=allCaptains.map(captain=>captain.teamname);
        uniqueCountries=[...new Set([...uniqueCountries,...countries])];
        //remove any null values
        uniqueCountries=uniqueCountries.filter(country=>country);
        return uniqueCountries;
    }
    const reset=()=>{
        setSearch('');
        setTeam('all');
        setSort('all');
        setSort2('all');
        dispatch(resetFilters());
    }
    useEffect(()=>{
        setTeams(getAllCountries());
    },[allCaptains])
    useEffect(()=>{
        dispatch(updateSearch(search));
    },[search])
    useEffect(()=>{
        dispatch(updateTeam(team));
    },[team])
    useEffect(()=>{
        dispatch(updateMatches(sort));
    },[sort])
    useEffect(()=>{
        dispatch(updateStats(sort2));
    },[sort2])
  return (
<Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Team"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)} label='Matches'/>
        <Sorting options={sortingOptions2} value={sort2} onChange={(e)=>setSort2(e.target.value)} label='Stats'/>
        <button className='btn btn-error' onClick={()=>reset()}>Reset Filters</button>

    </Wrapper>   )
}

export default CaptainFilters
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