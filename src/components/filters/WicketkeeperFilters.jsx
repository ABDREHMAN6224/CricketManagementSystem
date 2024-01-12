import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput'
import Sorting from '../inputs/Sorting'
import { useDispatch, useSelector } from 'react-redux'
import { resetFilters, updateRegistered, updateSearch, updateSort, updateStatus, updateTeam } from '../../features/wicketKeeperReducers'
import { getAllCountries } from '../../features/countryReducer'

const sortingOptions=[
    {label:"All",value:"all"},
    {label:"Stumps High to Low",value:"stumps-desc"},
    {label:"Stumps Low to High",value:"stumps-asc"},
    {label:"Catches High to Low",value:"catches-desc"},
    {label:"Catches Low to High",value:"catches-asc"},
]
const WicketkeeperFilters = () => {
    const [search,setSearch]=useState('');
    const [team,setTeam]=useState('all');
    const [teams,setTeams]=useState([]);
    const [status,setStatus]=useState('all');
    const [sort,setSort]=useState('all');
    const [registered,setRegistered]=useState('all');
    const [registeredTeams,setRegisteredTeams]=useState([]);
    const {allWicketKeepers}=useSelector(state=>state.wicketKeeper);
    const {allCountries}=useSelector(state=>state.country);
    const dispatch=useDispatch();
    useEffect(()=>{
        dispatch(getAllCountries());
    },[])
    const getAllCountris=()=>{
        let uniqueCountries=['all'];
        let countries=allWicketKeepers.map(wicketKeeper=>wicketKeeper.teamname);
        uniqueCountries=[...new Set([...uniqueCountries,...countries])];
        //remove any null values
        uniqueCountries=uniqueCountries.filter(country=>country);
        return uniqueCountries;
    }
    const getCountries=()=>{
        let uniqueCountries=['all'];
        let countries=allCountries.map(wicketKeeper=>wicketKeeper.country);
        uniqueCountries=[...new Set([...uniqueCountries,...countries])];
        //remove any null values
        uniqueCountries=uniqueCountries.filter(country=>country);
        return uniqueCountries;
    }
    const reset=()=>{
        setSearch('');
        setTeam('all');
        setStatus('all');
        setSort('all');
        setRegistered('all');
        dispatch(resetFilters());
    }
    useEffect(()=>{
        setTeams(getAllCountris());
        setRegisteredTeams(getCountries());
    },[allWicketKeepers])
    useEffect(()=>{
        dispatch(updateSearch(search));      
    },[search])
    useEffect(()=>{
        dispatch(updateTeam(team));
    },[team])
    useEffect(()=>{
        dispatch(updateStatus(status));
    },[status])
    useEffect(()=>{
        dispatch(updateSort(sort));
    },[sort])
    useEffect(()=>{
        dispatch(updateRegistered(registered));
    },[registered])

  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Team"}/>
        <SelectInput value={status} onChange={(e)=>setStatus(e.target.value)} options={["all","active","retired"]} label={"Status"}/>
        <SelectInput value={registered} onChange={(e)=>setRegistered(e.target.value)} options={registeredTeams} label={"Registered Teams"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)} />
        <button className='btn btn-error' onClick={()=>reset()}>Reset Filters</button>

    </Wrapper>   
)
}

export default WicketkeeperFilters
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