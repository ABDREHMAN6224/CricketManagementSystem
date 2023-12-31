import React, { useEffect } from 'react'
import LoginPage from './pages/LoginPage'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Batsman from './pages/Batsman';
import Bowler from './pages/Bowler';
import AllRounder from './pages/AllRounder';
import Teams from './pages/Teams';
import Matches from './pages/Matches';
import MainPage from './pages/MainPage';
import Tournament from './pages/Tournament';
import WicketKeepers from './pages/WicketKeepers';
import Umpires from './pages/Umpires';
import Coaches from './pages/Coaches';
import Captains from './pages/Captains';
import {ToastContainer} from "react-toastify"
import AddCoach from './pages/AddPages/AddCoach';
import AddCaptain from './pages/AddPages/AddCaptain';
import AddWicketKeeper from './pages/AddPages/AddWicketKeeper';
import AddUmpire from './pages/AddPages/AddUmpire';
import AddTournament from './pages/AddPages/AddTournament';
import AddPlayer from './pages/AddPages/AddPlayer';
import AddMatch from './pages/AddPages/AddMatch';
import Addteam from './pages/AddPages/Addteam';
import AddScorecard from './pages/AddPages/AddScorecard';
import ReadTournament from './pages/ReadPages/ReadTournament';
import ReadBatsman from './pages/ReadPages/ReadBatsman';
import ReadPlayer from './pages/ReadPages/ReadPlayer';
import ReadMatch from './pages/ReadPages/ReadMatch';
import ReadTeam from './pages/ReadPages/ReadTeam';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from './features/authReducer';
import PlayerManagerDashboard from './pages/views/PlayerManagerDashboard';
import TeamManagerDashboard from './pages/views/TeamManagerDashboard';


const App = () => {
  const {user}=useSelector(state=>state.auth);
  const dispatch=useDispatch();
  useEffect(() => {
    if(user){
      dispatch(getUser(user?.username))
    }
  },[])
  

  const router = createBrowserRouter([{
    path:"/",
    element:<MainPage/>,
    children:[
      {
        index:true,
        element:<HomePage/>
      },
      {
        path:"/batsmen",
        element:<Batsman/>
      },
      
      {
        path:"/bowler",
        element:<Bowler/>
      },
      {
        path:"/allrounder",
        element:<AllRounder/>
      },
      {
        path:"/teams",
        element:<Teams/>
      },
      {
        path:"/matches",
        element:<Matches/>
      },
      {
        path:"/tournament",
        element:<Tournament/>
      },
      {
        path:"/captains",
        element:<Captains/>
      },
      {
        path:"/coaches",
        element:<Coaches/>
      },
      {
        path:"/umpires",
        element:<Umpires/>
      },
      {
        path:"/wicketkeepers",
        element:<WicketKeepers/>
      },
      {
        path:"/addCoach",
        element:<AddCoach/>
      },
      {
        path:"/addCaptain",
        element:<AddCaptain/>
      },
      {
        path:"/addWicketKeeper",
        element:<AddWicketKeeper/>
      },
      {
        path:"/addUmpire",
        element:<AddUmpire/>
      },
      {
        path:"/addTournament",
        element:<AddTournament/>
      },
      {
        path:"/addPlayer",
        element:<AddPlayer/>
      },
      {
        path:"/addTeam",
        element:<Addteam/>
      },
      {
        path:"/addMatch",
        element:<AddMatch/>
      },
      {
        path:"/addMatch/:team1id/:team2id",
        element:<AddScorecard/>
      },
      {
        path:"/readTournament/:id",
        element:<ReadTournament/>
      },
      {
        path:"/readPlayer/:type/:id",
        element:<ReadPlayer/>
      },
      {
        path:"/readMatch/:id",
        element:<ReadMatch/>
      },
      {
        path:"/readTeam/:id",
        element:<ReadTeam/>
      }
    ]
  },
  {
    path:"/dashboard",
    element:<Dashboard/>
  },
  {
    path:"/playerdashboard",
    element:<PlayerManagerDashboard/>
  },
  {
    path:"/teamdashboard",
    element:<TeamManagerDashboard/>
  },
  {
    path:"/login",
    element:<LoginPage/>
  }
]
  
  )
// );
  return (
    <>
    <ToastContainer position='top-center' autoClose={1500} />

    <RouterProvider router={router}/>
    </>
  )
}

export default App