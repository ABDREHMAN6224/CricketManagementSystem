import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Title = ({text}) => {
  return (
    <Wrapper className='bg-base-300 p-7 pl-[8rem] pr-[8rem] text-stone-700'>
        <h1 className='text-4xl m-0 p-0 '><Link className='' to={"/"}>Home /</Link>{" "+text}</h1>
    </Wrapper>
  )
}

export default Title
const Wrapper=styled.div`
        h1 a{
            font-weight: bold;
        }
`