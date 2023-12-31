import React, { useEffect, useState } from 'react'
import SelectInput from '../inputs/SelectInput'
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import Sorting from '../inputs/Sorting';
import SearchInput from '../inputs/SearchInput';
import { resetFilters, updateCountryFilter, updateSearch, updateSortFilter } from '../../features/umpiresReducer';
const sortingOptions=[
    {label:"All",value:"all"},
    {label:'No Of Matches High to Low',value:'nomatches-desc'},
    {label:'No Of Matches Low to High',value:'nomatches-asc'},
]
const UmpireFilters = () => {
    const [countries,setCountries]=useState([]);
    const [country,setCountry]=useState('all');
    const [sort,setSort]=useState('all');
    const [search,setSearch]=useState('');
    const {allUmpires}=useSelector(state=>state.umpire);
    const dispatch=useDispatch();
    const getAllCountries=()=>{
        let uniqueCountries=['all'];
        let countries=allUmpires.map(umpire=>umpire.country);
        uniqueCountries=[...new Set([...uniqueCountries,...countries])];
        return uniqueCountries;
    }
    const reset=()=>{
        setCountry('all');
        setSort('all');
        setSearch('');
        dispatch(resetFilters())
    }
    useEffect(()=>{
        setCountries(getAllCountries());
    },[allUmpires])
    useEffect(()=>{
        dispatch(updateSortFilter(sort))
    },[sort])
    useEffect(()=>{
        dispatch(updateCountryFilter(country))
    },[country])
    useEffect(()=>{
        dispatch(updateSearch(search))
    },[search])
  return (
 <Wrapper>
        <h3 className='text-3xl from-stone-800'>Filters</h3>
        <SearchInput placeholder={"Search"} label={"Search"} value={search} onChange={(e)=>setSearch(e.target.value)} />
        <SelectInput value={country} onChange={(e)=>setCountry(e.target.value)} options={countries} label={"Country"}/>
        <Sorting options={sortingOptions} value={sort} onChange={(e)=>setSort(e.target.value)}/>
        <button className='btn btn-error' onClick={()=>reset()}>Reset Filters</button>

    </Wrapper>  )
}

export default UmpireFilters
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