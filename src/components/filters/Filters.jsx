import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput';
import Sorting from '../inputs/Sorting';
import { useDispatch, useSelector } from 'react-redux';
import { resetfilters, updateBatsamnOnStatus, updateBatsmanOnCountry, updateBatsmanOnSearch, updateBatsmanOnSort,updateBatsmanOnSort2, updateBatsmanOnTeam, updateFilteredBatsmans } from '../../features/batsmanReducer';
const sortingOptions=[
    {label:"Batting Avg High-Low",value:"batting-avg-high-low"},
    {label:"Batting Avg Low-High",value:"batting-avg-low-high"},
    {label:"Strike Rate High-Low",value:"strike-rate-high-low"},
    {label:"Strike Rate Low-High",value:"strike-rate-low-high"},
    {label:"ICC Ranking High-Low",value:"icc-ranking-high-low"},
    {label:"ICC Ranking Low-High",value:"icc-ranking-low-high"},
    {label:"Runs High-Low",value:"runs-high-low"},
    {label:"Runs Low-High",value:"runs-low-high"},
]
const sortingOptions2=[
    {label:"All",value:"all"},
    {label:"Right Hand Bat",value:"right-hand"},
    {label:"Left Hand Bat",value:"left-hand"}
]
const getUniqueTeams=(allBatsman)=>{
    let uniqueTeams=["all"];
    allBatsman.forEach((batsman)=>{
        if(!uniqueTeams.includes(batsman.teamname)){
            uniqueTeams.push(batsman.teamname);
        }
    })
    return uniqueTeams;
}
const getUniqueCountries=(allBatsman)=>{
    let uniqueCountries=["all"];
    allBatsman.forEach((batsman)=>{
        if(!uniqueCountries.includes(batsman.country)){
            uniqueCountries.push(batsman.country);
        }
    })
    //remove any null values
    uniqueCountries=uniqueCountries.filter(country=>country);
    return uniqueCountries;
}
const Filters = () => {
    const [search,setSearch]=useState('');
    const [selectStatus,setSelectStatus]=useState('all');
    const [sort,setSort]=useState('batting-avg-high-low');
    const [sort2,setSort2]=useState('all');
    const [teams,setTeams]=useState([]);
    const [team,setTeam]=useState('all');
    const [country,setCountry]=useState('all');
    const [countryList,setCountryList]=useState([]);
    const {allBatsman}=useSelector(state=>state.batsman);
    const dispatch=useDispatch();
    const resetFilters=()=>{
        setSearch('');
        setSelectStatus('all');
        setSort('batting-avg-high-low');
        setTeam('all');
        setSort2('all');
        setCountry('all');
        dispatch(resetfilters());
    
    }
    
    useEffect(()=>{
        setTeams(getUniqueTeams(allBatsman));
        setCountryList(getUniqueCountries(allBatsman));
    },[allBatsman])
    useEffect(()=>{
        dispatch(updateBatsmanOnSearch(search));
    },[search])
    useEffect(()=>{
        dispatch(updateBatsamnOnStatus(selectStatus));
    },[selectStatus])
    useEffect(()=>{
        dispatch(updateBatsmanOnTeam(team));
    },[team])
    useEffect(()=>{
        dispatch(updateBatsmanOnSort(sort));
    },[sort])
    useEffect(()=>{
        dispatch(updateBatsmanOnSort2(sort2));
    },[sort2])
    useEffect(()=>{
        dispatch(updateBatsmanOnCountry(country));
    },[country])
  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={selectStatus} onChange={(e)=>setSelectStatus(e.target.value)} options={["all","active","retired"]} label={"Status"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>{
            setSort(e.target.value)}}/>
        <Sorting options={sortingOptions2} value={sort2} label={"Bat Hand"} onChange={(e)=>{
            setSort2(e.target.value)}}/>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Teams"}/>
        <SelectInput value={country} onChange={(e)=>setCountry(e.target.value)} options={countryList} label={"Registered Team"}/>
        <button className='btn btn-error' onClick={resetFilters}>Reset Filters</button>

    </Wrapper>
  )
}

export default Filters
const Wrapper=styled.div`
padding-right: 2rem;
display: flex;
flex-direction: column;
gap: 1rem;
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