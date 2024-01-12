import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getTeam2ById, getTeam2Players, getTeamById, getTeamPlayers, getTeamTwoPlayers } from '../../features/teamReducer';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import SelectTeamModal from '../../components/Modals/SelectTeamModal';
import HeroImage from '../../components/HeroImage';
import scorecardImg from '../../images/scorecard.jpeg';
import PlayerCard from '../../components/PlayerCard';
import { FaCrown } from 'react-icons/fa';
import Loader from '../../components/Modals/Loader';
import { addInnings } from '../../features/playerReducer';
import background from '../../images/background.jpeg';

const AddScorecard = () => {
    const {team1id,team2id}=useParams();
    const [match,setMatch]=useState(JSON.parse(localStorage.getItem('match')));
    const [openTeam1Modal,setOpenTeam1Modal]=useState(false);
    const [openTeam2Modal,setOpenTeam2Modal]=useState(false);
    const [matchid,setMatchid]=useState(JSON.parse(localStorage.getItem('matchid')));
    const [bothDone,setBothDone]=useState(false);
    const [team1chosen,setTeam1Chosen]=useState(false);
    const [team2chosen,setTeam2Chosen]=useState(false);
    const [loading,setLoading]=useState(false);
    const {currentTeamPlayers,Team2Players,currentTeam,currentTeam2 }=useSelector(state=>state.team);
    const [teamOnePlayersInfo,setTeamOnePlayersInfo]=useState([]);
    const [teamTwoPlayersInfo,setTeamTwoPlayersInfo]=useState([]);
    const [teamOneDone,setTeamOneDone]=useState(false);
    const [teamTwoDone,setTeamTwoDone]=useState(false);
    const [team1Score,setTeam1Score]=useState(0);
    const [team2Score,setTeam2Score]=useState(0);
    const [team1Wickets,setTeam1Wickets]=useState(0);
    const [team2Wickets,setTeam2Wickets]=useState(0);
    const [team1overs,setTeam1Overs]=useState(0);
    const [team2overs,setTeam2Overs]=useState(0);
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const {user}=useSelector(state=>state.auth);
    useEffect(()=>{
         if(!user){
            navigate('/login');
        }
        else{
            if(user.userrole.toLowerCase()!='tournamentmanager'&&user.userrole.toLowerCase()!="datamanager" && user.userrole.toLowerCase()!='admin'){
                toast.error('You are not authorized to view this page');
                navigate('/');
            }
        }
        dispatch(getTeamById(team1id));
        dispatch(getTeam2ById(team2id));
    },[])
    useEffect(()=>{
        if(currentTeam?.teamname){}
        else{
            dispatch(getTeamById(team1id));
        }
    },[currentTeam])
const hanldeOpen=()=>{
    if(currentTeam){        
            setOpenTeam1Modal(true);
    }
}   
    const handleTeam1ModalClose=()=>{
        setOpenTeam1Modal(false);
        setTeam1Chosen(true);
    }
    const handleTeam2ModalClose=()=>{
        
        setOpenTeam2Modal(false);
        setTeam2Chosen(true);
    }
    useEffect(()=>{
        if(bothDone){
            dispatch(getTeamPlayers(team1id));
            dispatch(getTeamTwoPlayers(team2id));
        }
    },[bothDone])
    useEffect(()=>{
        if(team1chosen && team2chosen){
            setBothDone(true);
        }
    },[team1chosen,team2chosen])
    useEffect(()=>{
        setTeam1Score(0);
        setTeam2Wickets(0);
        setTeam1Overs(0);
        let overs=0;
        teamOnePlayersInfo.forEach(player=>{
            overs+=Number(player.balls);
        })
        setTeam1Overs((Math.floor(overs/6)).toFixed(1));
        // set team1 total score
        let score=0;
        teamOnePlayersInfo.forEach(player=>{
            score+=Number(player.runs);
        })
        setTeam1Score(score);
        // set team2 total wickets
        let wickets=0;
        teamOnePlayersInfo.forEach(player=>{
            wickets+=Number(player.wickets);
        })
        setTeam2Wickets(wickets);
        if(teamOnePlayersInfo.length==11){
            setTeamOneDone(true);
        }
    },[teamOnePlayersInfo])
    useEffect(()=>{
        setTeam2Score(0);
        setTeam1Wickets(0);
        setTeam2Overs(0);
        let overs=0;
        teamTwoPlayersInfo.forEach(player=>{
            overs+=Number(player.balls);
        })
        setTeam2Overs((Math.floor(overs/6)).toFixed(1));
        //set team1 total wickets
        let wickets=0;
        teamTwoPlayersInfo.forEach(player=>{
            if(player.wickets){
                wickets+=Number(player.wickets);

            }
        })
        setTeam1Wickets(wickets);
        //set team2 total score
        let score=0;
        teamTwoPlayersInfo.forEach(player=>{
            score+=Number(player.runs);
        })
        setTeam2Score(score);
        if(teamTwoPlayersInfo.length==11){
            setTeamTwoDone(true);
        }
    },[teamTwoPlayersInfo])
    useEffect(()=>{
    },[currentTeam])
    const handleSave=()=>{
        //check if wickets are less than 10
        if(team1Wickets>10){
            toast.error(`${currentTeam.teamname} wickets cannot be greater than 10`);
            return;
        }
        if(team2Wickets>10){
            toast.error(`${currentTeam2.teamname} wickets cannot be greater than 10`);
            return;
        }
        //check total overs bowled by teams are less than for tpye of match
            let team1overs=0;
            teamOnePlayersInfo.forEach(player=>{
                team1overs+=Number(player.overs);
            }
            )
            let team2overs=0;
            teamTwoPlayersInfo.forEach(player=>{
                team2overs+=Number(player.overs);
            }
            )
            let team1ballsfaced=0;
            teamOnePlayersInfo.forEach(player=>{
                team1ballsfaced+=Number(player.balls);
            }
            )
            let team2ballsfaced=0;
            teamTwoPlayersInfo.forEach(player=>{
                team2ballsfaced+=Number(player.balls);
            }
            )
            let team1extras=0;
            teamOnePlayersInfo.forEach(player=>{
                team1extras+=Number(player.extras)+Number(player.noballs);
            }
            )
            let team2extras=0;
            teamTwoPlayersInfo.forEach(player=>{
                team2extras+=Number(player.extras)+Number(player.noballs);
            }
            )

            if(match.type=="ODI"){
                if(team1overs>50){
                    toast.error(`${currentTeam.teamname} overs cannot be greater than 50`);
                    return;
                }
                if(team2overs>50){
                    toast.error(`${currentTeam2.teamname} overs cannot be greater than 50`);
                    return;
                }
                if(team1ballsfaced>(300+team1extras)){
                    toast.error(`${currentTeam.teamname} balls faced cannot be greater than 300`);
                    return;
                }
                if(team2ballsfaced>(300+team2extras)){
                    toast.error(`${currentTeam2.teamname} balls faced cannot be greater than 300`);
                    return;
                }
            }
            if(match.type=="T20"){
                if(team1overs>20){
                    toast.error(`${currentTeam.teamname} overs cannot be greater than 20`);
                    return;
                }
                if(team2overs>20){
                    toast.error(`${currentTeam2.teamname} overs cannot be greater than 20`);
                    return;
                }
                if(team1ballsfaced>(120+team1extras)){
                    toast.error(`${currentTeam.teamname} balls faced cannot be greater than 120`);
                    return;
                }
                if(team2ballsfaced>(120+team2extras)){
                    toast.error(`${currentTeam2.teamname} balls faced cannot be greater than 120`);
                    return;
                }
            }
        
        //check if winning team total score is greater than losing team total score
        if(match.winner=="none"){
            if(team1Score!=team2Score){
                toast.error(`Match is not a draw`);
                return;
            }
        }
        if(match.winner==currentTeam.teamid){
            if(team1Score<=team2Score){
                toast.error(`${currentTeam.teamname} score cannot be less than ${currentTeam2.teamname} score`);
                return;
            }
        }
        if(match.winner==currentTeam2.teamid){
            if(team2Score<=team1Score){
                toast.error(`${currentTeam2.teamname} score cannot be less than ${currentTeam.teamname} score`);
                return;
            }
        }
        setLoading(true);
        //save team1 players info
        teamOnePlayersInfo.forEach(player=>{
            dispatch(addInnings(player))
        })
        //save team2 players info
        teamTwoPlayersInfo.forEach(player=>{
            dispatch(addInnings(player))
        })
        toast.success("Scorecard added successfully");
        setTimeout(() => {
            navigate(`/matches`);
            setLoading(false);
        }, 2000);

    }
  return (
    <Wrapper style={{gridTemplateRows:bothDone?"1fr":""}}>
                {!bothDone ?
        <HeroImage src={scorecardImg} />:
      <div className="image absolute inset-0 w-full h-full"></div>
        }
        {!bothDone &&
        <div className='grid grid-rows-3 items-center justify-center gap-10 mt-12 pt-10 place-items-center'>
            <h3 className='font-bold text-3xl m-0 p-0 '>Select Squads</h3>
         <div className='flex gap-x-10'>
        <button className='btn btn-neutral capitalize hover:bg-gray-600 text-2xl btn-lg min-w-[400px] max-w-[400px]' onClick={hanldeOpen} disabled={team1chosen}>
            {team1chosen ? "Squad Selected" : `Select ${currentTeam.teamname} Squad`}
        </button>
        <button className='btn btn-neutral capitalize hover:bg-gray-600 text-2xl btn-lg min-w-[400px] max-w-[400px]' onClick={()=>setOpenTeam2Modal(true)} disabled={team2chosen}>
            {team2chosen ? "Squad Selected" : `Select ${currentTeam2.teamname} Squad`}
        </button>
            </div>
        </div>
        }
    {bothDone &&

        <div className="scorecard z-[1]">
        <div className='py-12 px-6 '>
              <div className="flex flex-col items-center justify-center gap-2 z-[2] bg-base-200 rounded-lg">
                <div className='w-full flex items-center justify-center bg-base-200 rounded-lg'>
                  <h3 className='text-3xl m-0 p-10 font-bold pb-3 flex gap-3 items-center'>
                    <p className="m-0 p-0 z-[2] text-black">
                    {currentTeam.teamname||"Team 1"} 
                    </p>
                    {(match.winner==currentTeam.teamid||!match.winner)?<FaCrown className=' text-red-500 z-[2]'/>:""}
                </h3>
                </div>
                <div className="flex flex-col items-center justify-center">
                    {/* display cards for all players along with checkboxes at end of card */}
                    <div className='grid grid-cols-1 gap-x-10 gap-y-1 w-full p-3'>
                        {currentTeamPlayers.map(player=>{
                            return <PlayerCard type={match.type} setTeamPlayersInfo={setTeamOnePlayersInfo} match_id={matchid} player={{...player,isCaptain:player.playerid==currentTeam.captainid,isKeeper:player.playerid==currentTeam?.wicketkeeperid}} key={player.playerid} />
                        })}
                    </div>
                        
                </div>
            </div>
            
        </div>
        
        <div className='py-12 px-6 '>
              <div className="flex flex-col items-center justify-center gap-2 z-[1] bg-base-200 rounded-lg">
           <div className='w-full flex items-center justify-center bg-base-200 rounded-lg'>
                  <h3 className='text-3xl m-0 p-10 font-bold pb-3 flex gap-3 items-center'>
                    <p className="m-0 p-0 z-[2] text-black">
                    {currentTeam2.teamname||"Team 2"} 
                    </p>
                    {(match.winner==currentTeam2.teamid||!match.winner)?<FaCrown className=' text-red-500 z-[1]'/>:""}
                </h3>
                </div>
                <div className="flex flex-col items-center justify-center gap-4">
                    {/* display cards for all players along with checkboxes at end of card */}
                    <div className='grid grid-cols-1 gap-x-10 gap-y-1 p-3 w-full'>
                        {Team2Players.map(player=>{
                            return <PlayerCard type={match.type} setTeamPlayersInfo={setTeamTwoPlayersInfo} match_id={matchid} player={{...player,isCaptain:player.playerid==currentTeam2.captainid,isKeeper:player.playerid==currentTeam2?.wicketkeeperid}} key={player.playerid} />
                        })}
                    </div>
                        
                </div>
            </div>
            
        </div>
        <div className="total-score mt-12 pt-12 z-[2]">
            <div className="flex flex-col items-center justify-center gap-2 pt-12 z-[2]">
                <h3>{currentTeam.teamname+": "||"Team1: "}{team1Score+"-"+team1Wickets} <span className=' font-normal text-sm'>{team1overs}</span></h3>
                <h3>{currentTeam2.teamname+": "||"Team2: "}{team2Score+"-"+team2Wickets} <span className=' font-normal text-sm'>{team2overs}</span></h3>
            {teamTwoDone && <button className='btn btn-success ' onClick={()=>{
                handleSave()
            }}>Save</button>}
        </div>
            </div>
    </div>
}




        {openTeam1Modal && <SelectTeamModal open={openTeam1Modal} onClose={handleTeam1ModalClose} team={{
            teamId:currentTeam.teamid,
            teamName:currentTeam.teamname,
            coachId:currentTeam.coachid,
            captainId:currentTeam.captainid,
            wicketKeeperId:currentTeam.wicketkeeperid,
            teamLogo:currentTeam.teampicpath,
            coachname:currentTeam.coachname,
            captain:currentTeam.captain,
            wicketkeeper:currentTeam.keeper
        }} restrictions={true}/>}
        {openTeam2Modal && <SelectTeamModal open={openTeam2Modal} onClose={handleTeam2ModalClose} team={{
            teamId:currentTeam2.teamid,
            teamName:currentTeam2.teamname,
            coachId:currentTeam2.coachid,
            captainId:currentTeam2.captainid,
            wicketKeeperId:currentTeam2.wicketkeeperid,
            teamLogo:currentTeam2.teampicpath,
            coachname:currentTeam2.coachname,
            captain:currentTeam2.captain,
            wicketkeeper:currentTeam2.keeper
        }} restrictions={true}/>}
        {loading && <Loader/>}
    </Wrapper>
  )
}

export default AddScorecard
const Wrapper=styled.div`
min-height: 100%;
display: grid;
grid-template-rows: 35vh 1fr;
position: relative;
.image{

  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(4px);
}
.img{
    object-position:bottom -1800px right 0px ;
}
.scorecard{
    display: grid;
    grid-template-columns: 1fr 1fr 300px;
    max-width: 100%;
    overflow: hidden;
}
`;