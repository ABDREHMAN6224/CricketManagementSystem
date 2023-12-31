import { configureStore } from "@reduxjs/toolkit"
import allRounderReducer from "./features/allRounderReducer"
import batsmanReducer from "./features/batsmanReducer"
import bowlerReducer from "./features/bowlerReducer"
import matchReducer from "./features/matchReducer"
import teamReducer from "./features/teamReducer"
import tournamentReducer from "./features/tournamentReducer"
import playerReducer from "./features/playerReducer"
import captainReducer from "./features/captainReducer"
import coachesReducer from "./features/coachesReducer"
import umpiresReducer from "./features/umpiresReducer"
import wicketKeeperReducers from "./features/wicketKeeperReducers"
import locationReducer from "./features/locationReducer"
import countryReducer from "./features/countryReducer"
import authReducer from "./features/authReducer"
export const store = configureStore({
    reducer: {
        allRounder: allRounderReducer,
        batsman: batsmanReducer,
        bowler: bowlerReducer,
        match: matchReducer,
        team: teamReducer,
        tournament: tournamentReducer,
        player: playerReducer,
        captain: captainReducer,
        coach: coachesReducer,
        umpire: umpiresReducer,
        wicketKeeper: wicketKeeperReducers,
        location: locationReducer,
        country:countryReducer,
        auth:authReducer
    }
})