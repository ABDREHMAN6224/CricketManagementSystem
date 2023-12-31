import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput';
import Sorting from '../inputs/Sorting';
import { useDispatch, useSelector } from 'react-redux';
import { resetBowlerFilters, updateCountry, updateSearch, updateSort, updateSort2, updateStatus, updateTeam } from '../../features/bowlerReducer';
const sortingOptions=[
    {label:"Wickets High-Low",value:"wickets-high-low"},
    {label:"Wickets Low-High",value:"wickets-low-high"},
    {label:"Bowling Avg High-Low",value:"bowling-avg-high-low"},
    {label:"Bowling Avg Low-High",value:"bowling-avg-low-high"},
    {label:'Medium Pacers',value:'Medium'},
    {label:'Fast Bowlers',value:'Fast'},
    {label:'Off Spinners',value:'Off-Spin'},
    {label:'Leg Spinners',value:'Leg-Spin'},
    {label:"ICC Ranking High-Low",value:"icc-ranking-high-low"},
    {label:"ICC Ranking Low-High",value:"icc-ranking-low-high"},
]
const sortingOptions2=[
    {label:"All",value:"all"},
    {label:'Left Arm',value:'left-arm'},
    {label:'Right Arm',value:'right-arm'},
]
const getUniqueTeams=(allBowler)=>{
    let uniqueTeams=["all"];
    allBowler.forEach((bowler)=>{
        if(!uniqueTeams.includes(bowler.teamname)){
            uniqueTeams.push(bowler.teamname);
        }
    })
    //remove any null values
    uniqueTeams=uniqueTeams.filter(team=>team);
    return uniqueTeams;
}
const getUniqueCountries=(allBowler)=>{
    let uniqueCountries=["all"];
    allBowler.forEach((bowler)=>{
        if(!uniqueCountries.includes(bowler.country)){
            uniqueCountries.push(bowler.country);
        }
    }
    )
    //remove any null values
    uniqueCountries=uniqueCountries.filter(country=>country);
    return uniqueCountries;
}
const BowlerFilters = () => {
    const [search,setSearch]=useState('');
    const [selectStatus,setSelectStatus]=useState('all');
    const [sort,setSort]=useState('wickets-high-low');
    const [sort2,setSort2]=useState('all');
    const [teams,setTeams]=useState([]);
    const [team,setTeam]=useState('all');
    const [country,setCountry]=useState('all');
    const [countryList,setCountryList]=useState([]);
    const {allBowlers}=useSelector(state=>state.bowler);
    const dispatch=useDispatch();

    const resetFilters=()=>{
        setSearch('');
        setSelectStatus('all');
        setTeam('all');
        setSort('wickets-high-low');
        setSort2('all');
        setCountry('all');
        dispatch(resetBowlerFilters());
    }
    useEffect(()=>{
        setTeams(getUniqueTeams(allBowlers));
        setCountryList(getUniqueCountries(allBowlers));
    },[allBowlers])
    useEffect(()=>{
        dispatch(updateSearch(search));
    },[search])
    useEffect(()=>{
        dispatch(updateStatus(selectStatus));
    },[selectStatus])
    useEffect(()=>{
        dispatch(updateTeam(team));
    },[team])
    useEffect(()=>{
        dispatch(updateSort(sort));
    },[sort])
    useEffect(()=>{
        dispatch(updateSort2(sort2));
    },[sort2])
    useEffect(()=>{
        dispatch(updateCountry(country));
    },[country])

  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={selectStatus} onChange={(e)=>setSelectStatus(e.target.value)} options={["all","active","retired"]} label={"Status"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)}/>
        <Sorting options={sortingOptions2} value={sort2} label="Bowl Hand" onChange={(e)=>setSort2(e.target.value)}/>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Teams"}/>
        <SelectInput value={country} onChange={(e)=>setCountry(e.target.value)} options={countryList} label={"Registered Team"}/>
        <button className='btn btn-error' onClick={()=>resetFilters()}>Reset Filters</button>

    </Wrapper>
  )
}

export default BowlerFilters
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