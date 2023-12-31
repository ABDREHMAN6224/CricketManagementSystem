import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import MainNav from '../components/MainNav'
import { useSelector } from 'react-redux'

const MainPage = () => {
  const {user}=useSelector(state=>state.auth);
  const navigate=useNavigate();
  useEffect(() => {
    if(!user){
      navigate("/login")
    }
  }, [user])

  return (
    <section className='max-h-screen main-parent grid h-screen gap-0 batsman-page overflow-hidden'>
    <MainNav/>
    <Outlet/>
    </section>
  )
}

export default MainPage
const Wrapper=styled.div`

`