import React from 'react'
import { Outlet } from 'react-router-dom';

const MatchProtected = () => {
    const [auth,setAuth]=useState(false);
    if(!auth){
        return <Redirect to="/login"/>
    }
  return (
    <>
        {<Outlet/>}
    </>
  )
}

export default MatchProtected