import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { resetAllRounderFilters, updateAllRounderOnCountry, updateAllRounderOnSearch, updateAllRounderOnSort, updateAllRounderOnSort2, updateAllRounderOnSort3, updateAllRounderOnStatus, updateAllRounderOnTeam } from '../../features/allRounderReducer'
import SearchInput from '../inputs/SearchInput'
import SelectInput from '../inputs/SelectInput'
import Sorting from '../inputs/Sorting'
const sortingOptions=[
    {label:"Wickets High-Low",value:"wickets-high-low"},
    {label:"Wickets Low-High",value:"wickets-low-high"},
    {label:"Bowling Avg High-Low",value:"bowling-avg-high-low"},
    {label:"Bowling Avg Low-High",value:"bowling-avg-low-high"},
    {label:"Batting Avg High-Low",value:"batting-avg-high-low"},
    {label:"Batting Avg Low-High",value:"batting-avg-low-high"},
    {label:"ICC Ranking High-Low",value:"icc-ranking-high-low"},
    {label:"ICC Ranking Low-High",value:"icc-ranking-low-high"},
]
const sortingOptions2=[
    {label:"All",value:"all"},
    {label:'Left Arm Bowl',value:'left-arm'},
    {label:'Right Arm Bowl',value:'right-arm'},
    {label:'Right Hand Bat',value:'right-hand'},
    {label:'Left Hand Bat',value:'left-hand'},
]
const sortingOptions3=[
  {label:"All",value:"all"},
  {label:'Medium Pacers',value:'Medium'},
  {label:'Fast Bowlers',value:'Fast'},
  {label:'Off Spinners',value:'Off-Spin'},
  {label:'Leg Spinners',value:'Leg-Spin'},
]
const getUniqueTeams=(allRounders)=>{
    let uniqueTeams=["all"];
    allRounders.forEach((allRounder)=>{
        if(!uniqueTeams.includes(allRounder.teamname)){
            uniqueTeams.push(allRounder.teamname);
        }
    })
    return uniqueTeams;
}
const getUniqueCountries=(allRounders)=>{
    let uniqueCountries=["all"];
    allRounders.forEach((allRounder)=>{
        if(!uniqueCountries.includes(allRounder.country)){
            uniqueCountries.push(allRounder.country);
        }
    }
    )
    //remove any null values
    uniqueCountries=uniqueCountries.filter(country=>country);
    return uniqueCountries;
}


const AllRounderFilters = () => {
  const dispatch=useDispatch();
  const [sort,setSort]=useState('wickets-high-low');
  const [sort2,setSort2]=useState('all');
  const [sort3,setSort3]=useState('all');
  const [selectStatus,setSelectStatus]=useState('all');
  const [teams,setTeams]=useState([]);
  const [country,setCountry]=useState('all');
  const [countryList,setCountryList]=useState([]);
  const [team,setTeam]=useState('all');
  const [search,setSearch]=useState('');
  const {allRounders}=useSelector(state=>state.allRounder);

  const resetFilters=()=>{
    setTeam('all');
    setSort('wickets-high-low');
    setSort2('all');
    setSort3('all');
    setCountry('all');
    dispatch(resetAllRounderFilters());
  }
  useEffect(()=>{
    dispatch(updateAllRounderOnSort(sort));
  },[sort])
  useEffect(()=>{
    dispatch(updateAllRounderOnSort2(sort2));
  },[sort2])
  useEffect(()=>{
    dispatch(updateAllRounderOnSort3(sort3));
  },[sort3])
  useEffect(()=>{
    dispatch(updateAllRounderOnTeam(team));
  },[team])
  useEffect(()=>{
    setTeams(getUniqueTeams(allRounders));
    setCountryList(getUniqueCountries(allRounders));
  },[allRounders])
  useEffect(()=>{
    dispatch(updateAllRounderOnSearch(search));
  },[search])
  useEffect(()=>{
    dispatch(updateAllRounderOnStatus(selectStatus));
  },[selectStatus])
  useEffect(()=>{
    dispatch(updateAllRounderOnCountry(country));
  }
  ,[country])

  return (
    <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={selectStatus} onChange={(e)=>setSelectStatus(e.target.value)} options={["all","active","retired"]} label={"Status"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)}/>
        <Sorting options={sortingOptions2} value={sort2} label="Bowl/Bat Hand" onChange={(e)=>setSort2(e.target.value)}/>
        <Sorting options={sortingOptions3} value={sort3} label="Bowl Type" onChange={(e)=>setSort3(e.target.value)}/>
        <SelectInput value={team} onChange={(e)=>setTeam(e.target.value)} options={teams} label={"Teams"}/>
        <SelectInput value={country} onChange={(e)=>setCountry(e.target.value)} options={countryList} label={"Registered Team"}/>
        <button className='btn btn-error' onClick={()=>resetFilters()}>Reset Filters</button>
    </Wrapper>
  )
}

export default AllRounderFilters
const Wrapper=styled.div`
padding-right: 2rem;
display: flex;
flex-direction: column;
gap: 0.8rem;
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